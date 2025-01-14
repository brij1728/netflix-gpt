import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
  signInWithEmailLink,
  updateProfile,
} from 'firebase/auth';

import { BrowserUtils } from '../utils/browserUtils';
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
      BrowserUtils.setLocalStorageItem('emailForSignIn', email);
      setSuccessMessage(
        'Sign-in link sent to your email. Check your inbox to complete the process.'
      );
    } catch (err) {
      console.error('Error sending magic link:', err);
      setError('Failed to send magic link. Please try again.');
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
      return userCredential.user;
    } catch (err) {
      console.error('Error during password sign-in:', err);
      setError('Incorrect email or password. Please try again.');
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
      BrowserUtils.removeLocalStorageItem('emailForSignIn');
      return userCredential.user;
    } catch (err) {
      console.error('Error completing sign-in:', err);
      setError('Failed to complete sign-in. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const checkEmailExists = async (email: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const methods = await fetchSignInMethodsForEmail(auth, email);
      return methods.length > 0;
    } catch (err) {
      console.error('Error checking email existence:', err);
      setError('Error verifying email. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (
    email: string,
    password: string,
    profile: { displayName: string; photoURL: string }
  ) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      await updateProfile(user, {
        displayName: profile.displayName,
        photoURL: profile.photoURL,
      });

      setSuccessMessage('Account created successfully!');
      return user;
    } catch (err) {
      console.error('Error during registration:', err);

      if (err instanceof Error) {
        const errorCode = (err as { code?: string }).code;

        switch (errorCode) {
          case 'auth/email-already-in-use':
            setError('Email is already in use.');
            break;
          case 'auth/weak-password':
            setError('Password is too weak. Please use a stronger password.');
            break;
          default:
            setError(err.message || 'An unexpected error occurred.');
        }
      } else {
        setError('An unknown error occurred.');
      }
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
    passwordSignIn,
    completeSignIn,
    checkEmailExists,
    registerUser,
    setError,
    setLoading,
    setSuccessMessage,
  };
};
