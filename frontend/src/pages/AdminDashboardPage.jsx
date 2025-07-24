import AnalyticsDashboard from '../components/analytics/AnalyticsDashboard.jsx';
import AdminRegister from '../components/auth/AdminRegister.jsx';
import { motion } from 'framer-motion';

const AdminDashboardPage = () => {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <motion.h1
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-4xl font-bold text-gray-900 dark:text-white mb-8"
      >
        Admin Dashboard
      </motion.h1>
      <div className="space-y-10">
        <AnalyticsDashboard />
        <AdminRegister />
      </div>
    </div>
  );
};

export default AdminDashboardPage;