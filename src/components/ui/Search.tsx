import { useEffect, useRef } from 'react';

import { Button } from './Button';
import { RootState } from '../../redux/store';
import { client } from '../../api/openai';
import { languageConstants } from '../../utils/languageConstants';
import { useSelector } from 'react-redux';

export const Search = () => {
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
    if (queryText) {
      console.log(`Searching for: ${queryText}`);

      // GPT prompt
      const gptQuery = `Act as a Movie Recommendation system and suggest some movies for the query text: ${queryText}. Only give me the name of 5 movies, comma separated. Like the example result given ahead. Example result: Gadar, Shole, Don, PK, Golmaal`;
      //Make API call using OpenAI
      const gptResults = await client.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: gptQuery }],
      });
      const movieList = gptResults.choices?.[0]?.message?.content;
      console.log(`GPT Movie Suggestions for ${queryText}:, ${movieList}`);

      searchText.current!.value = '';
    } else {
      console.warn('Search input is empty');
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
