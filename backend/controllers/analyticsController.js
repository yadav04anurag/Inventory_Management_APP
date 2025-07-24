const Product = require('../models/Product');
const User = require('../models/User');

module.exports = {
  getStats: async (req, res) => {
    try {
      const totalProducts = await Product.countDocuments();
      const totalUsers = await User.countDocuments();
      
      const products = await Product.find();
      const totalValue = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
      
      const lowStockCount = products.filter(p => p.quantity < 10).length;

      res.json({
        totalProducts,
        totalUsers,
        totalValue,
        lowStockCount
      });
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  },

  getTopProducts: async (req, res) => {
    try {
      const topProducts = await Product.aggregate([
        {
          $group: {
        _id: '$name',
        quantity: { $sum: '$quantity' }
          }
        },
        { $sort: { quantity: 1 } },
        { $limit: 5 }
      ]);

      res.json(topProducts);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  }
};