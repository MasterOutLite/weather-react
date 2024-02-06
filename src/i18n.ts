import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import {Language} from "./const/language";
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  [Language.EN]: {
    translation: {
      "title": "Weather",
      "Clouds": "Clouds",
      "Sunny": "Sunny",
      "Rain": "Rain",
      "Snow": "Snow",
      "Clear": "Clear",
      "Feels like": "Feels like:",
      "Wind": "Wind:",
      "WindIndex": "{{speed}} m/s",
      "Humidity": "Humidity:",
      "Pressure": "Pressure:",
      "Add": "Add",
    }
  },
  [Language.UA]: {
    translation: {
      "title": "Погода",
      "Clouds": "Хмарно",
      "Sunny": "Сонячно",
      "Rain": "Дощ",
      "Clear": "Ясно",
      "Snow": "Сніг",
      "Feels like": "Відчувається як:",
      "Wind": "Вітер: ",
      "WindIndex": "{{speed}} м/с",
      "Humidity": "Вологість:",
      "Pressure": "Тиск:",
      "Add": "Додати",
    }
  },
  [Language.HE]: {
    translation: {
      "title": "מזג אוויר",
      "Clouds": "עננים",
      "Sunny": "שִׁמשִׁי",
      "Rain": "גֶשֶׁם",
      "Clear": "ברור",
      "Snow": "שֶׁלֶג",
      "Feels like": "מרגיש כמו:",
      "Wind": "רוּחַ:",
      "WindIndex": "{{speed}} גברת",
      "Humidity": "לחות:",
      "Pressure": "לַחַץ:",
      "Add": "לְהוֹסִיף",
    }
  },
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
