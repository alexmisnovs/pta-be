import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = {
  async afterCreate(event) {
    const { result, params } = event;
    console.log(result);
    console.log(params);
    console.log("I am coming from lifecycles hook");
    // try {
    //   await strapi.plugins["email"].services.email.send({
    //     to: result.email,
    //     from: "palma27@ethereal.email",
    //     subject: "Hello world",
    //     text: "Volunteering request",
    //     html: `<h4>Thanks for joining our volunteer group. We will get in touch soon</h4>`,
    //   });
    //   console.log("Email sent");
    // } catch (error) {
    //   console.log(error);
    // }
    // add contact to resend
    try {
      resend.contacts.create({
        email: result.email,
        firstName: result.name,

        unsubscribed: false,
        audienceId: process.env.RESEND_AUDIENCE_ID,
      });
    } catch (error) {
      console.log(error);
    }
    // send email from resend
    try {
      resend.emails.send({
        to: result.email,
        from: "onboarding@resend.dev",
        subject: "Volunteering request",
        text: "Volunteering request",
        html: `<h4>Thanks for joining our volunteer group. We will get in touch soon</h4>`,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
