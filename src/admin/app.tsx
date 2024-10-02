import type { StrapiApp } from "@strapi/strapi/admin";

export default {
  config: {
    locales: [
      // 'ar',
      // 'fr',
      // 'cs',
      // 'de',
      // 'dk',
      // 'es',
      // 'he',
      // 'id',
      // 'it',
      // 'ja',
      // 'ko',
      // 'ms',
      // 'nl',
      // 'no',
      // 'pl',
      // 'pt-BR',
      // 'pt',
      // 'ru',
      // 'sk',
      // 'sv',
      // 'th',
      // 'tr',
      // 'uk',
      // 'vi',
      // 'zh-Hans',
      // 'zh',
    ],
    translations: {
      en: {
        "Auth.form.welcome.title": "Welcome to St Modwens PTA",
        "Auth.form.welcome.subtitle": "Log in to your control panel"
        // Users: "Utilisateurs",
        // City: "CITY (FRENCH)",
        // // Customize the label of the Content Manager table.
        // Id: "ID french"
      }
    }
  },
  bootstrap(app: StrapiApp) {
    console.log(app);
  }
};
