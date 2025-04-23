import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Movie } from '../../types/movies';

interface GPTState {
  showGPTSearch: boolean;
  movieNames: string[];
  movieResults: Movie[][];
  hasSearched: boolean;
  isLoading: boolean;
  lastQuery: string;
}
interface GPTMoviePayload {
  movieNames: string[];
  movieResults: Movie[][];
}
const initialState: GPTState = {
  showGPTSearch: false,
  movieNames: [],
  movieResults: [],
  hasSearched: false,
  isLoading: false,
  lastQuery: '',
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
      state.hasSearched = true;
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setLastQuery: (state, action: PayloadAction<string>) => {
      state.lastQuery = action.payload;
    },
    resetGPTSearch: (state) => {
      state.movieNames = [];
      state.movieResults = [];
      state.hasSearched = false;
      state.isLoading = false;
      state.lastQuery = '';
    },
  },
});

export const {
  toggleGPTSearchView,
  setGPTSearchView,
  addGPTMovieResults,
  setLoading,
  setLastQuery,
  resetGPTSearch,
} = gptSlice.actions;
export default gptSlice.reducer;
