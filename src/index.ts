// import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    strapi.log.info("In register function.");
    const extensionService = strapi.plugin("graphql").service("extension");

    // read-single policy for letter
    extensionService.use({
      resolversConfig: {
        "Mutation.createContactFormEntry": {
          policies: ["global::verifyCaptcha"],
        },
      },
    });
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/* { strapi }: { strapi: Core.Strapi } */) {},
};
