import { useState } from 'react';
import axios from '../../api/axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { PlusCircle } from 'lucide-react';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '', type: '', sku: '', quantity: '', price: '', image_url: '', description: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      ...formData,
      quantity: Number(formData.quantity),
      price: Number(formData.price),
    };

    await toast.promise(axios.post('/products', productData), {
      loading: 'Adding product...',
      success: () => {
        setFormData({ name: '', type: '', sku: '', quantity: '', price: '', image_url: '', description: '' });
        window.location.reload();
        return 'Product added successfully!';
      },
      error: (err) => err.response?.data?.message || 'Failed to add product',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl h-full"
    >
      <h2 className="text-2xl font-bold mb-5 text-gray-900 dark:text-white flex items-center gap-2">
        <PlusCircle />
        Add New Product
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Product Name</label>
          <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
          <input type="text" name="type" id="type" value={formData.type} onChange={handleChange} required className="mt-1 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div>
          <label htmlFor="sku" className="block text-sm font-medium text-gray-700 dark:text-gray-300">SKU</label>
          <input type="text" name="sku" id="sku" value={formData.sku} onChange={handleChange} required className="mt-1 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Quantity</label>
            <input type="number" name="quantity" id="quantity" value={formData.quantity} onChange={handleChange} required className="mt-1 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"/>
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Price</label>
            <input type="number" name="price" id="price" step="0.01" value={formData.price} onChange={handleChange} required className="mt-1 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"/>
          </div>
        </div>
         <div>
          <label htmlFor="image_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image URL (Optional)</label>
          <input type="text" name="image_url" id="image_url" value={formData.image_url} onChange={handleChange} className="mt-1 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"/>
        </div>
         <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description (Optional)</label>
          <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows="3" className="mt-1 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"></textarea>
        </div>
        <button type="submit" className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">Add Product</button>
      </form>
    </motion.div>
  );
};

export default AddProduct;