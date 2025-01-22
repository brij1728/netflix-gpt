import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Movie } from '../../types/movies';
import { Video } from '../../types/video';

interface MoviesState {
  nowPlayingMovies: Movie[] | null;
  movieVideos: Record<string, Video | null>;
}

const initialState: MoviesState = {
  nowPlayingMovies: null,
  movieVideos: {},
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState: initialState,
  reducers: {
    setNowPlayingMovies: (state, action: PayloadAction<Movie[]>) => {
      state.nowPlayingMovies = action.payload;
    },
    setMovieVideos: (
      state,
      action: PayloadAction<{ movieId: string; video: Video | null }>
    ) => {
      state.movieVideos[action.payload.movieId] = action.payload.video;
    },
  },
});

export const { setNowPlayingMovies, setMovieVideos } = moviesSlice.actions;
export default moviesSlice.reducer;
