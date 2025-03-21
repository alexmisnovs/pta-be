/**
 * verifyCaptcha policy
 */

const { verify } = require("hcaptcha");

const callVerify = async (secret, token) => {
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
};

export default async (policyContext, config, { strapi }) => {
  // Add your own logic here.
  strapi.log.info("In verifyCaptcha policy.");
  // most likely token is passed wrong

  const secret = strapi.config.get("server.hcaptchaSecret");

  if (policyContext.args) {
    console.log("Got Args Args: ", policyContext.args);
    const token = policyContext.args.data.captcha;

    // const { name, message } = policyContext.args.data;

    // if (!name || !message) {
    //   strapi.log.error("Required fields missing");
    //   return false;
    // }

    if (!token) {
      strapi.log.info("Token not found");
      return false;
    }

    await callVerify(secret, token);
  } else {
    console.log("Got Request: ", policyContext.request.body);
    const { captcha } = policyContext.request.body.data;
    console.log(captcha);

    if (!captcha) {
      strapi.log.error("Token not found");
      return false;
    }

    const result = await callVerify(secret, captcha);
    console.log("Captcha verify result:", result);
    return result;
  }

  // const canDoSomething = true;

  // if (canDoSomething) {
  //   return true;
  // }

  // return false;
};
