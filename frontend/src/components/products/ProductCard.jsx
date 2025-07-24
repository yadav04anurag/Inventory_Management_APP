import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { DollarSign, Package } from 'lucide-react';

const ProductCard = ({ product, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link to={`/products/${product._id}`} className="block group">
        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-xl shadow-lg overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
          <img
            src={product.image_url || `https://via.placeholder.com/400x300.png?text=${product.name.replace(/\s/g, "+")}`}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-5 flex-grow flex flex-col">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white truncate">{product.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{product.type}</p>
            <div className="mt-auto pt-4 flex justify-between items-center">
              <div className="flex items-center gap-2 text-green-500">
                <DollarSign size={18} />
                <span className="font-bold text-lg">{product.price.toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Package size={18} />
                <span className="font-semibold">{product.quantity}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;