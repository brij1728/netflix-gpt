import {
  ErrorPage,
  FAQPage,
  HelpPage,
  HomePage,
  LoginPage,
  PrivacyPage,
  SignUpPage,
  TermsPage,
} from './routes';

import { Layout } from '../components';
import { PrivateRoute } from './privateRoutes';
import { createBrowserRouter } from 'react-router-dom';

// Create the router configuration
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <PrivateRoute />,
        children: [
          {
            path: '/',
            element: <HomePage />,
          },
        ],
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/signup',
        element: <SignUpPage />,
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
