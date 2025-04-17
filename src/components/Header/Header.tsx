import { AppDispatch, RootState } from '../../redux/store';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '../ui';
import { IoLanguage } from 'react-icons/io5';
import { LanguageCode } from '../../types/lang';
import { auth } from '../../utils/firebase-config';
import { changeLanguage } from '../../redux/slices/configSlice';
import { setGPTSearchView } from '../../redux/slices/gptSlice';
import { signOut } from 'firebase/auth';
import { supportedLanguages } from '../../utils/languageConstants';
import { useEffect } from 'react';

export const Header = () => {
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((store: RootState) => store.user.currentUser);
  const showGPTSearch = useSelector(
    (store: RootState) => store.gpt.showGPTSearch
  );
  const currentLanguage = useSelector((store: RootState) => store.config.lang);

  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('User signed out');

      navigate('/login'); // Redirect to login on sign out
    } catch (error) {
      console.error('Error signing out:', error);
      navigate('/error'); // Redirect to error page on error
    }
  };

  const handleSearch = () => {
    navigate(showGPTSearch ? '/' : '/gptsearch');
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedlang = e.target.value as LanguageCode;
    dispatch(changeLanguage(selectedlang));
  };

  useEffect(() => {
    if (location.pathname === '/gptsearch') {
      dispatch(setGPTSearchView(true));
    } else {
      dispatch(setGPTSearchView(false));
    }
  }, [location.pathname, dispatch]);

  return (
    <div className="flex w-full items-center justify-between px-4">
      <div>
        <Link to={user ? '/' : '/login'}>
          <img
            src="/Netflix_Logo_PMS.png"
            alt="Netflix Logo"
            className="h-auto w-24 sm:w-28 lg:w-36"
          />
        </Link>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4">
        <div>
          {user ? (
            <div className="flex items-center space-x-2">
              {showGPTSearch && (
                <div className="relative flex items-center justify-between gap-2">
                  <IoLanguage className="pointer-events-none absolute left-[1px] top-1/2 mx-[2px] -translate-y-1/2 text-white-100 sm:text-xs md:mx-1 md:text-sm lg:mx-2 lg:text-base" />
                  <select
                    value={currentLanguage}
                    className="appearance-none rounded-md bg-netflix-red px-3 py-[1px] text-[10px] text-white-100 sm:px-4 sm:text-xs md:px-6 md:py-1 md:text-sm lg:px-8 lg:text-base"
                    onChange={handleLanguageChange}
                  >
                    {supportedLanguages.map((lang) => (
                      <option
                        className="bg-white-100 text-netflix-black"
                        key={lang.identifier}
                        value={lang.identifier}
                      >
                        {lang.languageName}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <Button
                onClick={handleSearch}
                className="bg-gray-500 px-1 py-[2px] text-[10px] text-white-100 hover:bg-gray-700 sm:px-2 sm:py-1 sm:text-sm md:px-4 md:py-2 md:text-base lg:text-xl"
              >
                {showGPTSearch ? 'Home' : 'GPT Search'}
              </Button>
              <img
                src={user.photoURL || '/default-avatar-url'}
                alt={user.displayName || 'No Name'}
                className="h-8 w-8 rounded-full sm:h-10 sm:w-10"
              />
              <button
                onClick={handleSignOut}
                className="rounded-md bg-netflix-red px-2 py-1 text-white-100 hover:bg-red-700 sm:px-4 sm:py-2"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link to="/login">
              <button className="rounded-md bg-netflix-red px-2 py-1 text-white-100 hover:bg-red-700 sm:px-4 sm:py-2">
                Sign In
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
