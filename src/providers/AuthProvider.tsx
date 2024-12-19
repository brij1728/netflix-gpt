import React, { useEffect, useState } from 'react';
import { addUser, removeUser } from '../redux/slices/userSlice';

import { AppDispatch } from '../redux/store';
import { AuthContext } from '../context/AuthContext';
import { User } from 'firebase/auth';
import { router } from '../routes/Router';
import { subscribeToAuthChanges } from '../utils/subscribeToAuthChanges';
import { useDispatch } from 'react-redux';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((user) => {
      setCurrentUser(user);
      if (user) {
        const { uid, displayName, email } = user;
        dispatch(addUser({ uid, displayName, email }));
        router.navigate('/'); // Redirect to home on login
      } else {
        dispatch(removeUser()); // Clear user from Redux
        router.navigate('/login'); // Redirect to login on logout
      }
      setLoading(false); // Stop loading once the user is checked
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator
  }

  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
};
