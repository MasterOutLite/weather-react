import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {CitySearch} from "../../type/city-search";
import {TemperatureUnit} from "../../const/temperature-unit";

export interface CityState {
  city: CitySearch[],
  defaultCity: CitySearch | undefined,
}

const initialState: CityState = {
  city: [],
  defaultCity: undefined,
}

export const citySlice = createSlice({
  name: 'search-history',
  initialState,
  reducers: {
    addCity(state: CityState, action: PayloadAction<CitySearch>) {
      state.city.push(action.payload);
    },
    removeCity(state: CityState, action: PayloadAction<CitySearch>) {
      state.city = state.city.filter(value => value.fullName !== action.payload.fullName);
      if (state.defaultCity?.fullName === action.payload.fullName)
        state.defaultCity = undefined;
    },
    changeTemp(state: CityState, action: PayloadAction<{ fullName: string, temp: TemperatureUnit }>) {
      const cityIndex = state.city.findIndex(value => value.fullName === action.payload.fullName);
      if (cityIndex !== -1) {
        state.city[cityIndex].unit = action.payload.temp;
        return;
      }
      if (state.defaultCity?.fullName === action.payload.fullName)
        state.defaultCity.unit = action.payload.temp;
    },
    setDefault(state: CityState, action: PayloadAction<CitySearch>) {
      state.defaultCity = {...state.defaultCity, ...action.payload};
    },
    removeDefaultCity(state: CityState,) {
      state.defaultCity = undefined;
    },
    changeDefaultCityTemp(state: CityState, action: PayloadAction<TemperatureUnit>) {
      if (state.defaultCity)
        state.defaultCity.unit = action.payload;
    }
  },
})

export const {addCity, removeCity, changeTemp, removeDefaultCity, changeDefaultCityTemp, setDefault} = citySlice.actions

export default citySlice.reducer
