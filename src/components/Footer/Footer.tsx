import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-black py-8 text-gray-400">
      <div className="flex w-full items-center justify-between px-4 sm:h-16 md:h-20">
        {/* Footer Content: Two columns on medium and row on large screens */}
        <div className="flex flex-col space-y-6 md:grid md:grid-cols-2 lg:flex lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
          {/* Left Section: Contact Info */}
          <div className="text-left">
            <p className="text-sm">
              Questions? Call{' '}
              <a
                href="tel:091-800-919-1694"
                className="underline hover:text-white-100"
              >
                091-800-919-1694
              </a>
            </p>
          </div>

          {/* Right Section: Links */}
          <div className="flex flex-col space-y-4 text-left md:grid md:grid-cols-2 md:gap-4 lg:flex lg:space-x-8 lg:space-y-0">
            <Link to="/faq" className="hover:text-white-100">
              FAQ
            </Link>
            <Link to="/help" className="hover:text-white-100">
              Help Centre
            </Link>
            <Link to="/terms" className="hover:text-white-100">
              Terms of Use
            </Link>
            <Link to="/privacy" className="hover:text-white-100">
              Privacy
            </Link>
          </div>
        </div>

        {/* Language Switcher */}
        {/* <div className="mt-6 flex justify-center lg:mt-8 lg:justify-start">
          <button className="flex items-center rounded bg-gray-800 px-4 py-2 text-white-100">
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
        </div> */}

        {/* Bottom Section: Legal Info */}
        <div className="mt-8 text-center text-sm">
          <p>Netflix GPT</p>

          <div className="flex justify-center space-x-2">
            <p>Created by</p>
            <Link
              to=" https://www.linkedin.com/in/abhishek-singh-9b7b2b1a9/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white-100"
            >
              Brijesh Singh
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
