import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-black py-8 text-gray-400">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="text-sm">
            <p>
              Questions? Call{' '}
              <a
                href="tel:000-800-919-1694"
                className="underline hover:text-white"
              >
                000-800-919-1694
              </a>
            </p>
          </div>
          <div className="mt-4 flex flex-col space-y-4 md:mt-0 md:flex-row md:space-x-8 md:space-y-0">
            <Link to="/faq" className="hover:text-white">
              FAQ
            </Link>
            <Link to="/help" className="hover:text-white">
              Help Centre
            </Link>
            <Link to="/terms" className="hover:text-white">
              Terms of Use
            </Link>
            <Link to="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link to="/corporate" className="hover:text-white">
              Corporate Information
            </Link>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="flex items-center rounded bg-gray-800 px-3 py-2 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-1 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              English
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
