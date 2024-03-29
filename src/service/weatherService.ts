import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {WeatherResponse} from "../type/weather-api/weather-response";
import {QueryWeather} from "../type/query-weather";
import queryString from "query-string";

const appid = process.env.REACT_APP_WEATHER_API_KEY;
export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://api.openweathermap.org/data/2.5/'}),
  endpoints: (builder) => ({
    getWeatherByCity: builder.query<WeatherResponse, QueryWeather>({
      query: (options) => {
        const queryRequest = {
          appid,
          lang: options.lang,
          lon: options.cord?.lon,
          lat: options.cord?.lat,
          units: 'imperial',
        };

        const query = queryString.stringify(queryRequest, {skipNull: true, skipEmptyString: true});
        return `forecast?${query}`
      },
    }),
  }),
})

export const {useGetWeatherByCityQuery} = weatherApi
