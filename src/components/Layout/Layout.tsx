import { Footer } from '../Footer';
import { Header } from '../Header';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Renders the matched child route component */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
