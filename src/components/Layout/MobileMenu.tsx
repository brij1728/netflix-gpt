import { FiMenu, FiX } from 'react-icons/fi';

import { Button } from '../ui';
import { useState } from 'react';

type Props = {
  showGPTSearch: boolean;
  onSearch: () => void;
  onSignOut: () => void;
};

export const MobileMenu = ({ showGPTSearch, onSearch, onSignOut }: Props) => {
  const [open, setOpen] = useState(false);

  const handleAndClose = (action: () => void) => {
    setOpen(false);
    setTimeout(() => action(), 100); // wait 100ms before navigation
  };

  return (
    <div className="relative sm:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="text-2xl text-white-100"
      >
        {open ? <FiX /> : <FiMenu />}
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-50 flex w-40 flex-col gap-2 rounded-md bg-black p-4 shadow-lg">
          <Button
            onClick={() => handleAndClose(onSearch)}
            className="w-full bg-gray-600 text-white-100 hover:bg-gray-700"
          >
            {showGPTSearch ? 'Home' : 'GPT Search'}
          </Button>
          <Button
            onClick={() => handleAndClose(onSignOut)}
            className="w-full bg-red-600 text-white-100 hover:bg-red-700"
          >
            Sign Out
          </Button>
        </div>
      )}
    </div>
  );
};
