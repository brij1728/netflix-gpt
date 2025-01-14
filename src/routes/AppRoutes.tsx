import { RouterProvider } from 'react-router-dom';
import { router } from './Router';
export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};
