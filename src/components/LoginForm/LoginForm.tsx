import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';

import { AppDispatch } from '../../redux/store';
import { loginFormValidation } from '../../utils/loginFormValidation';
import { setCurrentUser } from '../../redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import { useFirebaseAuth } from '../../hooks/useFirebaseAuth';

export const LoginForm = () => {
  const [usePassword, setUsePassword] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showRecaptchaInfo, setShowRecaptchaInfo] = useState(false);

  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const {
    loading,
    error,
    successMessage,
    sendMagicLink,
    passwordSignIn,
    setError,
    setSuccessMessage,
  } = useFirebaseAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailValue = email.current?.value || '';
    const passwordValue = password.current?.value || '';

    const validationError = loginFormValidation({
      email: emailValue,
      password: usePassword ? passwordValue : '',
    });

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      if (usePassword) {
        const user = await passwordSignIn(emailValue, passwordValue);
        dispatch(
          setCurrentUser({
            uid: user.uid,
            displayName: user.displayName || 'Anonymous',
            email: user.email,
            photoURL: user.photoURL || 'default-avatar-url',
          })
        );
        navigate('/');
      } else {
        await sendMagicLink(
          emailValue,
          'https://netflixgpt-olive-ten.vercel.app/link-signin'
        );
        setSuccessMessage(
          'Sign-in link sent to your email. Please check your inbox to complete the sign-in.'
        );
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error('Login Error:', err.message);
        const errorCode = (err as { code?: string }).code;

        switch (errorCode) {
          case 'auth/invalid-email':
            setError('Invalid email address.');
            break;
          case 'auth/user-disabled':
            setError('This account has been disabled. Please contact support.');
            break;
          case 'auth/user-not-found':
            setError('No user found with this email.');
            break;
          case 'auth/wrong-password':
            setError('Incorrect password. Please try again.');
            break;
          default:
            setError(err.message || 'An unexpected error occurred.');
        }
      } else {
        console.error('Unknown error during login:', err);
        setError('An unknown error occurred. Please try again.');
      }
    }
  };

  return (
    <>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          ref={email}
          type="email"
          placeholder="Email"
          className="w-full rounded-md border border-gray-700 bg-gray-800 p-3 focus:border-gray-500 focus:outline-none"
        />
        {usePassword && (
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
              className="hover:text-white absolute inset-y-0 right-3 text-gray-400"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        )}
        {error && <p className="text-sm text-red-500">{error}</p>}
        {successMessage && (
          <p className="text-sm text-green-500">{successMessage}</p>
        )}
        <button
          type="submit"
          className={`mt-4 w-full rounded-md py-3 font-semibold ${
            loading
              ? 'cursor-not-allowed bg-gray-600'
              : 'bg-red-600 hover:bg-red-700'
          }`}
          disabled={loading}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
      <div className="mt-4 text-center">
        <button
          onClick={() => setUsePassword(!usePassword)}
          className="text-sm text-gray-400 hover:underline"
        >
          {usePassword ? 'Sign in with magic link' : 'Use password instead'}
        </button>
      </div>
      <div className="mt-6 text-center">
        <p className="flex flex-col items-center justify-center gap-1 text-sm sm:flex-row sm:gap-2 md:text-base">
          New to Netflix?
          <Link
            to="/signup"
            className="rounded bg-white-100 px-2 py-1 text-netflix-red hover:underline sm:px-3 sm:py-2"
          >
            Sign Up
          </Link>
        </p>
        <p className="mt-4 text-xs text-gray-500">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.{' '}
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
            Google Privacy Policy and Terms of Service.
          </p>
        )}
      </div>
    </>
  );
};
