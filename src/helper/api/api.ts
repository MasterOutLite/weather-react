import {Coordinates} from "../../type/coordinates";
import queryString from 'query-string';
import {WeatherResponse} from "../../type/weather-api/weather-response";
import {CityResponse} from "../../type/city-response";

const API_URL = 'http://api.openweathermap.org/data/2.5/'
const appid = process.env.REACT_APP_WEATHER_API_KEY;
const units = 'imperial';

export async function getWeatherByCoordinates(cord: Coordinates) {
  const queryRequest = {...cord, appid, units};
  const query = queryString.stringify(queryRequest, {skipNull: true, skipEmptyString: true});
  const date = await fetch(API_URL + 'forecast?' + query);
  return await date.json() as WeatherResponse;
}

export async function getCityByName(name: string) {
  const date = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${appid}`);
  return await date.json() as CityResponse[];
}
