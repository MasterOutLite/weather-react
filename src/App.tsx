import React, {Suspense} from 'react';
import './App.css';
import Header from "./layout/Header/Header";
import RenderListWeather from "./component/RenderListWeather/RenderListWeather";
import SearchBar from "./component/SearchBar/SearchBar";
import './i18n';

function App() {

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
