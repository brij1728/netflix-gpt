import { Link, useNavigate } from 'react-router-dom';

import { RootState } from '../../redux/store';
import { User } from '../../types/user';
import { auth } from '../../utils/firebase-config';
import { signOut } from 'firebase/auth';
import { useSelector } from 'react-redux';

export const Header = () => {
  //const user = useAuth(); // Get the current user from context
  const user = useSelector((store: RootState) => store.user.users[0]) as
    | User
    | undefined;

  console.log('User in Header:', user); // Check if user is updated

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

  return (
    <div className="flex w-full items-center justify-between px-4">
      <div>
        <Link to="/">
          <img
            src="/Netflix_Logo_PMS.png"
            alt="Netflix Logo"
            className="h-auto w-24 sm:w-28 lg:w-36"
          />
        </Link>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4">
        <div>
          <button className="border-white rounded-md border bg-transparent px-2 py-1 text-white-100 sm:px-4 sm:py-2">
            English
          </button>
        </div>
        <div>
          {user ? (
            <>
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
            </>
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
