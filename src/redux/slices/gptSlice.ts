import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Movie } from '../../types/movies';

interface GPTState {
  showGPTSearch: boolean;
  movieNames: string[];
  movieResults: Movie[];
}
interface GPTMoviePayload {
  movieNames: string[];
  movieResults: Movie[];
}
const initialState: GPTState = {
  showGPTSearch: false,
  movieNames: [],
  movieResults: [],
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
    addGPTMovieResults: (state, action: PayloadAction<GPTMoviePayload>) => {
      const { movieNames, movieResults } = action.payload;
      state.movieNames = movieNames;
      state.movieResults = movieResults;
    },
  },
});

export const { toggleGPTSearchView, setGPTSearchView, addGPTMovieResults } =
  gptSlice.actions;
export default gptSlice.reducer;
