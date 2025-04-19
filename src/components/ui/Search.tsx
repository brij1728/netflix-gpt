import { AppDispatch, RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';

import { Button } from './Button';
import { Movie } from '../../types/movies';
import { addGPTMovieResults } from '../../redux/slices/gptSlice';
import { client } from '../../api/openai';
import { fetchSearchMovie } from '../../api/searchMovies';
import { languageConstants } from '../../utils/languageConstants';

export const Search = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentLanguageKey = useSelector(
    (store: RootState) => store.config.lang
  );
  const searchText = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleGPTSearchClick();
  };

  const handleGPTSearchClick = async () => {
    const queryText = searchText.current?.value.trim();
    if (!queryText) return console.warn('Search input is empty');

    console.log(`Searching for: ${queryText}`);

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
      console.log('Unique movie list:', uniqueMovieArray);

      const moviePromises = uniqueMovieArray.map((movie: string) =>
        fetchSearchMovie({ movieName: movie })
      );

      const tmdbMoviesNested = await Promise.all(moviePromises);
      const tmdbMovies: Movie[] = tmdbMoviesNested.flat();
      console.log('All TMDB movie results:', tmdbMovies);
      dispatch(
        addGPTMovieResults({
          movieNames: uniqueMovieArray,
          movieResults: tmdbMovies,
        })
      );
    } catch (error) {
      console.error('Error while calling GPT or TMDB API:', error);
    } finally {
      searchText.current!.value = '';
    }
  };

  useEffect(() => {
    searchText.current?.focus();
  }, []);

  return (
    <div className="mx-auto w-[60%] bg-netflix-black p-2">
      <form className="flex justify-center gap-2" onSubmit={handleSubmit}>
        <input
          ref={searchText}
          type="text"
          className="w-full rounded-md border border-netflix-red p-2 focus:outline-none focus:ring focus:ring-red-400"
          placeholder={
            languageConstants[currentLanguageKey].gptSearchPlaceholder
          }
        />
        <Button
          type="submit"
          className="bg-netflix-red px-1 py-[2px] text-white-100 hover:bg-red-700 sm:px-2 sm:py-1 sm:text-sm md:px-4 md:py-2 md:text-base lg:text-xl"
        >
          {languageConstants[currentLanguageKey].search}
        </Button>
      </form>
    </div>
  );
};
