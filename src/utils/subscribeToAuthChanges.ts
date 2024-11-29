import { User, onAuthStateChanged } from 'firebase/auth';

import { auth } from './firebase-config';

export const subscribeToAuthChanges = (
  callback: (user: User | null) => void
) => {
  try {
    // Subscribe to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, callback);
    return unsubscribe;
  } catch (error) {
    console.error('Error subscribing to auth changes:', error);
    return () => {}; // Return a no-op unsubscribe function in case of error
  }
};
