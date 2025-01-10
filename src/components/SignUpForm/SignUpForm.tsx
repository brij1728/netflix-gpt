import { Link, useNavigate } from 'react-router-dom';
import { addUser, setCurrentUser } from '../../redux/slices/userSlice';
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  updateProfile,
} from 'firebase/auth';
import { useRef, useState } from 'react';

import { AppDispatch } from '../../redux/store';
import { auth } from '../../utils/firebase-config';
import { signupFormValidation } from '../../utils/signupFormValidation';
import { useDispatch } from 'react-redux';

export const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const checkIfEmailExists = async (email: string): Promise<boolean> => {
    try {
      const methods = await fetchSignInMethodsForEmail(auth, email);
      return methods.length > 0;
    } catch (err) {
      console.error('Error checking email existence:', err);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const nameValue = name.current?.value || '';
    const emailValue = email.current?.value || '';
    const passwordValue = password.current?.value || '';

    const validationError = signupFormValidation({
      name: nameValue,
      email: emailValue,
      password: passwordValue,
    });

    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    const isEmailRegistered = await checkIfEmailExists(emailValue);
    if (isEmailRegistered) {
      setError('Email is already registered. Please log in.');
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        emailValue,
        passwordValue
      );

      const user = userCredential.user;

      await updateProfile(user, {
        displayName: nameValue,
        photoURL: `User_Logo.webp`,
      });

      const updatedUser = auth.currentUser;
      if (updatedUser) {
        dispatch(
          addUser({
            uid: updatedUser.uid,
            displayName: updatedUser.displayName,
            email: updatedUser.email,
            photoURL: updatedUser.photoURL,
          })
        );
        dispatch(
          setCurrentUser({
            uid: updatedUser.uid,
            displayName: updatedUser.displayName,
            email: updatedUser.email,
            photoURL: updatedUser.photoURL,
          })
        );

        navigate('/');
      } else {
        throw new Error('Failed to retrieve updated user details.');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || 'Failed to sign up. Please try again.');
      } else {
        setError('Failed to sign up. Please try again.');
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
        <h2 className="mb-7 text-3xl font-bold">Sign Up</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="w-full rounded-md border border-gray-700 bg-gray-800 p-3 focus:border-gray-500"
          />
          <input
            ref={email}
            type="email"
            placeholder="Email"
            className="w-full rounded-md border border-gray-700 bg-gray-800 p-3 focus:border-gray-500"
          />
          <div className="relative">
            <input
              ref={password}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full rounded-md border border-gray-700 bg-gray-800 p-3 focus:border-gray-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 text-gray-400"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            className={`text-white w-full rounded-md py-3 ${
              loading ? 'bg-gray-600' : 'bg-netflix-red hover:bg-red-700'
            }`}
            disabled={loading}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-netflix-red hover:underline">
              <button className="rounded-md bg-white-100 px-2 py-1 text-netflix-red hover:bg-white-300 hover:underline sm:px-4 sm:py-2">
                Sign In
              </button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
