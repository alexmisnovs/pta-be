import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = {
  // async beforeCreate(event) {
  //   // Access the data to be created
  //   const { data } = event.params;
  //   // console.log("Data from before create hook", data);
  //   // Example: Validate a required field
  //   if (!data.name) {
  //     throw new Error("Name is required");
  //   }

  //   // Example: Modify data before creation
  //   // delete data.captcha;
  //   // data.captcha = "security verification passed";
  // },

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

    // add contact to resend
    // try {
    //   resend.contacts.create({
    //     email: result.email,
    //     firstName: result.name,

    //     unsubscribed: false,
    //     audienceId: process.env.RESEND_AUDIENCE_ID,
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
    // send email from resend
    // try {
    //   resend.emails.send({
    //     to: result.email,
    //     from: "onboarding@resend.dev",
    //     subject: "Volunteering request",
    //     text: "Volunteering request",
    //     html: `<h4>Thanks for joining our volunteer group. We will get in touch soon</h4>`,
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  },
};
