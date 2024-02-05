import {WeatherIndicators} from "./weather-indicators";
import {City} from "./city";

export type WeatherResponse = {
  cod: number;
  message: string;
  cnt: number;
  list: WeatherIndicators[];
  city: City;
}
