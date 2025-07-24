require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');
const { connectDB } = require('./config/db');
const redisClient = require('./config/redis');
const swaggerSpec = require('./config/swagger');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const errorHandler = require('./middlewares/error');
const cors = require('cors')
const app = express();

// Connect to MongoDB
connectDB();

// cores issue 

app.use(cors({
  origin: ['http://localhost:5173'],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true
}));


// Connect to Redis
redisClient.connect()

// Middleware
app.use(express.json());
app.use(cookieParser());

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/analytics', analyticsRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));