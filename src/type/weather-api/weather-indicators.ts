import {WeatherState} from "./weather-state";
import {Weather} from "./weather";
import {WeatherWind} from "./weather-wind";

export type WeatherIndicators = {
  dt: number;
  main: WeatherState;
  weather: Weather [];
  clouds: {
    all: number;
  }
  wind: WeatherWind;
  visibility: number;
  pop: number;
  snow?:{
    "3h": string
  }
  rain?:{
    "3h": string;
  }
  sys: {
    pod: string;
  },
  dt_txt: string;
}
