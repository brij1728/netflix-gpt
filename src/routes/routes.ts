import { lazy } from 'react';

// Lazy load each page
export const HomePage = lazy(() => import('../pages/HomePage'));
export const LoginPage = lazy(() => import('../pages/LoginPage'));
export const SignUpPage = lazy(() => import('../pages/SignUpPage'));
export const PrivacyPage = lazy(() => import('../pages/PrivacyPage'));
export const TermsPage = lazy(() => import('../pages/TermsPage'));
export const HelpPage = lazy(() => import('../pages/HelpPage'));
export const FAQPage = lazy(() => import('../pages/FAQPage'));
export const ErrorPage = lazy(() => import('../pages/ErrorPage'));
export const LinkSignInPage = lazy(() => import('../pages/LinkSignInPage'));
