import {Coordinates} from "./coordinates";
import {TemperatureUnit} from "../const/temperature-unit";

export type CitySearch = {
  fullName: string;
  localName?: string;
  cord?: Coordinates;
  name?: string;
  country?: string;
  state?: string;
  unit?: TemperatureUnit;
}
