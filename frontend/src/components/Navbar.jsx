import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  LogIn,
  LogOut,
  UserPlus,
  Home,
  Sparkles,
} from 'lucide-react';
import toast from 'react-hot-toast';

import useAuth from '../hooks/useAuth';

const Navbar = () => {
  const navigate = useNavigate();

  const {
    user,
    isAuthenticated,
    logout,
  } = useAuth();

  const navLinkClass = ({ isActive }) =>
    `group flex items-center gap-2
     text-sm font-medium
     transition-all duration-200 ${
       isActive
         ? 'text-blue-600'
         : 'text-slate-600 hover:text-blue-600'
     }`;

  const handleLogout = () => {
    logout();

    toast.success('Logged out successfully! 👋');

    navigate('/log-in');
  };

  return (
    <nav
      className="sticky top-0 z-50
                 border-b border-white/20
                 bg-white/80
                 backdrop-blur-xl
                 shadow-lg shadow-blue-100/40"
    >
      <div
        className="absolute top-0 left-0 right-0 h-1
                   bg-gradient-to-r
                   from-blue-500
                   via-indigo-500
                   to-purple-500"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            to="/"
            className="group flex items-center gap-2"
          >
            <div
              className="w-9 h-9 rounded-xl
                         bg-gradient-to-br
                         from-blue-600
                         via-indigo-600
                         to-purple-600
                         flex items-center justify-center
                         shadow-lg shadow-blue-500/30
                         group-hover:scale-105
                         transition-transform"
            >
              <Sparkles
                size={19}
                className="text-white"
              />
            </div>

            <span
              className="text-2xl font-extrabold
                         bg-gradient-to-r
                         from-blue-600
                         via-indigo-600
                         to-purple-600
                         bg-clip-text
                         text-transparent"
            >
              MyApp
            </span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-2 sm:gap-6">

            <NavLink
              to="/"
              className={navLinkClass}
            >
              <Home size={17} />

              <span className="hidden sm:inline">
                Home
              </span>
            </NavLink>

            {!isAuthenticated ? (
              <>
                <NavLink
                  to="/log-in"
                  className={navLinkClass}
                >
                  <LogIn size={17} />

                  <span className="hidden sm:inline">
                    Login
                  </span>
                </NavLink>

                <NavLink
                  to="/register"
                  className="flex items-center gap-2
                             px-4 py-2
                             rounded-xl
                             text-sm font-semibold
                             text-white
                             bg-gradient-to-r
                             from-blue-600
                             via-indigo-600
                             to-purple-600
                             shadow-md
                             hover:shadow-lg
                             hover:-translate-y-0.5
                             active:scale-95
                             transition-all"
                >
                  <UserPlus size={17} />

                  <span className="hidden sm:inline">
                    Register
                  </span>
                </NavLink>
              </>
            ) : (
              <>
                <div className="hidden sm:flex items-center gap-2">
                  <div
                    className="w-9 h-9 rounded-full
                               bg-gradient-to-br
                               from-blue-500
                               to-purple-600
                               flex items-center justify-center"
                  >
                    <span className="text-sm font-bold text-white">
                      {user?.name
                        ?.charAt(0)
                        ?.toUpperCase() || 'U'}
                    </span>
                  </div>

                  <span
                    className="text-sm font-semibold
                               bg-gradient-to-r
                               from-blue-600
                               to-purple-600
                               bg-clip-text
                               text-transparent"
                  >
                    {user?.name || 'Welcome'}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-2
                             px-4 py-2
                             rounded-xl
                             text-sm font-semibold
                             text-white
                             bg-gradient-to-r
                             from-red-500
                             to-rose-600
                             hover:shadow-lg
                             active:scale-95
                             transition-all"
                >
                  <LogOut size={17} />

                  <span className="hidden sm:inline">
                    Logout
                  </span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;