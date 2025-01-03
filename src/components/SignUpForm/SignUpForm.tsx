import { Link, useNavigate } from 'react-router-dom';
import { addUser, setCurrentUser } from '../../redux/slices/userSlice';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useRef, useState } from 'react';

import { AppDispatch } from '../../redux/store';
import { auth } from '../../utils/firebase-config';
import { signupFormValidation } from '../../utils/signupFormValidation';
import { useDispatch } from 'react-redux';

export const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      return;
    }

    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        emailValue,
        passwordValue
      );

      const user = userCredential.user;

      console.log('User signed up:', user);

      // Update the user's profile
      await updateProfile(user, {
        displayName: nameValue,
        photoURL: `User_Logo.webp`,
      });

      // Refresh the user
      await auth.currentUser?.reload();

      // Dispatch updated user to Redux
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
        console.log('Updated user dispatched:', updatedUser);

        navigate('/'); // Redirect to home
      } else {
        console.error('Failed to refresh user after profile update.');
        setError('Failed to retrieve updated user details.');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(`${err.message} ${err.name}`);
      } else {
        setError('Failed to sign up. Please try again.');
      }
    }
  };

  return (
    <div
      className="flex min-h-screen w-screen items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/netflix_login_page_background.jpg')" }}
    >
      <div className="w-full max-w-md rounded-md bg-netflix-black bg-opacity-70 px-[68px] py-12 text-white-100">
        <h2 className="mb-7 text-3xl font-bold">Sign Up</h2>
        <div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <input
                ref={name}
                type="text"
                placeholder="Full Name"
                className="w-full rounded-md border border-gray-700 bg-gray-800 p-3 focus:border-gray-500 focus:outline-none"
                required
              />
              <input
                ref={email}
                type="email"
                placeholder="Email or mobile number"
                className="w-full rounded-md border border-gray-700 bg-gray-800 p-3 focus:border-gray-500 focus:outline-none"
                required
              />
              <div className="relative">
                <input
                  ref={password}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  className="w-full rounded-md border border-gray-700 bg-gray-800 p-3 focus:border-gray-500 focus:outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="hover:text-white absolute inset-y-0 right-3 flex items-center text-gray-400"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
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
