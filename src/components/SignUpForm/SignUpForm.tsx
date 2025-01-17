import { Link } from 'react-router-dom';
import { signupFormValidation } from '../../utils/signupFormValidation';
import { useFirebaseAuth } from '../../hooks/useFirebaseAuth';
import { useRef } from 'react';

export const SignUpForm = () => {
  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const {
    loading,
    error,
    successMessage,
    registerUser,
    checkEmailExists,
    setError,
    setLoading,
  } = useFirebaseAuth();

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
      return;
    }

    try {
      const emailExists = await checkEmailExists(emailValue);
      if (emailExists) {
        setError('Email is already registered. Please log in.');
        return;
      }

      await registerUser(emailValue, passwordValue, {
        displayName: nameValue,
        photoURL: 'User_Logo.webp',
      });
    } catch {
      // Errors are already handled in the hook
    }
  };

  return (
    <>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          ref={name}
          type="text"
          placeholder="Full Name"
          className="w-full rounded-md border border-gray-700 bg-gray-800 p-3 focus:border-gray-500 focus:outline-none"
        />
        <input
          ref={email}
          type="email"
          placeholder="Email"
          className="w-full rounded-md border border-gray-700 bg-gray-800 p-3 focus:border-gray-500 focus:outline-none"
        />
        <div className="relative">
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="w-full rounded-md border border-gray-700 bg-gray-800 p-3 focus:border-gray-500 focus:outline-none"
          />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        {successMessage && (
          <p className="text-sm text-green-500">{successMessage}</p>
        )}
        <button
          type="submit"
          className={`text-white w-full rounded-md py-3 font-semibold ${
            loading
              ? 'cursor-not-allowed bg-gray-600'
              : 'bg-red-600 hover:bg-red-700'
          }`}
          disabled={loading}
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
      <div className="mt-6 text-center">
        <p className="flex flex-col items-center justify-center gap-1 text-sm sm:flex-row sm:gap-2 md:text-base">
          Already have an account?
          <Link
            to="/login"
            className="rounded bg-white-100 px-2 py-1 text-netflix-red hover:underline sm:px-3 sm:py-2"
          >
            Sign In
          </Link>
        </p>
      </div>
    </>
  );
};
