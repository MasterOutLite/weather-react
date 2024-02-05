import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {CitySearch} from "../../type/city-search";

export interface CityState {
  city: CitySearch[],
}

const initialState: CityState = {
  city: [],
}

export const citySlice = createSlice({
  name: 'search-history',
  initialState,
  reducers: {
    addCity(state: CityState, action: PayloadAction<CitySearch>) {
      state.city.push(action.payload);
    },
    removeCity(state: CityState, action: PayloadAction<CitySearch>) {
      console.log(action.payload)
      state.city = state.city.filter(value => value.fullName !== action.payload.fullName);
    },
  },
})

export const {addCity, removeCity} = citySlice.actions

export default citySlice.reducer
