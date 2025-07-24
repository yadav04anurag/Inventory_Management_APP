import { useState } from 'react';
import axios from '../../api/axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { UserPlus } from 'lucide-react';

const AdminRegister = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    await toast.promise(axios.post('/auth/admin/register', { username, password }), {
      loading: 'Creating admin account...',
      success: () => {
        setUsername('');
        setPassword('');
        setErrors({});
        return 'Admin created successfully!';
      },
      error: (err) => {
        if (err.response && err.response.data.errors) {
          setErrors(err.response.data.errors);
          return 'Please fix the errors below.';
        }
        return err.response?.data?.message || 'Failed to create admin';
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl"
    >
      <h2 className="text-2xl font-bold mb-5 text-gray-900 dark:text-white flex items-center gap-2">
        <UserPlus />
        Create New Admin
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="admin-username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Admin Username</label>
          <input
            id="admin-username" type="text" required value={username} onChange={(e) => setUsername(e.target.value)}
            className={`mt-1 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 ${errors.username ? 'border-red-500' : ''}`}
          />
          {errors.username && <p className="mt-1 text-sm text-red-500">{errors.username}</p>}
        </div>
        <div>
          <label htmlFor="admin-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Admin Password</label>
          <input
            id="admin-password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
            className={`mt-1 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-500' : ''}`}
          />
          {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
        </div>
        <button type="submit" className="w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">Create Admin</button>
      </form>
    </motion.div>
  );
};

export default AdminRegister;