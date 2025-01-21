import { useEffect, useState } from 'react';

import { AppDispatch } from '../../redux/store';
import { BrowserUtils } from '../../utils/browserUtils';
import { auth } from '../../utils/firebase-config';
import { isSignInWithEmailLink } from 'firebase/auth';
import { setCurrentUser } from '../../redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import { useFirebaseAuth } from '../../hooks/useFirebaseAuth';
import { useNavigate } from 'react-router-dom';

export const LinkSignIn = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { completeSignIn, loading, error, setError } = useFirebaseAuth();

  useEffect(() => {
    const savedEmail = BrowserUtils.getLocalStorageItem('emailForSignIn');
    if (savedEmail) {
      setEmail(savedEmail);
    } else {
      setError('No email found. Please re-enter your email.');
    }
  }, [setError]);

  const handleSignIn = async () => {
    if (!isSignInWithEmailLink(auth, BrowserUtils.getLocationHref())) {
      setError('Invalid or expired sign-in link.');
      return;
    }

    try {
      const user = await completeSignIn(email, BrowserUtils.getLocationHref());
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
      // Error handling already handled in `useFirebaseAuth`
    }
  };

  return (
    <div className="space-y-4">
      {error && <p className="text-sm text-red-500">{error}</p>}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="w-full rounded-md border border-gray-700 bg-gray-800 p-3 focus:border-gray-500 focus:outline-none"
        disabled={loading}
      />
      <button
        onClick={handleSignIn}
        disabled={loading || !email}
        className={`w-full rounded-md py-3 font-semibold ${
          loading
            ? 'cursor-not-allowed bg-gray-600'
            : 'bg-red-600 hover:bg-red-700'
        } text-white-100`}
      >
        {loading ? 'Signing In...' : 'Complete Sign-In'}
      </button>
    </div>
  );
};
