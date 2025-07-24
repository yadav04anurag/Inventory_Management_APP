import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await toast.promise(login({ username, password }), {
      loading: 'Signing in...',
      success: () => {
        navigate('/products');
        return 'Login successful!';
      },
      error: (err) => err.response?.data?.message || 'Login failed',
    });
  };

  return (
    <div className="flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 space-y-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl"
      >
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">Login to your account</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
            <input
              id="username" type="text" required value={username} onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
              Sign In
            </button>
          </div>
        </form>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500 hover:underline">
            Register here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;