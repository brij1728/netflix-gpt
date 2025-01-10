import {
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
  signInWithEmailLink,
} from 'firebase/auth';

import { auth } from '../utils/firebase-config';
import { useState } from 'react';

export const useFirebaseAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const sendMagicLink = async (email: string, url: string) => {
    setLoading(true);
    setError(null);
    try {
      await sendSignInLinkToEmail(auth, email, {
        url,
        handleCodeInApp: true,
      });
      window.localStorage.setItem('emailForSignIn', email);
      setSuccessMessage(
        'Sign-in link sent to your email. Check your inbox to complete the process.'
      );
    } catch (err) {
      setError('Failed to send magic link. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const completeSignIn = async (email: string, link: string) => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithEmailLink(auth, email, link);
      return userCredential.user; // Return the signed-in user
    } catch (err) {
      setError('Failed to complete sign-in. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const passwordSignIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user; // Return the signed-in user
    } catch (err) {
      setError('Incorrect email or password. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    successMessage,
    sendMagicLink,
    completeSignIn,
    passwordSignIn,
    setError,
    setSuccessMessage,
  };
};
