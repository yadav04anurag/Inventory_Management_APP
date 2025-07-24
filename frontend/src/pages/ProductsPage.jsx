import ProductList from '../components/products/ProductList.jsx';
import AddProduct from '../components/products/AddProduct.jsx';
import { motion } from 'framer-motion';

const ProductsPage = () => {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <motion.h1
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-4xl font-bold text-gray-900 dark:text-white mb-8"
      >
        Product Management
      </motion.h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ProductList />
        </div>
        <div>
          <AddProduct />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;