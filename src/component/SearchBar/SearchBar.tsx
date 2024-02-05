import React, {ChangeEvent, FocusEventHandler, useState} from 'react';
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {addCity} from "../../store/city/citySlice";

import style from './SearchBar.module.scss'
import clsx from "clsx";

function SearchBar() {

  const {city, searchCity} = useSelector((state: RootState) => state.city);
  //const {lan} = useSelector((state: RootState) => state.language);
  const dispatch = useDispatch();

  const [search, setSearch] = useState<string>('');
  const [isFocusSearch, setIsFocusSearch] = useState<boolean>(false);
  const {t} = useTranslation();

  function handleChangeSearch(e: ChangeEvent<HTMLInputElement>) {
    console.log(search)
    setSearch(e.target.value);
  }

  function handleAddSearchHistory() {
    if (!search)
      return;
    dispatch(addCity(search));
    setSearch('')
  }

  function changeFocus(focus: boolean) {
    return () => {
      setIsFocusSearch(focus);
    }
  }

  return (
    <div className={style.root}>

      <div className={style.inputRoot}>
        <input onFocus={changeFocus(true)}
               onBlur={changeFocus(false)}
               onChange={handleChangeSearch} type='text' className={style.input}/>
        <div className={isFocusSearch ? style.inputHistory : style.hideHistory}>
          {
            city.map(value =>
              <div key={value}
                   className={clsx(style.textHistory, value.includes(search) && search ? style.inputHistoryFocus : null)}
              >{value}</div>)
          }
        </div>
      </div>


      <button className={style.btn} onClick={handleAddSearchHistory}>{t('Add')}</button>
    </div>
  );
}

export default SearchBar;
