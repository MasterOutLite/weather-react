import React from 'react';
import {useGetWeatherByCityQuery} from "../../service/weatherService";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import CardWeather from "../CardWeather/CardWeather";
import style from './WrapperCardWeather.module.scss'
import clsx from "clsx";
import {removeCity} from "../../store/city/citySlice";
import {Language} from "../../const/language";
import {CitySearch} from "../../type/city-search";

export interface WrapperCardWeatherProps {
  city: CitySearch;
  cardClass?: string;
}

function WrapperCardWeather({city, cardClass}: WrapperCardWeatherProps) {
  const lan = useSelector((state: RootState) => state.language.lan);
  const dispatch = useDispatch()
  const {data, isError, error} = useGetWeatherByCityQuery({
    units: 'imperial',
    lang: Language.EN,
    cord: city.cord,
  });

  function handleRemoveCard() {
    dispatch(removeCity(city))
  }

  if (isError && error) {
    const {status} = error as { status: number };
    if (status == 404) {
      console.log(error, status)
      //dispatch(removeCity(city));
    }
  }

  if (data)
    return (
      <CardWeather className={cardClass} weather={data} cardCity={city}/>
    );
  else if (isError)
    return (
      <div className={clsx(style.card, style.cardError)}>
        {/*<p className={style.errorText} >City "{city}" not found!</p>*/}
        <button className={style.btnRemove}
                onClick={handleRemoveCard}
        >
          Remove
        </button>
      </div>
    );
  else
    return null;
}

export default WrapperCardWeather;
