const Product = require('../models/Product');

module.exports = {
  addProduct: async (req, res) => {
    try {
      const product = await Product.create(req.body);
      res.status(201).json({ productId: product._id });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  updateQuantity: async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        { quantity: req.body.quantity },
        { new: true }
      );
      res.json(product);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  getProducts: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const products = await Product.find()
        .skip(skip)
        .limit(limit);

      const totalProducts = await Product.countDocuments();

      res.json({
        products,
        currentPage: page,
        totalPages: Math.ceil(totalProducts / limit),
        totalProducts
      });
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  },
  getProductById: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  }
};