
# E-Commerce Backend System

Welcome to the **E-Commerce Backend System** repository! This project provides the backend APIs required for a fully functional e-commerce platform. It includes user authentication, product management, simulated payment processing using Stripe, robust error handling, and integration with Grafana for monitoring.

---

## 📑 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [File Structure](#file-structure)
- [Database Schema](#database-schema)
- [Testing](#testing)
- [Technologies Used](#technologies-used)
- [Future Enhancements](#future-enhancements)

---

## 🛠️ Overview

This backend system is designed for an e-commerce platform and provides a RESTful API to handle various functionalities like user management, product cataloging, order processing, and analytics. It is developed as a collaborative project between backend and frontend teams. The system also includes integration with **Grafana** for real-time monitoring and visualization.

---

## 🌟 Features

- **Authentication**: Secure JWT-based authentication with roles (Admin and User).
- **Product Management**: CRUD operations for products, categories, and brands.
- **Simulated Payments**: Payment processing using **Stripe** with transaction history.
- **Error Handling**: Robust error-handling mechanism with status codes.
- **Admin Analytics**:
  - Most and least bought products.
  - Products per geographical region.
- **Security**: Includes HTTPS, input validation, and sanitization using Express Validator. And secure password storage using 'bcrypt' hashing.
- **Unit Testing**: Implemented with Jest for controllers, models, and middleware. Includes critical tests running for PRs (health and models) and all tests running for merge and deployment (controllers and routes), using GitHub Actions workflows.
- **File Uploads**: Supports product image uploads using Multer. And storage in Firebase.
- **Dockerization**: Dockerfile and docker-compose for containerized deployment.
- **Monitoring**: Integrated with **Grafana** for real-time analytics and monitoring.
- **Documentation**: API documentation generated using Swagger.
- **Logging**: Integrated logging for tracking errors, user activities, and system behavior. Using Winston.
- **Deployment**: The server was deployed to Render, and the MyQSL database was deployed to Aiven.


---

## 🚀 Installation

### Prerequisites
- Node.js
- MySQL
- Git
- Docker 
- Stripe account (for payment processing)
- Grafana (for monitoring and visualization)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/SD-0924/backend-final-1
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and configure the following variables:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=password
   DB_NAME=ecommerce
   STRIPE_SECRET_KEY=your-stripe-secret-key
   GRAFANA_API_URL=your-grafana-url
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

---

## 📖 Usage

The deployed backend system is accessible via:

- **Live API**: [https://backend-final-1-1-bkpd.onrender.com](https://backend-final-1-1-bkpd.onrender.com)
- **API Documentation**: [https://backend-final-1-1-bkpd.onrender.com/api-docs](https://backend-final-1-1-bkpd.onrender.com/api-docs)

---

## 📂 File Structure

```plaintext
.
├── api
│   ├── config/
│   ├── controllers/
│   ├── middleware/
|   ├── routes/
|   ├── services/
|   ├── utils/
|   ├── repository/
|   ├── validation/
│   └── models/
├── tests
├── .github
│   └── workflows
│       └── nodejs.yml
├── .env
└── README.md
```

---

## 🗂️ Database Schema

![ERD](https://github.com/user-attachments/assets/26638920-e3d7-4fb4-a116-813df7b22686)


---

## 🧪 Testing

The project uses Jest for testing. Here are the available test scripts:

- **Health Test**:
  ```bash
  npm run test:health
  ```

- **Model Tests**:
  ```bash
  npm run test:models
  ```

- **Controller Tests**:
  ```bash
  npm run test:controllers
  ```

- **All Tests**:
  ```bash
  npm run test:all
  ```

The `test:all` script runs all tests with coverage, while `test:models`, `test:controllers`, and `test:health` run specific tests.

---

## 🛠️ Technologies Used

- **Node.js**: JavaScript runtime.
- **Express.js**: Web framework.
- **MySQL**: Database.
- **Stripe**: Payment processing.
- **JWT**: Authentication.
- **Swagger**: API documentation.
- **Jest**: Testing.
- **Grafana**: Monitoring and visualization.

---

## 🔮 Future Enhancements

- Integration of real-time chat support for customers.
- Advanced analytics features, such as customer behavior tracking.
- Implement machine learning for product recommendations.

