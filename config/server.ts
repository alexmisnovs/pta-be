import { mainSheet } from "styled-components/dist/models/StyleSheetManager";

export default ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  app: {
    keys: env.array("APP_KEYS"),
  },
  hcaptchaSecret: env("HCAPTCHA_SECRET_KEY"),
  hcaptchaSiteKey: env("HCAPTCHA_SITE_KEY"),
  mailchimpApiKey: env("MAILCHIMP_API_KEY"),
  mailchimpServerPrefix: env("MAILCHIMP_SERVER_PREFIX"),
  mailchimpAudienceId: env("MAILCHIMP_AUDIENCE_ID"),
});
