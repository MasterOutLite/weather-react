import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'

export interface CityState {
  city: string[],
  searchCity: string[],
}

const initialState: CityState = {
  city: [],
  searchCity: []
}

export const citySlice = createSlice({
  name: 'search-history',
  initialState,
  reducers: {
    addCity(state: CityState, action: PayloadAction<string>) {
      state.city.push(action.payload);
      state.searchCity.push(action.payload);
    },
    removeCity(state: CityState, action: PayloadAction<string>) {
      console.log(action.payload)
      state.city = state.city.filter(value => value != action.payload);
    },
  },
})

export const {addCity, removeCity} = citySlice.actions

export default citySlice.reducer
