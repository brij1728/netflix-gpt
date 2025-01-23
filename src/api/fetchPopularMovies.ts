import { GET_API_OPTIONS } from './options';
import { Movie } from '../types/movies';
import { THE_MOVIE_DB_URL } from '../utils/constants';

export const fetchPopularMovies = async () => {
  const url = `${THE_MOVIE_DB_URL}/popular?page=2`;

  const response = await fetch(url, GET_API_OPTIONS);
  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.statusText}`);
  }

  const data = await response.json();
  console.log(data);

  // Transform the data to include only the required fields
  return data.results.map((movie: Movie) => ({
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    poster_path: movie.poster_path,
    release_date: movie.release_date,
    vote_average: movie.vote_average,
    vote_count: movie.vote_count,
    genre_ids: movie.genre_ids,
    original_language: movie.original_language,
  }));
};
