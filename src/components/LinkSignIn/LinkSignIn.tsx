import { useEffect, useState } from 'react';

import { AuthLayout } from '../ui';
import { auth } from '../../utils/firebase-config';
import { isSignInWithEmailLink } from 'firebase/auth';
import { setCurrentUser } from '../../redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import { useFirebaseAuth } from '../../hooks/useFirebaseAuth';
import { useNavigate } from 'react-router-dom';

export const LinkSignIn = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { completeSignIn, error, setError } = useFirebaseAuth();

  useEffect(() => {
    const savedEmail = window.localStorage.getItem('emailForSignIn');
    if (savedEmail) {
      setEmail(savedEmail);
    } else {
      setError('No email found. Please re-enter your email.');
    }
  }, [setError]);

  const handleSignIn = async () => {
    if (!isSignInWithEmailLink(auth, window.location.href)) {
      setError('Invalid sign-in link.');
      return;
    }

    try {
      const user = await completeSignIn(email, window.location.href);
      dispatch(
        setCurrentUser({
          uid: user.uid,
          displayName: user.displayName || 'Anonymous',
          email: user.email,
          photoURL: user.photoURL || 'default-avatar-url',
        })
      );
      navigate('/');
    } catch {
      // Errors are handled in the hook
    }
  };

  return (
    <AuthLayout title="Complete Sign-In">
      <div className="space-y-4">
        {error && <p className="text-sm text-red-500">{error}</p>}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full rounded-md border border-gray-700 bg-gray-800 p-3 focus:border-gray-500 focus:outline-none"
        />
        <button
          onClick={handleSignIn}
          className="w-full rounded-md bg-red-600 py-3 font-semibold text-white-100 hover:bg-red-700"
        >
          Complete Sign-In
        </button>
      </div>
    </AuthLayout>
  );
};
