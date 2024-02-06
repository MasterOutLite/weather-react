import React, {Suspense, useEffect} from 'react';
import './App.css';
import Header from "./layout/Header/Header";
import RenderListWeather from "./component/RenderListWeather/RenderListWeather";
import SearchBar from "./component/SearchBar/SearchBar";
import './i18n';
import {useSelector} from "react-redux";
import {RootState} from "./store/store";
import {useTranslation} from "react-i18next";

function App() {
  const {lan} = useSelector((state: RootState) => state.language);
  const {i18n} = useTranslation()


  useEffect(() => {
    i18n.changeLanguage(lan);
// eslint-disable-next-line
  }, [])

  return (
    <Suspense>
      <div className="App" style={{padding: 25}}>
        <Header/>
        <div style={{paddingBottom: 40}}>
          <SearchBar/>
        </div>
        <RenderListWeather/>
      </div>
    </Suspense>
  );
}

export default App;
