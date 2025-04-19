import { GET_API_OPTIONS } from './options';
import { Movie } from '../types/movies';
import { THE_MOVIE_DB_URL } from '../utils/constants';

interface SearchMoviesProps {
  movieName: string;
  page?: number;
}

export const fetchSearchMovie = async ({
  movieName,
  page = 1,
}: SearchMoviesProps): Promise<Movie> => {
  const url = `${THE_MOVIE_DB_URL}/search/movie?query=${movieName}&page=${page}`;
  const response = await fetch(url, GET_API_OPTIONS);

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.statusText}`);
  }

  const data = await response.json();
  return data.results;
};
