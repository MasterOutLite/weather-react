import {WeatherIndicators} from "../type/weather-api/weather-indicators";
import {ColorSpecification} from "chartjs-plugin-gradient/types/options";
import {fahrenheitToCelsius} from "./convertTemperature";

export function weatherLineChartConfig(weathers: WeatherIndicators []) {

  const filterWeathers = filterWeather(weathers, 12);

  const dates: string[] = []
  const temps: number[] = []

  for (const weather of filterWeathers) {
    const temp = weather.main.temp;
    const date = new Date(weather.dt_txt);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const formattedDate = `${day < 10 ? '0' : ''}${day}:${month < 10 ? '0' : ''}${month}`;
    temps.push(temp);
    dates.push(formattedDate);
  }

  return {date: dates, temp: temps};
}

export function filterWeather(weathers: WeatherIndicators [], time: number) {
  const weatherByDay: { date: number, weather: WeatherIndicators }[] = []

  for (const weather of weathers) {
    const date = new Date(weather.dt_txt);
    if (date.getHours() === time)
      continue;
    const day = date.getDate();
    const exists = weatherByDay.find(value => value.date === day);
    if (!exists)
      weatherByDay.push({date: day, weather});
  }

  return weatherByDay.map(value => value.weather);
}

export type ConfigCardWeatherFonts = {
  bg: string,
  lineChartBg: ColorSpecification,
  color: string;
}

export function configCardWeatherFonts(tempFahrenheit: number): ConfigCardWeatherFonts {
  const celsius: number = fahrenheitToCelsius(tempFahrenheit);
  if (celsius < 0) {
    return {
      bg: '#F1F2FF',
      color: '#459DE9',
      lineChartBg: {
        axis: 'y',
        colors: {
          0: 'rgb(241, 242, 255, 0.3)',
          200: 'rgb(91, 140, 255, 0.3)'
        }
      },
    }
  } else {
    return {
      bg: '#FFFAF1',
      color: '#FFA25B',
      lineChartBg: {
        axis: 'y',
        colors: {
          0: 'rgb(255, 250, 241, 0.3)',
          200: 'rgb(255, 162, 91, 0.3)'
        }
      }
    }
  }
}
