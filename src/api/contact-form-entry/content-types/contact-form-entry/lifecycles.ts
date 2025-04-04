// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = {
  async afterCreate(event) {
    const { result } = event;
    console.log(result);

    // console.log("I am coming from lifecycles hook contact form");

    // send emai to the person who has filled in the form. Do I really need that?
    // try {
    //   await strapi.plugins["email"].services.email.send({
    //     to: result.email,
    //     from: "info@stmodwenspta.org.uk",
    //     subject: "Contact Form Enquiry",
    //     text: "Thank you for getting in touch with us. We will reply shortly.",
    //     html: `<h4>Dear ${result.name}, thank you for getting in touch with us. We will get back to you shortly.</h4>`,
    //   });
    //   console.log("Email sent");
    // } catch (error) {
    //   console.log(error);
    // }

    // send email to info@ email that there was a contact form submission.

    //TODO: use email from .env file for the future.
    try {
      console.log("Trying to send from nodemailer");
      await strapi.plugins["email"].services.email.send({
        to: "info@stmodwenspta.org.uk",
        replyTo: result.email,
        from: "admin@stmodwenspta.org.uk",
        subject: "Contact Form Enquiry from PTA Website",
        text: `Original enquiry: ${result.message}`,
        html: `<h4>Contact form enquiry</h4>
        <p>Original enquiry: ${result.message}</p>
        `,
      });
      console.log("Email sent");
    } catch (error) {
      console.log(error);
    }
    // add contact to resend

    // maybe need to first check if contact is alrady in the audience before creating ?

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
    //     subject: "Thanks for Contacing us",
    //     html: `<h4>Dear ${result.name}, thank you for contacting us. We will get back to you shortly</h4>`,
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  },
};
