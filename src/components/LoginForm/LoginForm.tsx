import { Link, useNavigate } from 'react-router-dom';
import {
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useRef, useState } from 'react';

import { AppDispatch } from '../../redux/store';
import { auth } from '../../utils/firebase-config';
import { loginFormValidation } from '../../utils/loginFormValidation';
import { setCurrentUser } from '../../redux/slices/userSlice';
import { useDispatch } from 'react-redux';

export const LoginForm = () => {
  const [usePassword, setUsePassword] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showRecaptchaInfo, setShowRecaptchaInfo] = useState(false);

  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const emailValue = email.current?.value || '';
    const passwordValue = password.current?.value || '';

    // Validate form input
    const validationError = loginFormValidation({
      email: emailValue,
      password: usePassword ? passwordValue : '',
    });

    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    try {
      if (usePassword) {
        // Email/Password Sign-in
        const userCredential = await signInWithEmailAndPassword(
          auth,
          emailValue,
          passwordValue
        );
        const user = userCredential.user;

        dispatch(
          setCurrentUser({
            uid: user.uid,
            displayName: user.displayName || 'Anonymous',
            email: user.email,
            photoURL: user.photoURL || 'default-avatar-url',
          })
        );

        navigate('/'); // Redirect to home page
      } else {
        // Magic Link Sign-in
        await sendSignInLinkToEmail(auth, emailValue, {
          url: 'https://netflixgpt-olive-ten.vercel.app/login',
          handleCodeInApp: true,
        });
        setSuccessMessage(
          'Sign-in link sent to your email. Check your inbox to complete the sign-in process.'
        );
      }
    } catch (err) {
      const errorCode = (err as { code?: string }).code;
      // Handle common Firebase errors
      if (errorCode === 'auth/user-not-found') {
        setError('No user found with this email. Please sign up first.');
      } else if (errorCode === 'auth/wrong-password') {
        setError('Incorrect password. Please try again.');
      } else if (errorCode === 'auth/too-many-requests') {
        setError(
          'Too many login attempts. Please try again later or reset your password.'
        );
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/netflix_login_page_background.jpg')" }}
    >
      <div className="w-full max-w-md rounded-md bg-netflix-black bg-opacity-70 px-[68px] py-12 text-white-100">
        <h2 className="mb-7 text-3xl font-bold">Sign In</h2>
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
          <p className="text-sm">
            New to Netflix?{' '}
            <Link to="/signup" className="text-netflix-red hover:underline">
              <button className="rounded-md bg-white-100 px-2 py-1 text-netflix-red hover:bg-white-300 hover:underline sm:px-4 sm:py-2">
                Sign Up
              </button>
            </Link>
          </p>
        </div>
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
    </div>
  );
};
