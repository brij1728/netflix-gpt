import React, { useEffect, useState } from 'react';
import {
  addUser,
  removeUser,
  setCurrentUser as setReduxCurrentUser,
} from '../redux/slices/userSlice';

import { AppDispatch } from '../redux/store';
import { AuthContext } from '../context/AuthContext';
import { Loader } from '../components/ui';
import { User } from '../types/user';
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
        const { uid, displayName, email, photoURL } = user;

        const userData: User = { uid, displayName, email, photoURL };
        dispatch(addUser(userData));
        dispatch(setReduxCurrentUser(userData));
      } else {
        dispatch(removeUser());
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);
  if (loading) {
    return <Loader />; // Show a loading indicator
  }

  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
};
