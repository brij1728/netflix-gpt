import { Footer } from '../Footer';
import { Header } from '../Header';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header with responsive height */}
      <header className="fixed left-0 top-0 z-10 h-12 w-full bg-black sm:h-16 md:h-20">
        <div className="mx-auto flex h-full w-full max-w-screen-xl items-center">
          <Header />
        </div>
      </header>

      {/* Main content area */}
      <main className="mx-auto w-full max-w-screen-xl flex-grow p-4 pt-16 sm:pt-20 md:pt-24 lg:pt-28">
        <Outlet />
      </main>

      {/* Footer with responsive height */}
      <footer className="h-auto w-full bg-black p-4 sm:h-auto md:h-auto lg:h-auto">
        <div className="mx-auto w-full max-w-screen-xl">
          <Footer />
        </div>
      </footer>
    </div>
  );
};
