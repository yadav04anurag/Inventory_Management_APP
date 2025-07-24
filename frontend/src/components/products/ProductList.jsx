import { useState, useEffect } from 'react';
import axios from '../../api/axios';
import toast from 'react-hot-toast';
import ProductCard from './ProductCard.jsx';
import Spinner from '../core/Spinner.jsx';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/products?page=${page}&limit=9`);
        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        toast.error('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [page]);

  if (loading) {
    return <div className="flex justify-center p-10"><Spinner /></div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <ProductCard key={product._id} product={product} index={index} />
        ))}
      </div>
      <div className="mt-8 flex justify-center items-center space-x-4">
        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors">Previous</button>
        <span className="text-sm text-gray-700 dark:text-gray-300">Page {page} of {totalPages}</span>
        <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors">Next</button>
      </div>
    </div>
  );
};

export default ProductList;