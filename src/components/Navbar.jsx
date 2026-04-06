import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../context/ThemeContext';
import { LogOut, Map, LayoutDashboard, User, Sun, Moon, Menu, X, Gamepad2 } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-white dark:bg-slate-900 shadow border-b border-gray-100 dark:border-slate-800 transition-colors duration-300 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2" onClick={closeMenu}>
              <div className="w-8 h-8 rounded bg-primary text-white flex items-center justify-center">
                <Map className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white transition-colors duration-300">GeoGuesser</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors focus:outline-none"
              title="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {user ? (
              <>
                <Link to="/game" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-medium transition-colors">
                  Play Game
                </Link>
                <Link to="/dashboard" className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">
                  <LayoutDashboard className="w-5 h-5" />
                  <span>Dashboard</span>
                </Link>
                <div className="h-6 w-px bg-gray-200 dark:bg-slate-700 mx-2"></div>
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <div className="w-7 h-7 bg-blue-100 dark:bg-slate-800 text-blue-700 dark:text-primary rounded-full flex items-center justify-center font-bold">
                    {user.displayName ? user.displayName.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
                  </div>
                  <span className="font-medium truncate max-w-[100px]">{user.displayName || user.email.split('@')[0]}</span>
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-500 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <>
                <Link to="/auth" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium px-3 py-2 transition-colors">
                  Log in
                </Link>
                <Link to="/auth" className="bg-primary hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg transition-colors">
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors focus:outline-none"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setMenuOpen(o => !o)}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="sm:hidden bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 shadow-lg">
          <div className="px-4 py-3 space-y-1">
            {user ? (
              <>
                {/* User info */}
                <div className="flex items-center gap-3 px-2 py-3 border-b border-gray-100 dark:border-slate-800 mb-2">
                  <div className="w-9 h-9 bg-blue-100 dark:bg-slate-800 text-blue-700 dark:text-primary rounded-full flex items-center justify-center font-bold text-lg">
                    {user.displayName ? user.displayName.charAt(0).toUpperCase() : <User className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white text-sm">{user.displayName || 'Explorer'}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[200px]">{user.email}</div>
                  </div>
                </div>

                <Link
                  to="/game"
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-2 py-3 text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <Gamepad2 className="w-5 h-5" /> Play Game
                </Link>
                <Link
                  to="/dashboard"
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-2 py-3 text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <LayoutDashboard className="w-5 h-5" /> Dashboard
                </Link>
                <button
                  onClick={() => { logout(); closeMenu(); }}
                  className="w-full flex items-center gap-3 px-2 py-3 text-red-500 font-medium rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <LogOut className="w-5 h-5" /> Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/auth"
                  onClick={closeMenu}
                  className="block px-2 py-3 text-gray-700 dark:text-gray-200 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/auth"
                  onClick={closeMenu}
                  className="block px-2 py-3 text-primary font-medium rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
