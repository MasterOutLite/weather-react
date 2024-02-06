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
  const {city} = useSelector((state: RootState) => state.city);
  // console.log(city);

  useEffect(() => {
    const get = async () => {
      const coordinates = await getGeolocation();
      const weather = await getWeatherByCoordinates(coordinates);
      setWeather(weather);
    }
    get();
  }, []);

  return (
    <div className={style.box}>
      {
        weather ?
          <div className={style.card} key={'default'}>
            <CardWeather weather={weather}
                         className={style.card}
                         cardCity={{fullName: '', name: weather.city.name, country: weather.city.country}}/>
          </div>
          : null
      }

      {
        city.map(value =>
          <div className={style.card} key={value.fullName + value.state}>
            <WrapperCardWeather cardClass={style.card} city={value}/>
          </div>
        )
      }
    </div>
  );
}

export default RenderListWeather;
