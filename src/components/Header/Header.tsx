import { AppDispatch, RootState } from '../../redux/store';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '../ui';
import { auth } from '../../utils/firebase-config';
import { signOut } from 'firebase/auth';
import { toggleGPTSearchView } from '../../redux/slices/gptSlice';

export const Header = () => {
  const user = useSelector((store: RootState) => store.user.currentUser);
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

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
    console.log('Hi, I am brijesh');
    dispatch(toggleGPTSearchView());
    navigate('/gptsearch');
  };

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
              <Button
                onClick={handleSearch}
                className="bg-gray-500 px-1 py-[2px] text-white-100 hover:bg-gray-700 sm:px-2 sm:py-1 sm:text-sm md:px-4 md:py-2 md:text-base lg:text-xl"
              >
                GPT Search
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
