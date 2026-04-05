import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full max-w-7xl relative">
        <Outlet />
      </main>
      <footer className="bg-slate-900 border-t border-slate-800 py-6 mt-auto">
        <div className="text-center text-sm text-slate-400">
          &copy; {new Date().getFullYear()} GeoMind Interactive Learning. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
