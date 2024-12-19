import { RootState } from '../redux/store';
import { router } from './Router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const Redirector = () => {
  const user = useSelector((state: RootState) => state.user.users[0]);

  useEffect(() => {
    if (user) {
      router.navigate('/'); // Redirect to home if logged in
    } else {
      router.navigate('/login'); // Redirect to login if not logged in
    }
  }, [user]);

  return null;
};
