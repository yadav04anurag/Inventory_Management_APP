const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const { verifyToken, isAdmin } = require('../middlewares/auth');

/**
 * @swagger
 * tags:
 *   name: Analytics
 *   description: Data analytics and statistics (Admin only)
 */

/**
 * @swagger
 * /api/analytics/stats:
 *   get:
 *     summary: Get system-wide statistics
 *     tags: [Analytics]
 *     description: Retrieves key statistics like total products, total users, total inventory value, and low stock count. Requires admin privileges.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Statistics retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalProducts:
 *                   type: integer
 *                   example: 150
 *                 totalUsers:
 *                   type: integer
 *                   example: 42
 *                 totalValue:
 *                   type: number
 *                   example: 250345.75
 *                 lowStockCount:
 *                   type: integer
 *                   example: 12
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden. Admin access required.
 */
router.get('/stats', verifyToken, isAdmin, analyticsController.getStats);

/**
 * @swagger
 * /api/analytics/top-products:
 *   get:
 *     summary: Get top products by quantity
 *     tags: [Analytics]
 *     description: Retrieves a list of the top 5 products with the highest stock quantity. Requires admin privileges.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Top products retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "Laptop Pro"
 *                   quantity:
 *                     type: integer
 *                     example: 250
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden. Admin access required.
 */
router.get('/top-products', verifyToken, isAdmin, analyticsController.getTopProducts);

module.exports = router;