import React from 'react';
import clsx from "clsx";
import {TemperatureUnit} from "../../const/temperature-unit";
import CardWeatherIndexesText from "../CardWeatherIndexesText/CardWeatherIndexesText";
import {WeatherIndicators} from "../../type/weather-api/weather-indicators";
import {useTranslation} from "react-i18next";
import {fahrenheitToCelsius} from "../../helper/convertTemperature";

import style from './CardWeatherIndexes.module.scss'

export interface CardWeatherIndexesProps {
  weathers: WeatherIndicators[],
  changeTemperature: (e: TemperatureUnit) => () => void,
  temp: TemperatureUnit,
  color: string,
}

function CardWeatherIndexes({weathers, changeTemperature, temp, color}: CardWeatherIndexesProps) {
  const {t} = useTranslation();

  const currentWeather = weathers[0];

  function convertTemp(value: number) {
    if (temp === TemperatureUnit.Celsius)
      return fahrenheitToCelsius(value);
    else
      return Math.floor(value);
  }


  return (
    <div className={style.root}>
      <div>
        <div className={clsx(style.flexRow)}>
          <p className={style.temperature}>
            {convertTemp(currentWeather.main.temp)}
          </p>

          <div className={style.btnGroup}>
            <button
              className={clsx(style.btnTemp, temp === TemperatureUnit.Celsius ? style.btnTempActive : null)}
              onClick={changeTemperature(TemperatureUnit.Celsius)}
            >°C
            </button>
            <div className={style.divider}/>
            <button
              className={clsx(style.btnTemp, temp === TemperatureUnit.Fahrenheit ? style.btnTempActive : null)}
              onClick={changeTemperature(TemperatureUnit.Fahrenheit)}
            >°F
            </button>
          </div>

        </div>

        <p className={style.feelsLike}>{t('Feels like')} {convertTemp(currentWeather.main.feels_like)} °C</p>
      </div>

      <article>
        <CardWeatherIndexesText color={color}
                                title={t('Wind')}
                                text={currentWeather.wind.speed + ' m/s'}/>

        <CardWeatherIndexesText color={color}
                                title={t('Humidity')}
                                text={currentWeather.main.humidity + ' %'}/>

        <CardWeatherIndexesText color={color}
                                title={t('Pressure')}
                                text={currentWeather.main.pressure + ' Pa'}/>
      </article>
    </div>
  );
}

export default CardWeatherIndexes;
