import { Link } from 'react-router-dom';

export const Header = () => {
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
          <Link to="/login">
            <button className="rounded-md bg-netflix-red px-2 py-1 text-white-100 hover:bg-red-700 sm:px-4 sm:py-2">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
