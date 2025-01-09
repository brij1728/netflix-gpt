import { LINKEDIN_URL } from '../../utils/constants';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-black py-2 text-gray-400 sm:py-4">
      <div className="flex flex-col gap-2 text-sm sm:gap-4 sm:text-base md:flex-row md:items-center md:justify-between md:gap-10 md:text-lg">
        <div className="flex">
          <p>Copyright © 2025 Netflix GPT</p>
        </div>
        <nav
          aria-label="Footer Navigation"
          className="flex flex-col gap-2 sm:flex-row sm:gap-4 md:gap-8"
        >
          <Link to="/faq" className="hover:text-white hover:underline">
            FAQ
          </Link>
          <Link to="/help" className="hover:text-white hover:underline">
            Help Centre
          </Link>
          <Link to="/terms" className="hover:text-white hover:underline">
            Terms of Use
          </Link>
          <Link to="/privacy" className="hover:text-white hover:underline">
            Privacy
          </Link>
          <div className="group relative">
            <Link
              to={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white hover:underline"
            >
              Contact Us
            </Link>
            <div className="text-white absolute left-0 mt-2 hidden w-max rounded bg-gray-800 px-2 py-1 text-xs group-hover:block">
              Brijesh Kumar
            </div>
          </div>
        </nav>
      </div>
    </footer>
  );
};
