import { API_OPTIONS } from '../utils/constants';

export const getCurrentPlayingMovies = async () => {
  const url =
    'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';

  const response = await fetch(url, API_OPTIONS);
  const data = await response.json();
  console.log(data);
  return data;
};
