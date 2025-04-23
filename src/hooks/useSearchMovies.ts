import {
  addGPTMovieResults,
  resetGPTSearch,
  setLastQuery,
  setLoading,
} from '../redux/slices/gptSlice';

import { AppDispatch } from '../redux/store';
import { Movie } from '../types/movies';
import { client } from '../api/openai';
import { fetchSearchMovie } from '../api/searchMovies';
import { useDispatch } from 'react-redux';

interface SearchQuery {
  queryText: string;
}

export const useSearchMovies = () => {
  const dispatch = useDispatch<AppDispatch>();

  const searchMoviesFromQuery = async ({ queryText }: SearchQuery) => {
    const trimmedQuery = queryText.trim();

    if (!trimmedQuery) {
      console.warn('Search input is empty');
      return;
    }

    console.log(`Searching for: ${trimmedQuery}`);

    // 🔁 Clear previous search results and show loading
    dispatch(resetGPTSearch());
    dispatch(setLastQuery(trimmedQuery));
    dispatch(setLoading(true));

    const gptQuery = `Act as a Movie Recommendation system and suggest some movies for the query text: ${queryText}. Only give me the name of 5 movies, comma separated. Like the example result given ahead. Example result: Gadar, Shole, Don, PK, Golmaal`;

    try {
      const gptResults = await client.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: gptQuery }],
      });

      if (!gptResults.choices || gptResults.choices.length === 0) {
        console.error('No choices returned from GPT response');
        return;
      }

      const movieList = gptResults.choices[0].message?.content ?? '';
      const movieArray = movieList
        .split(',')
        .map((movie) => movie.trim())
        .filter((movie) => movie !== '');

      const uniqueMovieArray = [...new Set(movieArray)];

      const moviePromises = uniqueMovieArray.map((movie: string) =>
        fetchSearchMovie({ movieName: movie })
      );

      const tmdbMoviesNested: Movie[][] = await Promise.all(moviePromises);

      dispatch(
        addGPTMovieResults({
          movieNames: uniqueMovieArray,
          movieResults: tmdbMoviesNested,
        })
      );
    } catch (error) {
      console.error('Error while calling GPT or TMDB API:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { searchMoviesFromQuery };
};
