import { Link } from 'react-router-dom';
import { useState } from 'react';

export const LoginForm = () => {
  const [usePassword, setUsePassword] = useState(false);

  return (
    <div
      className="flex min-h-screen w-screen items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/netflix_login_page_background.jpg')" }}
    >
      <div className="w-full max-w-md rounded-md bg-netflix-black bg-opacity-70 px-[68px] py-12 text-white-100">
        <h2 className="mb-7 text-3xl font-bold">Sign In</h2>
        <div>
          <form className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Email or mobile number"
                className="w-full rounded-md border border-gray-700 bg-gray-800 p-3 focus:border-gray-500 focus:outline-none"
              />
            </div>
            {!usePassword ? (
              <>
                <button
                  type="submit"
                  className="w-full rounded-md bg-netflix-red py-3 font-semibold text-white-100 transition duration-300 hover:bg-red-700"
                >
                  Send sign-in code
                </button>
                <p className="mt-2 text-sm text-gray-400">
                  Message and data rates may apply
                </p>
              </>
            ) : (
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full rounded-md border border-gray-700 bg-gray-800 p-3 focus:border-gray-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="mt-4 w-full rounded-md bg-red-600 py-3 font-semibold text-white-100 transition duration-300 hover:bg-red-700"
                >
                  Sign In
                </button>
              </div>
            )}
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm">OR</p>
            <button
              onClick={() => setUsePassword(!usePassword)}
              className="mt-2 w-full rounded-md bg-gray-600 py-3 text-white-100 transition duration-300 hover:bg-gray-700"
            >
              {usePassword ? 'Use a sign-in code' : 'Use Password'}
            </button>
            <Link
              to="/forgot-email"
              className="mt-2 block text-sm text-gray-400 hover:underline"
            >
              {usePassword
                ? `Forgot password?`
                : `Forgot email or phone number`}
            </Link>
          </div>
        </div>
        <div>
          <div className="mt-5 flex items-center">
            <input type="checkbox" className="mr-2" />
            <label className="text-sm">Remember me</label>
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm">
              New to Netflix?{' '}
              <Link to="/signup" className="text-white-100 hover:underline">
                Sign up now.
              </Link>
            </p>
          </div>
          <p className="mt-4 text-xs text-gray-500">
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot.{' '}
            <Link to="/learn-more" className="text-blue-500 hover:underline">
              Learn more.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
