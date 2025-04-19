import { useEffect, useRef } from 'react';

import { Button } from './Button';
import { RootState } from '../../redux/store';
import { languageConstants } from '../../utils/languageConstants';
import { useSearchMovies } from '../../hooks/useSearchMovies';
import { useSelector } from 'react-redux';

export const Search = () => {
  const { searchMoviesFromQuery } = useSearchMovies();

  const currentLanguageKey = useSelector(
    (store: RootState) => store.config.lang
  );
  const searchText = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = searchText.current?.value.trim();
    if (query) {
      searchMoviesFromQuery({ queryText: query });
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
