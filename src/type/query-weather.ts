import {Language} from "../const/language";
import {Coordinates} from "./coordinates";

export type QueryWeather = {

  units: 'imperial' | 'metric';
  q?: string;
  lang: Language;
  cord?: Coordinates;
}
