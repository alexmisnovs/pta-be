/**
 * contact-form-entry controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::contact-form-entry.contact-form-entry",
  ({ strapi }) => ({
    async create(ctx) {
      // console.log("Got body from controller:", ctx.request.body);
      const { name, email, message } = ctx.request.body.data;

      // console.log("FROM controller name: ", name);
      // console.log(captcha);

      // lets get rid of captcha
      ctx.request.body = {
        data: {
          name,
          email,
          message,
        },
      };
      // console.log("Got body after modification:", ctx.request.body);
      await super.create(ctx);
    },
  })
);
