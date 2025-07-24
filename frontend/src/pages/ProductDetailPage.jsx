import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import axios from '../api/axios';
import toast from 'react-hot-toast';
import Spinner from '../components/core/Spinner';
import { ArrowLeft, Package, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        toast.error('Could not fetch product details.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center h-[calc(100vh-80px)]"><Spinner /></div>;
  }

  if (!product) {
    return <div className="text-center py-20 text-xl text-gray-500">Product not found.</div>;
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Link to="/products" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-6">
          <ArrowLeft size={20} />
          Back to Products
        </Link>
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              <img
                src={product.image_url || `https://via.placeholder.com/500x500.png?text=${product.name.replace(/\s/g, "+")}`}
                alt={product.name}
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
            </motion.div>
            <div className="flex flex-col">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{product.name}</h1>
              <p className="text-lg text-gray-500 dark:text-gray-400 mt-1">{product.type}</p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">SKU: {product.sku}</p>
              <p className="mt-4 text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                {product.description || 'No description available for this product.'}
              </p>
              <div className="mt-auto pt-6 space-y-4">
                <div className="flex items-center gap-4 text-lg">
                  <DollarSign className="text-green-500" />
                  <span className="font-semibold">Price:</span>
                  <span className="text-2xl font-bold text-green-500">${product.price.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-4 text-lg">
                  <Package className="text-blue-500" />
                  <span className="font-semibold">In Stock:</span>
                  <span className="font-bold">{product.quantity} units</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductDetailPage;