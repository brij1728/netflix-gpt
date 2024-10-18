import { Footer } from '../Footer';
import { Header } from '../Header';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header with full width */}
      <header className="fixed left-0 top-0 z-10 h-16 w-full bg-black">
        <div className="mx-auto w-full max-w-screen-xl">
          <Header />
        </div>
      </header>

      {/* Main content area with top padding to match header height */}
      <main className="mx-auto w-full max-w-screen-xl flex-grow p-4 pt-16 md:p-8 lg:p-12">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
