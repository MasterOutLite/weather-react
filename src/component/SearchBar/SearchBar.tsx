import React, {ChangeEvent, useState} from 'react';
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";

import style from './SearchBar.module.scss'
import clsx from "clsx";
import {getCityByName} from "../../helper/api/api";
import {addCity} from "../../store/city/citySlice";
import {CitySearch} from "../../type/city-search";


function SearchBar() {
  const {lan} = useSelector((state: RootState) => state.language);
  const dispatch = useDispatch();
  const [autocompleting, setAutocompleting] = useState<CitySearch[]>([]);

  const [search, setSearch] = useState<string>('');
  const [cityCord, setCityCord] = useState<CitySearch | null>();
  const [isFocusSearch, setIsFocusSearch] = useState<boolean>(false);
  const {t} = useTranslation();

  function handleChangeSearch(e: ChangeEvent<HTMLInputElement>) {
    const {target: {value}} = e;
    setSearch(value);
    setCityCord(null);

    updateAutocompleting(value);
  }

  async function updateAutocompleting(name: string) {
    if (!name)
      return;
    const response = await getCityByName(name);
    if (!Array.isArray(response))
      return;

    const cities = response.map(value => {
      const search: CitySearch = {fullName: ''};

      if (value.local_names) {
        const localName = value.local_names[lan];
        if (localName)
          search.localName = `${localName}, ${value.country}`;
      }
      if (value.name)
        search.fullName = `${value.name}, ${value.country}`;

      let state = value.state ? value.state : '';
      if (search.fullName && state) {
        state = ', ' + state;
      }

      search.fullName = search.fullName + state;
      search.localName = search.localName + state;
      search.name = value.name;
      search.country = value.country
      search.cord = {lat: value.lat, lon: value.lon};
      search.state = value.state;

      return search
    })

    setAutocompleting(() => cities);
  }

  function handleAddSearchHistory() {
    if (!search || !cityCord) {
      return;
    }

    dispatch(addCity(cityCord));
    setSearch('');
    setCityCord(null);
    setIsFocusSearch(false);
  }

  function changeFocus(focus: boolean) {
    return () => {
      setIsFocusSearch(focus);
    }
  }

  function handleSetCity(search: CitySearch) {
    return () => {
      setSearch(() => search.fullName);
      setCityCord(() => search);
      setIsFocusSearch(false);
    }
  }

  return (
    <div className={style.root}>

      <div className={style.inputRoot}>
        <input onFocus={changeFocus(true)}
               value={search}
               placeholder={t('Enter city', {lng: lan})}
               onChange={handleChangeSearch} type='text' className={style.input}/>
        <div
          onClick={changeFocus(false)}
          className={isFocusSearch ? style.block : ''}></div>
        <div className={isFocusSearch ? style.inputHistory : style.hideHistory}>
          {
            search && autocompleting.map((value, index) =>
              <div key={index + value.fullName}
                   onClick={handleSetCity(value)}
                   className={clsx(style.textHistory, style.inputHistoryFocus)}
              >
                {value.fullName ? value.fullName : value.state}
              </div>
            )
          }
        </div>
      </div>
      <button className={style.btn} onClick={handleAddSearchHistory}>{t('Add', {lng: lan})}</button>
    </div>
  );
}

export default SearchBar;
