import { Loader } from '../components/ui';
import { RouterProvider } from 'react-router-dom';
import { Suspense } from 'react';
import { router } from './Router';
export const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};
