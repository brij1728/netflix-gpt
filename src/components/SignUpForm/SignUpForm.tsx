import { Link } from 'react-router-dom';

export const SignUpForm = () => {
  return (
    <div
      className="flex min-h-screen w-screen items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/netflix_login_page_background.jpg')" }}
    >
      <div className="w-full max-w-md rounded-md bg-netflix-black bg-opacity-70 px-[68px] py-12 text-white-100">
        <h2 className="mb-7 text-3xl font-bold">Sign Up</h2>
        <div>
          <form className="space-y-4">
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full rounded-md border border-gray-700 bg-gray-800 p-3 focus:border-gray-500 focus:outline-none"
                required
              />
              <input
                type="text"
                placeholder="Email or mobile number"
                className="w-full rounded-md border border-gray-700 bg-gray-800 p-3 focus:border-gray-500 focus:outline-none"
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full rounded-md border border-gray-700 bg-gray-800 p-3 focus:border-gray-500 focus:outline-none"
                required
              />
              <button
                type="submit"
                className="w-full rounded-md bg-netflix-red py-3 font-semibold text-white-100 transition duration-300 hover:bg-red-700"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
        <div>
          <div className="mt-6 text-center">
            <p className="text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-white-100 hover:underline">
                Sign in now.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
