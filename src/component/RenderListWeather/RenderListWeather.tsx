import React, {useEffect, useState} from 'react';
import {getWeatherByCoordinates} from "../../helper/api/api";
import {getGeolocation} from "../../helper/geolocation";
import CardWeather from "../CardWeather/CardWeather";
import {WeatherResponse} from "../../type/weather-api/weather-response";
import WrapperCardWeather from "../WrapperCardWeather/WrapperCardWeather";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import style from './RenderListWeather.module.scss'

function RenderListWeather() {
  const [weather, setWeather] = useState<WeatherResponse>();
  const {city} = useSelector((state: RootState) => state.city)

  useEffect(() => {
    const get = async () => {
      const coordinates = await getGeolocation();
      console.log('RenderListWeather', coordinates)
      const weather = await getWeatherByCoordinates(coordinates);
      setWeather(weather);
      console.log(weather);
    }
    get();
  }, []);

  return (
    <div className={style.box}>
      {
        weather ?
          <div style={{width: 350}}>
            <CardWeather weather={weather} cardCity={weather.city.name}/>
          </div>
          : null
      }

      {
        city.map(value =>
          <WrapperCardWeather key={value} city={value}/>)
      }
    </div>
  );
}

export default RenderListWeather;
