import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "~/locales/en/translation.json";
import ptBr from "~/locales/pt-br/translation.json";

export const i18n = i18next.createInstance();

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  lowerCaseLng: true,
  resources: {
    en: { translation: en },
    "pt-br": { translation: ptBr },
  },
  showSupportNotice: false,
});
