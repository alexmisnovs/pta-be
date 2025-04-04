const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX, // Changed from MAILCHIMP_SERVER to MAILCHIMP_SERVER_PREFIX
});

module.exports = {
  async beforeCreate(event) {
    // try to add contact to resend first, once done can try and update the user to save the resend
    // Access the data to be created
    const { data } = event.params;
    // console.log("Data from before create hook", data);
    // Example: Validate a required field
    if (!data.name) {
      throw new Error("Name is required");
    }

    // Example: Modify data before creation
    // delete data.captcha;
  },

  async afterCreate(event) {
    const { result, params } = event;
    // console.log(result);

    // console.log("After Create hook");

    // try to create a new contact in mailchimp
    let mailchimpResponse;
    try {
      mailchimpResponse = await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID, {
        email_address: result.email,
        status: "subscribed",
        merge_fields: {
          FNAME: result.name,
        },
        tags: ["newsletter"],
      });

      // Update the entry with Mailchimp data if successful
      if (mailchimpResponse && mailchimpResponse.id) {
        try {
          await strapi.db.query("api::newsletter-signup.newsletter-signup").update({
            where: { id: result.id },
            data: {
              mailchimpId: mailchimpResponse.id,
              mailchimpStatus: mailchimpResponse.status,
            },
          });
          console.log("Newsletter signup entry updated with Mailchimp data");
        } catch (updateError) {
          console.log("Error updating entry with Mailchimp data:", updateError);
        }
      }
    } catch (error) {
      console.log("Mailchimp error:", error);

      // Check if this is a "permanently deleted" error
      if (
        error.response &&
        error.response.text &&
        error.response.text.includes("permanently deleted")
      ) {
        console.log("Contact was permanently deleted from Mailchimp and cannot be re-imported");

        // Update the entry with error information
        try {
          await strapi.db.query("api::newsletter-signup.newsletter-signup").update({
            where: { id: result.id },
            data: {
              mailchimpStatus: "REQUIRES_RESUBSCRIBE",
              mailchimpError: "Contact was permanently deleted and cannot be re-imported",
            },
          });
          console.log("Entry marked as requiring manual resubscribe");
        } catch (updateError) {
          console.log("Error updating entry with error status:", updateError);
        }
      }
    }

    // console.log("mailchimp contact created:", mailchimpResponse);

    // send email to admin include mailchimp details
    // try {
    //   await strapi.plugins["email"].services.email.send({
    //     to: "info@stmodwenspta.org.uk",
    //     replyTo: result.email,
    //     from: "admin@stmodwenspta.org.uk",
    //     subject: "Newsletter signup",
    //     text: `Newsletter user: ${result.name}`,
    //     html: `<h4>New newsletter signup</h4>
    //     <p>Please check admin for more details: ${result.name}</p>
    //     `,
    //   });
    //   console.log("Email sent");
    // } catch (error) {
    //   console.log(error);
    // }
  },
  async beforeDelete(event) {
    console.log("beforeDelete hook triggered", event.params);

    const { where } = event.params;

    // Get the entry that's about to be deleted
    const entriesToDelete = await strapi.db
      .query("api::newsletter-signup.newsletter-signup")
      .findMany({
        where,
        select: ["id", "email", "name", "mailchimpId", "mailchimpStatus"],
      });

    console.log("Entries to delete:", entriesToDelete);

    // Process each entry (usually just one)
    for (const entry of entriesToDelete) {
      // Only proceed if we have a mailchimpId
      if (entry.mailchimpId) {
        try {
          // The hash is the MD5 hash of the lowercase email address
          const subscriberHash = require("crypto")
            .createHash("md5")
            .update(entry.email.toLowerCase())
            .digest("hex");

          // Unsubscribe the member instead of archiving
          // Using "unsubscribed" status instead of "archived" which is not supported
          await mailchimp.updateListMember(process.env.MAILCHIMP_AUDIENCE_ID, subscriberHash, {
            status: "unsubscribed",
          });

          console.log(`Mailchimp contact ${entry.email} unsubscribed instead of deleted`);
        } catch (error) {
          console.log(`Error unsubscribing Mailchimp contact:`, error);
        }
      } else {
        console.log(`No mailchimpId found for entry ${entry.id}`);
      }
    }
  },
};
