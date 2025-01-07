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
import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

// Create the router configuration
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: (
          <PrivateRoute>
            <Suspense fallback={<div>Loading...</div>}>
              <HomePage />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: '/login',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: '/signup',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <SignUpPage />
          </Suspense>
        ),
      },
      {
        path: '/privacy',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <PrivacyPage />
          </Suspense>
        ),
      },
      {
        path: '/terms',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <TermsPage />
          </Suspense>
        ),
      },
      {
        path: '/help',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <HelpPage />
          </Suspense>
        ),
      },
      {
        path: '/faq',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <FAQPage />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ErrorPage />
          </Suspense>
        ),
      },
    ],
  },
]);
