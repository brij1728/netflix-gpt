import { ErrorPage, HomePage, LoginPage } from '../pages';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

// Create the router configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: (
      <ErrorPage
        title="Oops! Something went wrong."
        message="The page you are looking for does not exist or an unexpected error occurred."
      />
    ),
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);

// Use RouterProvider to pass the router configuration to the app
export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};
