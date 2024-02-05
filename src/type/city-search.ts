import {Coordinates} from "./coordinates";

export type CitySearch = {
  fullName: string;
  localName?: string;
  cord?: Coordinates;
  name?: string;
  country?: string;
}
