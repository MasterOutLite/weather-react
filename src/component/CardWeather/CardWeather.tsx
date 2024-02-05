import React, {useMemo, useState} from 'react';
import getIconUrl from "../../helper/api/api-icon";
import {WeatherResponse} from "../../type/weather-api/weather-response";
import TemperatureGraph from "../TemperatureGraph/TemperatureGraph";
import {configCardWeatherFonts, weatherLineChartConfig} from "../../helper/weatherLineChartConfig";
import {TemperatureUnit} from "../../const/temperature-unit";
import {fahrenheitToCelsiusArr} from "../../helper/convertTemperature";
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import CardWeatherDate from "../CardWeatherDate/CardWeatherDate";
import CardWeatherIndexes from "../CardWeatherIndexes/CardWeatherIndexes";
import clsx from "clsx";
import style from './CardWeather.module.scss'
import {removeCity} from "../../store/city/citySlice";

export interface CardWeatherProps {
  cardCity: string,
  weather: WeatherResponse,
  className?: string,
}

function CardWeather({weather, className, cardCity}: CardWeatherProps) {

  const {city, list} = weather
  const {t} = useTranslation();
  const [temp, setTemp] = useState<TemperatureUnit>(TemperatureUnit.Celsius);
  const lang = useSelector((state: RootState) => state.language.lan);
  const dispatch = useDispatch();
  const currentWeather = list[0];

  const bgConfig = configCardWeatherFonts(currentWeather.main.temp);
  const weatherConfig = weatherLineChartConfig(list);

  function handleChangeTemperature(temp: TemperatureUnit) {
    return () => {
      setTemp(temp);
    }
  }

  const weatherIndex = useMemo(() => {
    if (temp == TemperatureUnit.Celsius) {
      return fahrenheitToCelsiusArr(weatherConfig.temp);
    } else {
      return weatherConfig.temp.map(value => Math.floor(value));
    }
  }, [temp, weatherConfig])

  function handleRemoveCard() {
    dispatch(removeCity(cardCity))
  }

  return (
    <div style={{background: bgConfig.bg}} className={clsx(style.root, style.flexCol, className)}>
      <div className={clsx(style.flexCol, style.alignItemsEnd)}>
        <button className={style.btnClose}
                onClick={handleRemoveCard}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="8" fill="#C5C5C5" viewBox="0 0 256 256">
            <path
              d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"/>
          </svg>
        </button>
      </div>

      <div className={clsx(style.flexRow, style.alignItemsCenter, style.justifyContentBetween)}>
        <h6 className={style.city}>{city.name}, {city.country}</h6>
        <div className={clsx(style.flexRow, style.alignItemsCenter, style.gap1)}>
          <img height={40}
               src={getIconUrl(currentWeather.weather[0].icon)}
               alt={currentWeather.weather[0].description}/>
          <p className={style.weatherType}>
            {t(currentWeather.weather[0].main)}
          </p>
        </div>
      </div>

      <CardWeatherDate dateWeather={currentWeather.dt_txt}/>

      <div style={{height: 100}}>
        <TemperatureGraph background={bgConfig.lineChartBg}
                          labels={weatherConfig.date}
                          values={weatherIndex}/>
      </div>

      <CardWeatherIndexes weathers={list}
                          changeTemperature={handleChangeTemperature}
                          temp={temp}
                          color={bgConfig.color}/>

    </div>
  );
}

export default CardWeather;
