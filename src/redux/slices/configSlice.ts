import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { LanguageCode } from '../../types/lang';

interface LangState {
  lang: LanguageCode;
}
const initialState: LangState = {
  lang: (localStorage.getItem('lang') as LanguageCode) || 'en',
};
const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    changeLanguage: (state, action: PayloadAction<LanguageCode>) => {
      state.lang = action.payload;
      localStorage.setItem('lang', action.payload);
    },
  },
});

export const { changeLanguage } = configSlice.actions;

export default configSlice.reducer;
