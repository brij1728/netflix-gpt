import {
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useRef, useState } from 'react';

import { Link } from 'react-router-dom';
import { auth } from '../../utils/firebase-config';
import { loginFormValidation } from '../../utils/loginFormValidation';

export const LoginForm = () => {
  const [usePassword, setUsePassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showRecaptchaInfo, setShowRecaptchaInfo] = useState(false);

  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailValue = email.current?.value || '';
    const passwordValue = password.current?.value || '';

    // Perform validation
    const validationError = loginFormValidation({
      email: emailValue,
      password: usePassword ? passwordValue : '',
    });
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);

    if (usePassword) {
      try {
        // Handle Email/Password Sign-in
        const userCredential = await signInWithEmailAndPassword(
          auth,
          emailValue,
          passwordValue
        );
        console.log('User signed in:', userCredential.user);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to sign in with password');
        }
      }
    } else {
      try {
        // Handle Magic Link (Sign-in Code)
        await sendSignInLinkToEmail(auth, emailValue, {
          url: 'http://localhost:3000/', // Replace with your app's URL
          handleCodeInApp: true,
        });
        setSuccessMessage(
          'Sign-in link sent to your email. Check your inbox to complete the sign-in process.'
        );
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to send sign-in link');
        }
      }
    }
  };

  return (
    <div
      className="flex min-h-screen w-screen items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/netflix_login_page_background.jpg')" }}
    >
      <div className="w-full max-w-md rounded-md bg-netflix-black bg-opacity-70 px-[68px] py-12 text-white-100">
        <h2 className="mb-7 text-3xl font-bold">Sign In</h2>
        <div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                ref={email}
                type="text"
                placeholder="Email or mobile number"
                className="w-full rounded-md border border-gray-700 bg-gray-800 p-3 focus:border-gray-500 focus:outline-none"
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            {successMessage && (
              <p className="text-sm text-green-500">{successMessage}</p>
            )}
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
                <div className="relative">
                  <input
                    ref={password}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    className="w-full rounded-md border border-gray-700 bg-gray-800 p-3 focus:border-gray-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="hover:text-white absolute inset-y-0 right-3 flex items-center text-gray-400"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
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
            <button
              type="button"
              onClick={() => setShowRecaptchaInfo(!showRecaptchaInfo)}
              className="text-blue-500 hover:underline"
            >
              Learn more.
            </button>
          </p>
          {showRecaptchaInfo && (
            <p className="mt-4 text-xs text-gray-500">
              The information collected by Google reCAPTCHA is subject to the
              Google Privacy Policy and Terms of Service, and is used for
              providing, maintaining, and improving the reCAPTCHA service and
              for general security purposes (it is not used for personalised
              advertising by Google).
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
