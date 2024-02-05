import {configureStore} from '@reduxjs/toolkit'
import LanguageSlice from "./language/languageSlice";
import {weatherApi} from "../service/weatherService";
import {setupListeners} from "@reduxjs/toolkit/query";
import CitySlice from "./city/citySlice";
import storage from 'redux-persist/lib/storage'
import {persistReducer, persistStore} from 'redux-persist';
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: [weatherApi.reducerPath],
}

const persistedCity = persistReducer(persistConfig, CitySlice)
const persistedLanguage = persistReducer(persistConfig, LanguageSlice)


export const store = configureStore({
  reducer: {
    language: persistedLanguage,
    city: persistedCity,
    [weatherApi.reducerPath]: weatherApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(weatherApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export let persistor = persistStore(store)
