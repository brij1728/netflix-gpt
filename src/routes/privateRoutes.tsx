import React, { ReactNode } from 'react';

import { Navigate } from 'react-router-dom';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const user = useSelector((state: RootState) => state.user.currentUser);

  return user ? <>{children}</> : <Navigate to="/login" />;
};
