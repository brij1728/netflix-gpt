import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Movie } from '../../types/movies';

interface MoviesState {
  nowPlayingMovies: Movie[] | null;
}
const initialState: MoviesState = {
  nowPlayingMovies: null,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState: initialState,
  reducers: {
    setNowPlayingMovies: (state, action: PayloadAction<Movie[]>) => {
      state.nowPlayingMovies = action.payload;
    },
  },
});

export const { setNowPlayingMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
