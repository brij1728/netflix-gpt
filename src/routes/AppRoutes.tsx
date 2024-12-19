import { RouterProvider } from 'react-router-dom';
import { Suspense } from 'react';
import { router } from './Router';
export const AppRoutes = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <RouterProvider router={router} />
    </Suspense>
  );
};
