import {
  ErrorPage,
  FAQPage,
  HelpPage,
  HomePage,
  LoginPage,
  PrivacyPage,
  TermsPage,
} from '../pages';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Layout } from '../components';

// Create the router configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // Layout is the parent route
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/privacy',
        element: <PrivacyPage />,
      },
      {
        path: '/terms',
        element: <TermsPage />,
      },
      {
        path: '/help',
        element: <HelpPage />,
      },
      {
        path: '/faq',
        element: <FAQPage />,
      },
      {
        path: '*',
        element: (
          <ErrorPage
            title="404 Not Found"
            message="The requested page does not exist."
          />
        ),
      },
    ],
  },
]);

// Use RouterProvider to pass the router configuration to the app
export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};
