import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import { Layout } from '../components';

// Lazy load each page
const HomePage = lazy(() => import('../pages/HomePage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const SignUpPage = lazy(() => import('../pages/SignUpPage'));
const PrivacyPage = lazy(() => import('../pages/PrivacyPage'));
const TermsPage = lazy(() => import('../pages/TermsPage'));
const HelpPage = lazy(() => import('../pages/HelpPage'));
const FAQPage = lazy(() => import('../pages/FAQPage'));
const ErrorPage = lazy(() => import('../pages/ErrorPage'));

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

// Use RouterProvider with Suspense to load routes on demand
export const AppRoutes = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <RouterProvider router={router} />
    </Suspense>
  );
};
