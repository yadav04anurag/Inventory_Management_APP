import { Link } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-6 text-center flex flex-col items-center justify-center h-[calc(100vh-80px)]">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg">
          Manage Inventory with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Style</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-3xl drop-shadow-md">
          A modern, 3D-accelerated, and intuitive inventory management system designed for performance and aesthetics.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
        className="mt-10"
      >
        <Link
          to={user ? "/products" : "/login"}
          className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-full shadow-lg hover:scale-105 transform transition-transform duration-300"
        >
          {user ? 'Go to Dashboard' : 'Get Started'}
          <ArrowRight />
        </Link>
      </motion.div>
    </div>
  );
};

export default HomePage;