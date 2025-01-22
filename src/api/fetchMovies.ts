import { Movie } from '../types/movies';
import { THE_MOVIE_DB_URL } from '../utils/constants';

export const fetchNowPlayingMovies = async () => {
  const url = `${THE_MOVIE_DB_URL}/now_playing?page=1`;

  const API_OPTIONS = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_READ_ACCESS_TOKEN}`,
    },
  };

  const response = await fetch(url, API_OPTIONS);
  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.statusText}`);
  }

  const data = await response.json();

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
