import {Language} from "../const/language";

export type QueryWeather ={

  units: 'imperial' | 'metric';
  q?: string;
  lang: Language
}
