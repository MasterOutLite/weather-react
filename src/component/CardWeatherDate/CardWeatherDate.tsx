import React from 'react';
import {convertDate} from "../../helper/convert-date";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import style from './CardWeatherDate.module.scss'

export interface CardWeatherDateProps {
  dateWeather: string | number;
}

function CardWeatherDate({dateWeather}: CardWeatherDateProps) {
  const lang = useSelector((state: RootState) => state.language.lan);
  const date = new Date(dateWeather);
  const stringDate = convertDate(date, lang);
  return (
    <p className={style.root}>{stringDate}</p>
  );
}

export default CardWeatherDate;
