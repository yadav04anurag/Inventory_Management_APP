# Inventory - Full-Stack Inventory Management System

![React](https://img.shields.io/badge/React-18-blue) 
![Vite](https://img.shields.io/badge/Vite-Fast-yellow) 
![Node.js](https://img.shields.io/badge/Node.js-18-green) 
![MongoDB](https://img.shields.io/badge/Database-MongoDB-green) 
![Redis](https://img.shields.io/badge/Cache-Redis-red) 
![Docker](https://img.shields.io/badge/Docker-Ready-blue) 
![License](https://img.shields.io/badge/License-MIT-blue.svg)

A modern full-stack inventory management application featuring a secure Node.js API and dynamic 3D React frontend.

![Inventory Management System](https://via.placeholder.com/800x400?text=Inventory+Management+Screenshot)

## Table of Contents
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Docker Installation (Recommended)](#docker-installation-recommended)
- [Local Installation](#local-installation-and-setup)
- [Environment Variables](#environment-variable-setup)
- [API Endpoints](#api-endpoints-guide)
- [API Documentation](#accessing-the-api-documentation)
- [License](#license)

## Technology Stack

### Backend
- Node.js, Express, MongoDB, Mongoose
- Redis (caching), JWT (authentication)
- Swagger (API documentation)

### Frontend
- React, Vite, Tailwind CSS
- React Router, Axios, Framer Motion
- React Three Fiber (3D visualization)

### Infrastructure
- Docker, Docker Compose

## Prerequisites
- Node.js (≥ v16.x)
- npm (≥ v8.x)
- Git
- MongoDB access
- Redis access
- Docker & Docker Compose (for containerized setup)

## Docker Installation (Recommended)

### 1. Configure Environment Variables
```bash
cd backend
cp .env.example .env
Edit .env with your credentials (see Environment Variables)

2. Start Containers
bash
docker-compose up --build -d
3. Access Services
Service	URL
Frontend Application	http://localhost:5173
Backend API	http://localhost:8080
API Documentation	http://localhost:8080/api-docs
Stop services with: docker-compose down

Local Installation and Setup
1. Clone Repository
bash
git clone https://github.com/your-username/Inventory_Management_APP.git
cd inventory3d
2. Backend Setup
bash
cd backend
npm install
cp .env.example .env  # Configure with your credentials
3. Frontend Setup
bash
cd ../frontend
npm install
4. Run Application
Terminal 1 (Backend):

bash
cd backend
npm start  # http://localhost:8080
Terminal 2 (Frontend):

bash
cd frontend
npm run dev  # http://localhost:5173
Environment Variable Setup
Create .env in /backend with:

ini
PORT=8080
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
REDIS_PASS=your_redis_cloud_password
REDIS_HOST=your_redis_cloud_host
REDIS_PORT=your_redis_cloud_port
API Endpoints Guide
Auth Endpoints
Method	Endpoint	Description	Access
POST	/api/auth/register	Register new user	Public
POST	/api/auth/login	User login	Public
POST	/api/auth/logout	User logout	User
GET	/api/auth/profile	Get user profile	User
POST	/api/auth/admin/register	Register admin	Admin Only
DELETE	/api/auth/delete	Delete user	User
Product Endpoints
Method	Endpoint	Description	Access
POST	/api/products	Add new product	User
GET	/api/products	Get paginated products	User
GET	/api/products/:id	Get product by ID	User
PUT	/api/products/:id/quantity	Update product quantity	User
Analytics Endpoints
Method	Endpoint	Description	Access
GET	/api/analytics/stats	System statistics	Admin Only
GET	/api/analytics/top-products	Top 5 products	Admin Only
Accessing the API Documentation
After starting the backend, access interactive Swagger docs at:
http://localhost:8080/api-docs

License
Distributed under the MIT License. See LICENSE for more information.