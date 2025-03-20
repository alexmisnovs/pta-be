/**
 * volunteer router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::volunteer.volunteer", {
  config: {
    create: { policies: ["global::verifyCaptcha"] },
  },
});
// export default factories.createCoreRouter("api::volunteer.volunteer");
