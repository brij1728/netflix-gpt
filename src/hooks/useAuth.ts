import { AuthContext } from '../context/AuthContext';
import { User } from 'firebase/auth';
import { useContext } from 'react';

export const useAuth = (): User | null => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
