import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <div className="absolute left-0 right-0 top-0 flex items-center justify-between bg-gradient-to-b from-black px-8 py-2">
      <div>
        <Link to="/">
          <img
            src="/Netflix_Logo_PMS.png"
            alt="Netflix Logo"
            className="h-auto w-28 lg:w-36"
          />
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <div>
          <button className="rounded-md border border-white bg-transparent px-4 py-2 text-white">
            English
          </button>
        </div>
        <div>
          <Link to="/login">
            <button className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
