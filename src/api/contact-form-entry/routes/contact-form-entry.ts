/**
 * contact-form-entry router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::contact-form-entry.contact-form-entry", {
  config: {
    create: { policies: ["global::verifyCaptcha"] },
  },
});
