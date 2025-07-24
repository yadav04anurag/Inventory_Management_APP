import { Link } from 'react-router';
import { Frown } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] text-center px-4">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <Frown className="h-24 w-24 text-blue-500 mx-auto" />
        <h1 className="mt-6 text-6xl font-extrabold text-gray-900 dark:text-white">404</h1>
        <p className="mt-2 text-2xl font-semibold text-gray-700 dark:text-gray-300">Page Not Found</p>
        <p className="mt-4 text-gray-500 dark:text-gray-400">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        >
          Go back home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;