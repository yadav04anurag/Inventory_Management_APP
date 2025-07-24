const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { verifyToken } = require('../middlewares/auth');

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product-related operations
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Add a new product
 *     tags: [Products]
 *     description: Adds a new product to the inventory. Requires user authentication.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created successfully.
 *       400:
 *         description: Bad request, invalid input data.
 *       401:
 *         description: Unauthorized.
 */
router.post('/', verifyToken, productController.addProduct);

/**
 * @swagger
 * /api/products/{id}/quantity:
 *   put:
 *     summary: Update a product's quantity
 *     tags: [Products]
 *     description: Updates the stock quantity of a specific product.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: number
 *                 example: 75
 *     responses:
 *       200:
 *         description: Product quantity updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request, invalid input.
 *       401:
 *         description: Unauthorized.
 */
router.put('/:id/quantity', verifyToken, productController.updateQuantity);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Retrieve a list of products
 *     tags: [Products]
 *     description: Retrieve a paginated list of products from the database.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number to retrieve.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The number of products to retrieve per page.
 *     responses:
 *       200:
 *         description: A paginated list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 currentPage:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 totalProducts:
 *                   type: integer
 *       401:
 *         description: Unauthorized.
 */
router.get('/', verifyToken, productController.getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a single product by ID
 *     tags: [Products]
 *     description: Retrieves detailed information for a single product.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to retrieve.
 *     responses:
 *       200:
 *         description: Product details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Product not found.
 */
router.get('/:id', verifyToken, productController.getProductById);

module.exports = router;