import { RootState } from '../../redux/store';
import { SearchBar } from '../ui';
import { languageConstants } from '../../utils/languageConstants';
import { useSearchMovies } from '../../hooks/useSearchMovies';
import { useSelector } from 'react-redux';

export const GPTSearch = () => {
  const { searchMoviesFromQuery } = useSearchMovies();
  const currentLanguageKey = useSelector(
    (store: RootState) => store.config.lang
  );

  const handleSearch = (queryText: string) => {
    searchMoviesFromQuery({ queryText });
  };

  return (
    <div className="mx-auto w-full bg-netflix-black p-2 md:w-[60%]">
      <SearchBar
        placeholder={languageConstants[currentLanguageKey].gptSearchPlaceholder}
        onSearch={handleSearch}
        searchButtonText={languageConstants[currentLanguageKey].search}
      />
    </div>
  );
};
