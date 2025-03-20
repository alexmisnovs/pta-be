/**
 * volunteer controller
 */

import { factories } from "@strapi/strapi";
// this will not work for gql
export default factories.createCoreController("api::volunteer.volunteer", ({ strapi }) => ({
  async create(ctx) {
    // console.log("Got body from controller:", ctx.request.body);
    const { name, email, yearGroup, phoneNumber, captcha } = ctx.request.body.data;

    // console.log("FROM controller name: ", name);
    // console.log(captcha);

    // lets get rid of captcha
    ctx.request.body = {
      data: {
        name,
        email,
        yearGroup,
        phoneNumber,
      },
    };
    // console.log("Got body after modification:", ctx.request.body);
    await super.create(ctx);
  },
}));
