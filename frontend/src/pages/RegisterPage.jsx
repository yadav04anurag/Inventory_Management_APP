import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import toast from 'react-hot-toast';
import axios from '../api/axios';
import { motion } from 'framer-motion';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading('Creating account...');
    try {
      await axios.post('/auth/register', { username, password });
      toast.success('Registration successful! Please log in.', { id: toastId });
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
        toast.error('Please fix the errors below.', { id: toastId });
      } else {
        toast.error(error.response?.data?.message || 'Registration failed', { id: toastId });
      }
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 space-y-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl"
      >
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">Create a New Account</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
            <input
              id="username" type="text" required value={username} onChange={(e) => setUsername(e.target.value)}
              className={`mt-1 block w-full px-4 py-2 bg-white dark:bg-gray-700 border ${errors.username ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.username && <p className="mt-2 text-sm text-red-600">{errors.username}</p>}
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              className={`mt-1 block w-full px-4 py-2 bg-white dark:bg-gray-700 border ${errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
          </div>
          <div>
            <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
              Sign Up
            </button>
          </div>
        </form>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;