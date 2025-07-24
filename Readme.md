# Inventory - Full-Stack Inventory Management System

![React](https://img.shields.io/badge/React-18-blue)
![Vite](https://img.shields.io/badge/Vite-Fast-yellow)
![Node.js](https://img.shields.io/badge/Node.js-18-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-green)
![Redis](https://img.shields.io/badge/Cache-Redis-red)
![License](https://img.shields.io/badge/License-MIT-blue.svg)

A modern, full-stack inventory management application featuring a secure Node.js API and a dynamic 3D React frontend.

## Table of Contents

- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Local Installation and Setup](#local-installation-and-setup)
- [Environment Variable Setup](#environment-variable-setup)
- [API Endpoints Guide](#api-endpoints-guide)
- [Accessing the API Documentation](#accessing-the-api-documentation)

## Technology Stack

- **Backend**: Node.js, Express, MongoDB, Mongoose, Redis, JWT, Swagger
- **Frontend**: React, Vite, Tailwind CSS, React Router, Axios, Framer Motion, React Three Fiber

## Prerequisites

- Node.js (v16.x or newer)
- npm (v8.x or newer)
- Git
- Access to a MongoDB database
- Access to a Redis database

## Local Installation and Setup

Follow these steps to get the project running locally.

**1. Clone the Repository**
```bash
git clone https://github.com/your-username/Inventory_Management_APP.git
cd inventory3d
```

**2. Set Up the Backend**
```bash
# Navigate to the backend folder
cd backend

# Install dependencies
npm install

# Create the .env file from the example
cp .env.example .env
```
Now, **open the `.env` file** and add your credentials as described in the next section.

**3. Set Up the Frontend**
Open a **new terminal window** for this step.
```bash
# From the project root directory
cd frontend

# Install dependencies
npm install
```

**4. Run the Application**
You need two terminals running concurrently.

- **Terminal 1 (Backend):**
  ```bash
  # In the /backend directory
  npm start
  ```
  *Server will run on `http://localhost:8080`.*

- **Terminal 2 (Frontend):**
  ```bash
  # In the /frontend directory
  npm run dev
  ```
  *Application will be available at `http://localhost:5173`.*

## Environment Variable Setup

You must create a `.env` file in the `/backend` directory. Add the following variables:

```ini
# .env file in /backend

# Server Port
PORT=8080

# MongoDB Connection URI (from MongoDB Atlas)
MONGODB_URI=your_mongodb_connection_string

# JWT Secret Key (generate a long, random string)
JWT_SECRET=your_super_secret_jwt_key

# Redis Credentials (from Redis Cloud)
REDIS_PASS=your_redis_cloud_password
REDIS_HOST=your_redis_cloud_host
REDIS_PORT=your_redis_cloud_port
```

## API Endpoints Guide

Here is a quick reference for all available API endpoints.

### Auth Endpoints
| Method | Endpoint                    | Description                  | Access       |
| :----- | :-------------------------- | :--------------------------- | :----------- |
| `POST` | `/api/auth/register`        | Register a new user          | Public       |
| `POST` | `/api/auth/login`           | Log in a user                | Public       |
| `POST` | `/api/auth/logout`          | Log out a user               | User         |
| `GET`  | `/api/auth/profile`         | Get current user's profile   | User         |
| `POST` | `/api/auth/admin/register`  | Register a new admin         | Admin Only   |
| `DELETE`| `/api/auth/delete`          | Delete the current user      | User         |

### Product Endpoints
| Method | Endpoint                    | Description                  | Access       |
| :----- | :-------------------------- | :--------------------------- | :----------- |
| `POST` | `/api/products`             | Add a new product            | User         |
| `GET`  | `/api/products`             | Get a paginated list of products | User         |
| `GET`  | `/api/products/:id`         | Get a single product by ID   | User         |
| `PUT`  | `/api/products/:id/quantity`| Update a product's quantity  | User         |

### Analytics Endpoints
| Method | Endpoint                     | Description                  | Access       |
| :----- | :--------------------------- | :--------------------------- | :----------- |
| `GET`  | `/api/analytics/stats`       | Get system-wide statistics   | Admin Only   |
| `GET`  | `/api/analytics/top-products`| Get top 5 products by quantity | Admin Only   |


## Accessing the API Documentation

For a detailed, interactive API guide, visit the Swagger documentation page once the backend server is running:

- **[http://localhost:8080/api-docs](http://localhost:8080/api-docs)**

---
_Inventory - A Modern Inventory Management Solution_
