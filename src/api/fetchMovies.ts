import { API_OPTIONS, THE_MOVIE_DB_URL } from '../utils/constants';

export const getCurrentPlayingMovies = async () => {
  const url = THE_MOVIE_DB_URL;

  const response = await fetch(url, API_OPTIONS);
  const data = await response.json();
  return data;
};
