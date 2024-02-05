import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {Language} from "../../const/language";

export interface LanguageState {
  lan: Language
}

const initialState: LanguageState = {
  lan: Language.EN
}

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    changeLanguage(state: LanguageState, action: PayloadAction<Language>) {
      state.lan = action.payload;
    }
  },
})

export const {changeLanguage} = languageSlice.actions

export default languageSlice.reducer
