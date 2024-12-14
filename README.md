
# E-Commerce Backend System

Welcome to the **E-Commerce Backend System** repository! This project provides the backend APIs required for a fully functional e-commerce platform. It includes user authentication, product management, simulated payment processing, and robust error handling.

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

This backend system is designed for an e-commerce platform and provides a RESTful API to handle various functionalities like user management, product cataloging, order processing, and analytics. It is developed as a collaborative project between backend and frontend teams.

---

## 🌟 Features

- **Authentication**: Secure JWT-based authentication with roles (Admin and User).
- **Product Management**: CRUD operations for products, categories, and brands.
- **Simulated Payments**: Dummy payment system with transaction history.
- **Error Handling**: Robust error-handling mechanism with status codes.
- **Admin Analytics**:
  - Most and least bought products.
  - Products per geographical region.
- **Security**: Includes HTTPS, input validation, and sanitization.
- **Documentation**: API documentation generated using Swagger.

---

## 🚀 Installation

### Prerequisites
- Node.js
- MySQL
- Git
- Docker 

### Steps

1. Clone the repository:
   

2. Install dependencies:
  

3. Create a `.env` file in the root directory and configure the following variables:
   

4. Run the development server:
  

---

## 📖 Usage

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
|   ├── reposetory/
|   ├── valedation/
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

![ERD](https://github.com/user-attachments/assets/5346ba61-e2ba-4d47-a36a-99979ea6d429)

---

## 🧪 Testing


---

## 🛠️ Technologies Used

- **Node.js**: JavaScript runtime.
- **Express.js**: Web framework.
- **MongoDB**: Database.
- **JWT**: Authentication.
- **Swagger**: API documentation.
- **Jest**: Testing.

---

## 🔮 Future Enhancements






