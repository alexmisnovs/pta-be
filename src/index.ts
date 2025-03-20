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

    extensionService.use(({ strapi }) => ({
      resolvers: {
        Mutation: {
          createVolunteer: {
            resolve: async (parent, args, context) => {
              const { toEntityResponse } = strapi.service("plugin::graphql.format").returnTypes;

              // 1. Extract and clean the data
              const { data } = args;
              const { captcha, ...cleanData } = data; // Remove captcha field
              strapi.log.info("In createVolunteer mutation.");
              // 2. Create the volunteer with cleaned data
              const entry = await strapi.entityService.create("api::volunteer.volunteer", {
                data: cleanData,
              });

              // 3. Return properly formatted response
              return toEntityResponse(entry);
            },
          },
        },
      },
      resolversConfig: {
        "Mutation.createVolunteer": {
          policies: ["global::verifyCaptcha"],
        },
        "Mutation.createContactFormEntry": {
          policies: ["global::verifyCaptcha"],
        },
      },
    }));
  },
  // read-single policy for letter
  // extensionService.use({
  //   resolversConfig: {
  //     "Mutation.createContactFormEntry": {
  //       policies: ["global::verifyCaptcha"],
  //     },
  //     "Mutation.createVolunteer": {
  //       policies: ["global::verifyCaptcha"],
  //     },
  //   },
  // });

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/* { strapi }: { strapi: Core.Strapi } */) {},
};
