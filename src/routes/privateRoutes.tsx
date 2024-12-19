import { Navigate, Outlet } from 'react-router-dom';

import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';

export const PrivateRoute = () => {
  const user = useSelector((state: RootState) => state.user.users[0]);

  return user ? <Outlet /> : <Navigate to="/login" />;
};
