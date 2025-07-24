import { Link, NavLink } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import ThemeToggle from './ThemeToggle.jsx';
import { motion } from 'framer-motion';

const NavItem = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
        isActive
          ? 'bg-black/10 dark:bg-white/10 text-blue-600 dark:text-blue-400'
          : 'text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5'
      }`
    }
  >
    {children}
  </NavLink>
);

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await toast.promise(logout(), {
      loading: 'Logging out...',
      success: 'Logged out successfully!',
      error: 'Logout failed.',
    });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg shadow-sm sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-gray-900 dark:text-white">
            Inventory<span className="text-blue-600 dark:text-blue-400">3D</span>
          </Link>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <ThemeToggle />
            {user ? (
              <>
                {user.role === 'admin' && <NavItem to="/admin">Admin</NavItem>}
                <NavItem to="/products">Products</NavItem>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavItem to="/login">Login</NavItem>
                <Link
                  to="/register"
                  className="px-3 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;