# Inventory - Full-Stack Inventory Management System

![Swagger API Documentation](https://img.shields.io/badge/API_Docs-Swagger-brightgreen)
![React](https://img.shields.io/badge/React-18-blue)
![Vite](https://img.shields.io/badge/Vite-Fast-yellow)
![Node.js](https://img.shields.io/badge/Node.js-18-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-green)
![Redis](https://img.shields.io/badge/Cache-Redis-red)
![License](https://img.shields.io/badge/License-MIT-blue.svg)

Inventory is a modern, full-stack web application designed for efficient inventory management. It features a secure Node.js backend with a RESTful API and a dynamic, 3D-accelerated React frontend built with Vite and styled with Tailwind CSS.

## Table of Contents

- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Getting Started: A Detailed Guide](#getting-started-a-detailed-guide)
  - [Step 1: Clone the Repository](#step-1-clone-the-repository)
  - [Step 2: Backend Setup (Crucial First Step)](#step-2-backend-setup-crucial-first-step)
  - [Step 3: Frontend Setup](#step-3-frontend-setup)
- [Running the Application](#running-the-application)
- [Accessing the API Documentation](#accessing-the-api-documentation)
- [Environment Variable Configuration In-Depth](#environment-variable-configuration-in-depth)
- [Available Scripts](#available-scripts)

## Key Features

- **Secure Authentication**: JWT-based authentication with password hashing (bcrypt) and HTTP-only cookies.
- **Role-Based Access Control**: Differentiated access for `user` and `admin` roles.
- **Token Blacklisting**: Secure logout mechanism using Redis to blacklist JWTs.
- **Interactive Frontend**: A sleek, responsive UI built with React and Vite, featuring:
  - **3D Background**: Engaging visuals powered by `react-three-fiber`.
  - **Dark Mode**: A modern, animated theme toggle.
  - **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
  - **Client-Side Routing**: Seamless navigation with `react-router-dom`.
- **Comprehensive API**: A well-structured RESTful API for managing products, users, and analytics.
- **Interactive API Docs**: Automatically generated, interactive API documentation with Swagger UI.
- **Admin Dashboard**: A dedicated dashboard for admins to view system analytics and manage users.
- **Product Management**: Full CRUD (Create, Read, Update) functionality for inventory products.

## Technology Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **In-Memory Cache**: Redis (for token blacklisting)
- **Authentication**: JSON Web Tokens (JWT)
- **API Documentation**: Swagger UI & `swagger-jsdoc`
- **Environment Variables**: `dotenv`
- **CORS**: `cors`

### Frontend

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **State Management**: React Context API
- **3D Graphics**: React Three Fiber & Drei
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **UI Components**: Lucide React (Icons), Recharts (Charts), React Hot Toast (Notifications)

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js**: Version 16.x or newer.
- **npm**: Version 8.x or newer (usually comes with Node.js).
- **Git**: For cloning the repository.
- **Access to a MongoDB database**: You can use a local installation or a free cloud instance from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
- **Access to a Redis database**: You can use a local installation or a free cloud instance from [Redis Cloud](https://redis.com/try-free/).

## Getting Started: A Detailed Guide

Follow these steps precisely to get the project running.

### Step 1: Clone the Repository

First, clone the project from GitHub to your local machine.

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

The project contains two main folders: `backend` and `frontend`. We will set up the backend first.

### Step 2: Backend Setup (Crucial First Step)

The backend server must be configured before the frontend can run correctly.

**1. Navigate to the Backend Directory**

```bash
cd backend
```

**2. Install Backend Dependencies**

```bash
npm install
```

**3. Create and Configure the Environment File**

This is the most important part of the setup.

-   In the `backend` directory, you will find a file named `.env.example`. Make a copy of this file and name it `.env`.

    ```bash
    # On macOS / Linux
    cp .env.example .env

    # On Windows
    copy .env.example .env
    ```

-   Now, **open the `.env` file** with your code editor and fill in the values. See the [Environment Variable Configuration In-Depth](#environment-variable-configuration-in-depth) section below for a detailed guide on where to get these values.

    ```ini
    # .env file in the /backend directory

    # Server Port
    PORT=8080

    # MongoDB Connection URI
    MONGODB_URI=your_mongodb_connection_string

    # JWT Configuration
    JWT_SECRET=your_super_secret_jwt_key_that_is_long_and_random

    # Redis Cloud Credentials
    REDIS_PASS=your_redis_cloud_password
    REDIS_HOST=your_redis_cloud_host
    REDIS_PORT=your_redis_cloud_port
    ```

### Step 3: Frontend Setup

Now, let's set up the React frontend. Open a **new terminal window** for this process.

**1. Navigate to the Frontend Directory**

```bash
# Make sure you are in a new terminal, starting from the project's root folder
cd frontend```

**2. Install Frontend Dependencies**

```bash
npm install
```

The frontend is pre-configured in `/src/api/axios.js` to send API requests to `http://localhost:8080/api`. This will work perfectly if you followed the backend setup.

## Running the Application

To run the application, you must have **both servers running at the same time** in two separate terminals.

**Terminal 1: Start the Backend Server**

```bash
# In the /backend directory
npm start
```

You should see the confirmation message: `Server running on port 8080`.
Keep this terminal running.

**Terminal 2: Start the Frontend Development Server**

```bash
# In the /frontend directory
npm run dev
```

Vite will start the frontend server. It will give you a local URL, which is usually `http://localhost:5173`.

**Open your browser and navigate to [http://localhost:5173](http://localhost:5173)** to use the application.

## Accessing the API Documentation

With the backend server running, you can access the live, interactive API documentation generated by Swagger.

-   **URL**: [**http://localhost:8080/api-docs**](http://localhost:8080/api-docs)

This page allows you to see all available endpoints and test them directly.

## Environment Variable Configuration In-Depth

Here’s how to get the values for your `.env` file:

-   **`PORT`**: The port for your backend server. `8080` is a good default.

-   **`MONGODB_URI`**:
    1.  Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free cluster.
    2.  In your cluster dashboard, click "Connect".
    3.  Choose "Connect your application".
    4.  Select "Node.js" as the driver and the latest version.
    5.  Copy the connection string provided. It will look like `mongodb+srv://<user>:<password>@...`.
    6.  **Replace `<password>` with your database user's password.**
    7.  Paste this full string as the value for `MONGODB_URI`.

-   **`JWT_SECRET`**:
    -   This is a secret key used to sign your JSON Web Tokens. It should be a long, random, and unpredictable string. You can generate one using an online tool or by typing a long random phrase.
    -   **Example**: `this-is-a-very-secure-and-long-secret-for-my-jwt-!@#$1234`

-   **`REDIS_PASS`, `REDIS_HOST`, `REDIS_PORT`**:
    1.  Go to [Redis Cloud](https://redis.com/try-free/) and create a free database.
    2.  In your database dashboard, you will find a "Configuration" section.
    3.  The **Public endpoint** is your `REDIS_HOST`. It will look like `redis-12345.cxx.us-east-1-x.ec2.cloud.redns.redis-cloud.com`.
    4.  The port number is part of the endpoint (e.g., `12345`). This is your `REDIS_PORT`.
    5.  The **Default user password** is your `REDIS_PASS`.

## Available Scripts

### Backend (`/backend`)

-   `npm start`: Starts the production server using `node server.js`.
-   `npm run dev`: Starts the server with `nodemon` for automatic restarts during development (if `nodemon` is installed).

### Frontend (`/frontend`)

-   `npm run dev`: Starts the Vite development server with Hot Module Replacement.
-   `npm run build`: Bundles the React application into static files for production.
-
-   `npm run preview`: Serves the production build locally to preview it before deployment.

---
#   I n v e n t o r y  
 #   I n v e n t o r y _ M a n a g e m e n t _ A P P  
 