import { useEffect, useRef } from 'react';

import { Button } from './Button';

interface SearchBarProps {
  placeholder: string;
  searchButtonText: string;
  onSearch: (queryText: string) => void;
}

export const SearchBar = ({
  placeholder,
  onSearch,
  searchButtonText,
}: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = inputRef.current?.value.trim();
    if (query) {
      onSearch(query);
      inputRef.current!.value = '';
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <form className="flex justify-center gap-2" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        className="w-full rounded-md border border-netflix-red p-2 focus:outline-none focus:ring focus:ring-red-400"
        placeholder={placeholder}
      />
      <Button
        type="submit"
        className="bg-netflix-red px-1 py-[2px] text-white-100 hover:bg-red-700 sm:px-2 sm:py-1 sm:text-sm md:px-4 md:py-2 md:text-base lg:text-xl"
      >
        {searchButtonText}
      </Button>
    </form>
  );
};
