const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken, isAdmin } = require('../middlewares/auth');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication and management
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     description: Creates a new standard user account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: newuser
 *               password:
 *                 type: string
 *                 description: Must be a strong password.
 *                 example: StrongP@ssw0rd!
 *     responses:
 *       201:
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input (e.g., weak password).
 *       409:
 *         description: Username already exists.
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     description: Authenticates a user and returns a JWT in an HTTP-only cookie.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: newuser
 *               password:
 *                 type: string
 *                 example: StrongP@ssw0rd!
 *     responses:
 *       200:
 *         description: Login successful.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Invalid credentials.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Log out a user
 *     tags: [Auth]
 *     description: Clears the user's session cookie and blacklists the token in Redis.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful.
 *       400:
 *         description: No active session.
 */
router.post('/logout', verifyToken, authController.logout);

/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     summary: Get current user's profile
 *     tags: [Auth]
 *     description: Retrieves the profile information of the currently authenticated user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: User not found.
 */
router.get('/profile', verifyToken, authController.getProfile);

/**
 * @swagger
 * /api/auth/admin/register:
 *   post:
 *     summary: Register a new admin (Admin only)
 *     tags: [Auth]
 *     description: Creates a new admin account. Requires an admin's JWT.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: newadmin
 *               password:
 *                 type: string
 *                 example: VeryStr0ngP@ss!
 *     responses:
 *       201:
 *         description: Admin created successfully.
 *       403:
 *         description: Forbidden. Only admins can perform this action.
 */
router.post('/admin/register', verifyToken, isAdmin, authController.adminRegister);

/**
 * @swagger
 * /api/auth/delete:
 *   delete:
 *     summary: Delete user profile
 *     tags: [Auth]
 *     description: Deletes the profile of the currently authenticated user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Profile deleted successfully.
 *       500:
 *         description: Deletion failed.
 */
router.delete('/delete', verifyToken, authController.deleteProfile);

module.exports = router;