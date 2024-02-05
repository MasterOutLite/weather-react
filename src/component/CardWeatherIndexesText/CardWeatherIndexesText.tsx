import React from 'react';
import style from './CardWeatherIndexesText.module.scss'


export interface CardWeatherIndexesTextProps {
  color: string;
  title: string;
  text: string;
}

function CardWeatherIndexesText({color, text, title}: CardWeatherIndexesTextProps) {
  return (
    <p className={style.root}>{title}
      <span style={{color: color}}> {text}</span>
    </p>
  );
}

export default CardWeatherIndexesText;
