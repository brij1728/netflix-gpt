import { AppDispatch, RootState } from '../../redux/store';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '../ui';
import { IoLanguage } from 'react-icons/io5';
import { LanguageCode } from '../../types/lang';
import { MobileMenu } from './MobileMenu';
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
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
      navigate('/error');
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
    dispatch(setGPTSearchView(location.pathname === '/gptsearch'));
  }, [location.pathname, dispatch]);

  return (
    <div className="relative flex w-full items-center justify-between bg-black px-4 py-2">
      {/* Logo */}
      <Link to={user ? '/' : '/login'}>
        <img
          src="/Netflix_Logo_PMS.png"
          alt="Netflix Logo"
          className="h-auto w-24 sm:w-28 lg:w-36"
        />
      </Link>

      {/* Mobile Menu */}
      {user && (
        <MobileMenu
          showGPTSearch={showGPTSearch}
          onSearch={handleSearch}
          onSignOut={handleSignOut}
        />
      )}

      {/* Desktop Controls */}
      <div className="hidden items-center space-x-2 sm:flex">
        {user ? (
          <>
            {showGPTSearch && (
              <div className="relative flex items-center gap-2">
                <IoLanguage className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-sm text-white-100" />
                <select
                  value={currentLanguage}
                  className="appearance-none rounded-md bg-netflix-red py-1 pl-8 pr-4 text-sm text-white-100"
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
              className="bg-gray-500 px-3 py-1 text-white-100 hover:bg-gray-700"
            >
              {showGPTSearch ? 'Home' : 'GPT Search'}
            </Button>
            <img
              src={user.photoURL || '/default-avatar-url'}
              alt={user.displayName || 'No Name'}
              className="h-8 w-8 rounded-full"
            />
            <button
              onClick={handleSignOut}
              className="rounded-md bg-netflix-red px-3 py-1 text-white-100 hover:bg-red-700"
            >
              Sign Out
            </button>
          </>
        ) : (
          <Link to="/login">
            <button className="rounded-md bg-netflix-red px-3 py-1 text-white-100 hover:bg-red-700">
              Sign In
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};
