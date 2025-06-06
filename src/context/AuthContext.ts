import { User } from '../types/user';
import { createContext } from 'react';

type AuthContextType = User | null;

export const AuthContext = createContext<AuthContextType>(null);
