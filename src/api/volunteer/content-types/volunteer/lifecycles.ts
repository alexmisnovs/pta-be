// Import mailchimp from a shared location or use a different variable name
const volunteerMc = require("@mailchimp/mailchimp_marketing");

volunteerMc.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});

module.exports = {
  async afterCreate(event) {
    const { result, params } = event;
    // console.log(result);

    // console.log("After Create hook");
    try {
      await strapi.plugins["email"].services.email.send({
        to: "info@stmodwenspta.org.uk",
        replyTo: result.email,
        from: "admin@stmodwenspta.org.uk",
        subject: "New volunteer registred",
        text: `New volunteer registred: ${result.name}`,
        html: `<h4>New volunteer</h4>
        <p>Please check admin for more details: ${result.name}</p>
        `,
      });
      console.log("Email sent");
    } catch (error) {
      console.log(error);
    }

    // Add Mailchimp integration for volunteers
    try {
      // First, check if the contact already exists by creating a subscriber hash
      const subscriberHash = require("crypto")
        .createHash("md5")
        .update(result.email.toLowerCase())
        .digest("hex");

      let mailchimpResponse;

      try {
        // Try to get the member first
        const existingMember = await volunteerMc.lists.getListMember(
          process.env.MAILCHIMP_AUDIENCE_ID,
          subscriberHash
        );

        // If we get here, the member exists, so update their tags
        console.log("Contact already exists in Mailchimp, updating tags");

        // Get existing tags and add the volunteer tag
        let existingTags = [];
        if (existingMember.tags && Array.isArray(existingMember.tags)) {
          if (existingMember.tags.length > 0 && existingMember.tags[0].name) {
            existingTags = existingMember.tags.map(tag => tag.name);
          } else {
            existingTags = existingMember.tags;
          }
        }

        console.log("Existing tags:", existingTags);

        // First update the member's merge fields if needed
        await volunteerMc.lists.updateListMember(
          process.env.MAILCHIMP_AUDIENCE_ID,
          subscriberHash,
          {
            merge_fields: {
              FNAME: result.name, // Update name in case it's different
            },
          }
        );

        // Then update the tags using the dedicated method
        await volunteerMc.lists.updateListMemberTags(
          process.env.MAILCHIMP_AUDIENCE_ID,
          subscriberHash,
          {
            tags: [{ name: "volunteer", status: "active" }],
          }
        );

        console.log("Mailchimp member tags updated with 'volunteer' tag");

        // Get the updated member to use for our response
        mailchimpResponse = await volunteerMc.lists.getListMember(
          process.env.MAILCHIMP_AUDIENCE_ID,
          subscriberHash
        );

        if (!existingTags.includes("volunteer")) {
          existingTags.push("volunteer");
          console.log("Added volunteer tag, new tags:", existingTags);
        }

        // Update the member with the new tags - use the correct format for tags
        mailchimpResponse = await volunteerMc.lists.updateListMember(
          process.env.MAILCHIMP_AUDIENCE_ID,
          subscriberHash,
          {
            merge_fields: {
              FNAME: result.name, // Update name in case it's different
            },
            tags: existingTags.map(tag => ({ name: tag, status: "active" })),
          }
        );

        console.log(
          "Mailchimp member updated with tags:",
          existingTags.map(tag => ({ name: tag, status: "active" }))
        );
      } catch (error) {
        // If the member doesn't exist, create a new one
        if (error.status === 404) {
          console.log("Contact doesn't exist in Mailchimp, creating new");
          mailchimpResponse = await volunteerMc.lists.addListMember(
            process.env.MAILCHIMP_AUDIENCE_ID,
            {
              email_address: result.email,
              status: "subscribed",
              merge_fields: {
                FNAME: result.name,
              },
              tags: ["volunteer"],
            }
          );
        } else {
          // Some other error occurred
          // console.log("Error getting Mailchimp member:", error);
          throw error;
        }
      }

      // Update the entry with Mailchimp data if successful
      if (mailchimpResponse && mailchimpResponse.id) {
        try {
          await strapi.db.query("api::volunteer.volunteer").update({
            where: { id: result.id },
            data: {
              mailchimpId: mailchimpResponse.id,
              mailchimpStatus: mailchimpResponse.status,
              processed: true, // Add a flag to prevent duplicate processing
            },
          });
          // console.log("Volunteer entry updated with Mailchimp data");
        } catch (updateError) {
          // console.log("Error updating entry with Mailchimp data:", updateError);
        }
      }
    } catch (error) {
      // console.log("Mailchimp error:", error);
    }
  },
  async beforeDelete(event) {
    // console.log("beforeDelete hook triggered for volunteer", event.params);

    const { where } = event.params;

    // Get the entry that's about to be deleted
    const entriesToDelete = await strapi.db.query("api::volunteer.volunteer").findMany({
      where,
      select: ["id", "email", "name", "mailchimpId", "mailchimpStatus"],
    });

    // console.log("Volunteer entries to delete:", entriesToDelete);

    // Process each entry (usually just one)
    for (const entry of entriesToDelete) {
      // Only proceed if we have an email
      if (entry.email) {
        try {
          // The hash is the MD5 hash of the lowercase email address
          const subscriberHash = require("crypto")
            .createHash("md5")
            .update(entry.email.toLowerCase())
            .digest("hex");

          // Remove only the volunteer tag, keeping the contact for newsletter
          await volunteerMc.lists.updateListMemberTags(
            process.env.MAILCHIMP_AUDIENCE_ID,
            subscriberHash,
            {
              tags: [{ name: "volunteer", status: "inactive" }],
            }
          );

          // console.log(`Volunteer tag removed for ${entry.email} but contact kept for newsletter`);
        } catch (error) {
          // console.log(`Error updating Mailchimp tags:`, error);
        }
      } else {
        // console.log(`No email found for volunteer entry ${entry.id}`);
      }
    }
  },
};
