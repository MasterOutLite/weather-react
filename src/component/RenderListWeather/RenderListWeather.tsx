import React, {useEffect, useState} from 'react';
import {getWeatherByCoordinates} from "../../helper/api/api";
import {getGeolocation} from "../../helper/geolocation";
import CardWeather from "../CardWeather/CardWeather";
import {WeatherResponse} from "../../type/weather-api/weather-response";
import WrapperCardWeather from "../WrapperCardWeather/WrapperCardWeather";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import style from './RenderListWeather.module.scss'
import {setDefault} from "../../store/city/citySlice";

function RenderListWeather() {
  const [weather, setWeather] = useState<WeatherResponse>();
  const {city, defaultCity} = useSelector((state: RootState) => state.city);
  const dispatch = useDispatch()

  useEffect(() => {
    const get = async () => {
      const coordinates = await getGeolocation();
      const weather = await getWeatherByCoordinates(coordinates);
      const {city} = weather;
      dispatch(setDefault({fullName: 'default', name: city.name, country: city.country, cord: city.coord}))
      setWeather(weather);
    }
    get();
  }, []);

  return (
    <div className={style.box}>
      {
        weather && defaultCity ?
          <div className={style.card}>
            {/*<CardWeather weather={weather}*/}
            {/*             className={style.card}*/}
            {/*             cardCity={defaultCity}*/}

            {/*/>*/}
            <WrapperCardWeather cardClass={style.card} city={defaultCity}/>
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
