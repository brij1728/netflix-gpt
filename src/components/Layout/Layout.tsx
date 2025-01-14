import { Outlet, useLocation, useNavigation } from 'react-router-dom';

import { AuthLayout } from '../ui';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { Loader } from '../ui/Loader';

export const Layout = () => {
  const location = useLocation();
  const navigation = useNavigation();

  const authPaths = ['/login', '/signup', '/link-signin'];
  const isAuthPage = authPaths.includes(location.pathname);

  // Determine if navigation is ongoing
  const isLoading = navigation.state === 'loading';

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header: Always visible */}
      <header className="fixed left-0 top-0 z-10 h-12 w-full bg-black sm:h-16 md:h-20">
        <div className="mx-auto flex h-full w-full max-w-screen-xl items-center">
          <Header />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {isLoading && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <Loader />
          </div>
        )}

        {isAuthPage ? (
          // Render AuthLayout for specific auth pages
          <AuthLayout title={getAuthTitle(location.pathname)}>
            <Outlet />
          </AuthLayout>
        ) : (
          // Render default layout content for all other pages
          <div className="mx-auto w-full max-w-screen-xl p-4 pt-16 sm:pt-20 md:pt-24 lg:pt-28">
            <Outlet />
          </div>
        )}
      </main>

      {/* Footer: Always visible */}
      <footer className="h-auto w-full bg-black p-4 sm:h-auto md:h-auto lg:h-auto">
        <div className="mx-auto w-full max-w-screen-xl">
          <Footer />
        </div>
      </footer>
    </div>
  );
};

// Helper function to get dynamic titles for AuthLayout
const getAuthTitle = (path: string): string => {
  switch (path) {
    case '/login':
      return 'Sign In';
    case '/signup':
      return 'Sign Up';
    case '/link-signin':
      return 'Complete Sign-In';
    default:
      return 'Authentication';
  }
};
