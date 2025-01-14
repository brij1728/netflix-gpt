import {
  ErrorPage,
  FAQPage,
  HelpPage,
  HomePage,
  LinkSignInPage,
  LoginPage,
  PrivacyPage,
  SignUpPage,
  TermsPage,
} from './routes';

import { Layout } from '../components';
import { PrivateRoute } from './privateRoutes';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: (
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        ),
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/link-signin',
        element: <LinkSignInPage />,
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
        element: <ErrorPage />,
      },
    ],
  },
]);
