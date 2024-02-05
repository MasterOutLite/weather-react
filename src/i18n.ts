import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import {Language} from "./const/language";
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  [Language.EN]: {
    translation: {
      "Clouds": "Clouds",
      "Sunny": "Sunny",
      "Rain": "Rain",
      "Clear": "Clear",
      "Feels like": "Feels like:",
      "Wind": "Wind:",
      "Humidity": "Humidity:",
      "Pressure": "Pressure:",
      "Add": "Addss",
    }
  },
  [Language.UA]: {
    translation: {
      "Clouds": "Хмарно",
      "Sunny": "Сонячно",
      "Rain": "Дощ",
      "Clear": "Ясно",
      "Feels like": "Відчувається як:",
      "Wind": "Вітер:",
      "Humidity": "Вологість:",
      "Pressure": "Тиск:",
      "Add": "Додати",
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    debug: true,
    lng: "en",
    interpolation: {
      escapeValue: false
    }
  })
;

export default i18n;
