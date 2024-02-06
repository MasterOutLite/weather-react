import React, {useState} from 'react';
import style from './Header.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {changeLanguage} from "../../store/language/languageSlice";
import {Language} from "../../const/language";
import {useTranslation} from "react-i18next";
import clsx from "clsx";


const language = [Language.EN, Language.UA, Language.HE];

function Header() {
  const {i18n} = useTranslation();
  const lan = useSelector((state: RootState) => state.language.lan);
  const dispatch = useDispatch();

  const [isFocusSelect, setIsFocusSelect] = useState<boolean>(false);

  function handleChangeFocusSelect(focus: boolean) {
    return () => {
      setIsFocusSelect(focus);
    }
  }

  function handleChangeValue(value: any) {
    return () => {
      dispatch(changeLanguage(value));
      i18n.changeLanguage(value);
      document.body.dir = i18n.dir();
      console.log(document.head.title);
      document.title = i18n.t('title', {lng: value});
      setIsFocusSelect(false);
    }
  }

  return (
    <div className={style.root}>
      <div className={style.customSelect}>

        <button
          onClick={handleChangeFocusSelect(true)}
          className={style.select}>
          <svg xmlns="http://www.w3.org/2000/svg" width="15" viewBox="0 0 12.17 12.17">
            <path id="Icon_material-language" data-name="Icon material-language"
                  d="M9.079,3A6.085,6.085,0,1,0,15.17,9.085,6.082,6.082,0,0,0,9.079,3ZM13.3,6.651H11.5a9.522,9.522,0,0,0-.84-2.166A4.886,4.886,0,0,1,13.3,6.651ZM9.085,4.241a8.572,8.572,0,0,1,1.162,2.41H7.923A8.572,8.572,0,0,1,9.085,4.241ZM4.375,10.3a4.76,4.76,0,0,1,0-2.434H6.432a10.049,10.049,0,0,0-.085,1.217A10.049,10.049,0,0,0,6.432,10.3Zm.5,1.217h1.8a9.522,9.522,0,0,0,.84,2.166A4.86,4.86,0,0,1,4.874,11.519Zm1.8-4.868h-1.8A4.86,4.86,0,0,1,7.509,4.485,9.522,9.522,0,0,0,6.669,6.651Zm2.416,7.277a8.572,8.572,0,0,1-1.162-2.41h2.324A8.572,8.572,0,0,1,9.085,13.928ZM10.509,10.3H7.661a8.953,8.953,0,0,1-.1-1.217,8.875,8.875,0,0,1,.1-1.217h2.848a8.875,8.875,0,0,1,.1,1.217A8.953,8.953,0,0,1,10.509,10.3Zm.152,3.383a9.522,9.522,0,0,0,.84-2.166h1.8a4.886,4.886,0,0,1-2.635,2.166ZM11.738,10.3a10.049,10.049,0,0,0,.085-1.217,10.049,10.049,0,0,0-.085-1.217h2.057a4.76,4.76,0,0,1,0,2.434Z"
                  transform="translate(-3 -3)" fill="#afafaf"/>
          </svg>
          <span className={style.selectText}>
               {lan.toUpperCase()}
            </span>
          <svg className={isFocusSelect ? style.selectActive : ''} xmlns="http://www.w3.org/2000/svg" height="20"
               fill="#AFAFAF" viewBox="0 0 256 256">
            <path
              d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"/>
          </svg>
        </button>
        <div onClick={handleChangeFocusSelect(false)}
             className={isFocusSelect ? style.block : ''}></div>

        <div className={isFocusSelect ? style.optionsBox : style.hideSelect}>
          {
            language.map(value =>
              <div
                onClick={handleChangeValue(value)}
                className={clsx(style.options, lan.toLowerCase() === value.toLowerCase() ? style.optionSelected : null)}
                key={value}>{value.toUpperCase()}</div>)
          }
        </div>
      </div>

    </div>
  );
}

export default Header;
