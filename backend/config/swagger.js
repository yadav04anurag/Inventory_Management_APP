// config/swagger.js

const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  // 1. Define the top-level information about your API
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Inventory Management API',
      version: '1.0.0',
      description: 'A comprehensive API for managing products, users, and analytics for an inventory system. Built with Node.js, Express, MongoDB, and Redis.',
      contact: {
        name: 'API Support',
        url: 'http://www.example.com/support',
        email: 'support@example.com',
      },
    },
    // 2. Define tags for grouping your endpoints
    tags: [
      {
        name: 'Auth',
        description: 'Endpoints for user authentication (register, login, logout, profile).'
      },
      {
        name: 'Products',
        description: 'Endpoints for creating, retrieving, and managing products.'
      },
      {
        name: 'Analytics',
        description: 'Endpoints for retrieving system statistics and analytics.'
      }
    ],
    // 3. Define the security scheme for JWT
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter JWT token in the format: Bearer {token}'
        }
      },
      // 4. Define reusable data models (schemas)
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Auto-generated user ID.',
              example: '60c72b2f9b1d8c001f8e4d2a'
            },
            username: {
              type: 'string',
              description: 'The user\'s unique username.',
              example: 'johndoe'
            },
            role: {
              type: 'string',
              description: 'The user\'s role.',
              enum: ['admin', 'user'],
              example: 'user'
            }
          }
        },
        Product: {
          type: 'object',
          required: ['name', 'type', 'sku', 'quantity', 'price'],
          properties: {
            _id: {
              type: 'string',
              description: 'Auto-generated product ID.',
              example: '60c72b2f9b1d8c001f8e4d2b'
            },
            name: {
              type: 'string',
              description: 'Name of the product.',
              example: 'Laptop Pro'
            },
            type: {
              type: 'string',
              description: 'Category of the product.',
              example: 'Electronics'
            },
            sku: {
              type: 'string',
              description: 'Unique Stock Keeping Unit.',
              example: 'LP-2025-01'
            },
            image_url: {
              type: 'string',
              description: 'URL of the product image.',
              example: 'http://example.com/image.png'
            },
            description: {
              type: 'string',
              description: 'Detailed description of the product.',
              example: 'A high-performance laptop for professionals.'
            },
            quantity: {
              type: 'number',
              description: 'Number of items in stock.',
              example: 50
            },
            price: {
              type: 'number',
              description: 'Price per unit.',
              example: 1299.99
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'The date the product was added.'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'A message describing the error.',
              example: 'Invalid credentials'
            }
          }
        }
      }
    },
    // Add a global security definition
    security: [
      {
        BearerAuth: []
      }
    ]
  },
  // 5. Define the path to the files where your endpoint comments are written
  apis: ['./routes/*.js'],
};

// Generate the final Swagger specification
module.exports = swaggerJSDoc(options);