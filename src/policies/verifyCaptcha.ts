/**
 * verifyCaptcha policy
 */

const { verify } = require("hcaptcha");

export default async (policyContext, config, { strapi }) => {
  // Add your own logic here.
  strapi.log.info("In verifyCaptcha policy.");
  // most likely token is passed wrong

  const secret = strapi.config.get("server.hcaptchaSecret");

  const token = policyContext.args.data.captcha;

  const { name, message } = policyContext.args.data;

  if (!name || !message) {
    strapi.log.error("Required fields missing");
    return false;
  }

  if (!token) {
    strapi.log.info("Token not found");
    return false;
  }

  try {
    let { success } = await verify(secret, token);

    if (success) {
      // Equivalent to sending a HTTP 200 status as a server response
      strapi.log.info("Verification success: ", success);
      return true;
    } else {
      strapi.log.error("Failed captcha score");
      return false;
    }
  } catch (error) {
    strapi.log.error(error);
    return false;
  }

  // const canDoSomething = true;

  // if (canDoSomething) {
  //   return true;
  // }

  return false;
};
