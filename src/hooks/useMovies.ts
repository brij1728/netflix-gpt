import {
  setNowPlayingMovies,
  setPopularMovies,
  setTopRatedMovies,
  setUpcomingMovies,
} from '../redux/slices/moviesSlice';

import { useFetchMovies } from './useFetchMovies';

export const useNowPlayingMovies = () => {
  return useFetchMovies({
    endpoint: 'now_playing',
    reduxAction: setNowPlayingMovies,
  });
};

export const usePopularMovies = () => {
  return useFetchMovies({
    endpoint: 'popular',
    reduxAction: setPopularMovies,
    page: 2,
  });
};

export const useTopRatedMovies = () => {
  return useFetchMovies({
    endpoint: 'top_rated',
    reduxAction: setTopRatedMovies,
  });
};

export const useUpcomingMovies = () => {
  return useFetchMovies({
    endpoint: 'upcoming',
    reduxAction: setUpcomingMovies,
  });
};
