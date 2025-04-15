import { createSlice } from '@reduxjs/toolkit';

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
  },
});

export const { toggleGPTSearchView } = gptSlice.actions;
export default gptSlice.reducer;
