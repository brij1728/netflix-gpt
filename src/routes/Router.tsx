import {
  ErrorPage,
  FAQPage,
  GPTSearchPage,
  HelpPage,
  HomePage,
  LinkSignInPage,
  LoginPage,
  PrivacyPage,
  SignUpPage,
  TermsPage,
} from './routes';

import { Layout } from '../components';
import { Loader } from '../components/ui';
import { PrivateRoute } from './privateRoutes';
import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',

        element: (
          <Suspense fallback={<Loader />}>
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          </Suspense>
        ),
      },
      {
        path: '/login',
        element: (
          <Suspense fallback={<Loader />}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: '/link-signin',
        element: <LinkSignInPage />,
      },
      {
        path: '/signup',
        element: (
          <Suspense fallback={<Loader />}>
            <SignUpPage />
          </Suspense>
        ),
      },
      {
        path: '/privacy',
        element: (
          <Suspense fallback={<Loader />}>
            <PrivacyPage />
          </Suspense>
        ),
      },
      {
        path: '/terms',
        element: (
          <Suspense fallback={<Loader />}>
            <TermsPage />
          </Suspense>
        ),
      },
      {
        path: '/help',
        element: (
          <Suspense fallback={<Loader />}>
            <HelpPage />
          </Suspense>
        ),
      },
      {
        path: '/faq',
        element: (
          <Suspense fallback={<Loader />}>
            <FAQPage />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<Loader />}>
            <ErrorPage />
          </Suspense>
        ),
      },
      {
        path: '/gptsearch',
        element: (
          <Suspense fallback={<Loader />}>
            <GPTSearchPage />
          </Suspense>
        ),
      },
    ],
  },
]);
