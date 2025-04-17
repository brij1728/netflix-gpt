import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface GPTState {
  showGPTSearch: boolean;
}

const initialState: GPTState = {
  showGPTSearch: false,
};
const gptSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    toggleGPTSearchView: (state) => {
      state.showGPTSearch = !state.showGPTSearch;
    },
    setGPTSearchView: (state, action: PayloadAction<boolean>) => {
      state.showGPTSearch = action.payload;
    },
  },
});

export const { toggleGPTSearchView, setGPTSearchView } = gptSlice.actions;
export default gptSlice.reducer;
