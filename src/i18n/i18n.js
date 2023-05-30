import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import vn_text from "./text_vn.json";
import en_text from "./text_en.json";

// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init
const defaultLanguage = window.localStorage.getItem("language");

const resources = {
  en: {
    translation: en_text,
  },
  vi: {
    translation: vn_text,
  },
};

i18n

  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: defaultLanguage,
    debug: true,
    resources,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
