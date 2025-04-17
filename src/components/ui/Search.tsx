import { Button } from './Button';
import { RootState } from '../../redux/store';
import { languageConstants } from '../../utils/languageConstants';
import { useSelector } from 'react-redux';

export const Search = () => {
  const currentLanguageKey = useSelector(
    (store: RootState) => store.config.lang
  );

  return (
    <div className="mx-auto w-[60%] bg-netflix-black p-2">
      <form className="flex justify-center gap-2">
        <input
          type="text"
          className="w-full rounded-md border border-netflix-red p-2 focus:outline-none focus:ring focus:ring-red-400"
          placeholder={
            languageConstants[currentLanguageKey].gptSearchPlaceholder
          }
        />
        <Button className="bg-netflix-red px-1 py-[2px] text-white-100 hover:bg-red-700 sm:px-2 sm:py-1 sm:text-sm md:px-4 md:py-2 md:text-base lg:text-xl">
          {languageConstants[currentLanguageKey].search}
        </Button>
      </form>
    </div>
  );
};
