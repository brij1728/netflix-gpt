import { User } from '../types/user';
import { auth } from '../utils/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';

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
