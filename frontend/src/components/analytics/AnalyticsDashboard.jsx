import { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';
import { Package, Users, DollarSign, AlertTriangle } from 'lucide-react';
import Spinner from '../core/Spinner';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon, color, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl flex items-center space-x-4"
  >
    <div className={`p-4 rounded-full ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
      <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
    </div>
  </motion.div>
);

const AnalyticsDashboard = () => {
  const [stats, setStats] = useState(null);
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsPromise = axios.get('/analytics/stats');
        const topProductsPromise = axios.get('/analytics/top-products');
        const [statsRes, topProductsRes] = await Promise.all([statsPromise, topProductsPromise]);
        setStats(statsRes.data);
        setTopProducts(topProductsRes.data);
      } catch (error) {
        toast.error('Failed to fetch analytics data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="flex justify-center p-10"><Spinner /></div>;
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Products" value={stats.totalProducts} icon={<Package className="text-white"/>} color="bg-blue-500" index={0}/>
        <StatCard title="Total Users" value={stats.totalUsers} icon={<Users className="text-white"/>} color="bg-green-500" index={1}/>
        <StatCard title="Inventory Value" value={`$${stats.totalValue.toFixed(2)}`} icon={<DollarSign className="text-white"/>} color="bg-yellow-500" index={2}/>
        <StatCard title="Low Stock" value={stats.lowStockCount} icon={<AlertTriangle className="text-white"/>} color="bg-red-500" index={3}/>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl"
      >
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Top 5 Products by Quantity</h3>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={topProducts} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
              <XAxis dataKey="_id" stroke="currentColor" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="currentColor" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(31, 41, 55, 0.9)',
                  border: 'none',
                  borderRadius: '0.75rem',
                  color: '#fff'
                }}
              />
              <Legend wrapperStyle={{fontSize: "14px"}} />
              <Bar dataKey="quantity" fill="#4f46e5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsDashboard;