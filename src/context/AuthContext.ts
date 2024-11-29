import { User } from 'firebase/auth';
import { createContext } from 'react';

type AuthContextType = User | null;

export const AuthContext = createContext<AuthContextType>(null);
