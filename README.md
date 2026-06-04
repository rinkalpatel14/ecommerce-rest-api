# 🛒 E-Commerce REST API

A RESTful E-Commerce Backend API built using Node.js, Express.js, and MongoDB following MVC Architecture.

## 🚀 Features

### Authentication

* User Registration
* User Login
* OTP Verification
* JWT Authentication
* Password Hashing using Bcrypt
* Protected Routes using Middleware

### User Management

* Get All Users
* Get Single User
* Update User
* Delete User
* Profile Image Upload

### Category Management

* Create Category
* Get All Categories
* Get Single Category
* Update Category
* Delete Category

### Product Management

* Create Product
* Get All Products
* Get Single Product
* Update Product
* Delete Product
* Multiple Image Upload using Multer

### Cart Management

* Add Product to Cart
* Get All Cart Data
* Get Single Cart Data
* Update Cart
* Delete Cart

### Email Integration

* Registration Success Email
* OTP Verification Email
* Nodemailer Integration

### Database Features

* MongoDB Populate
* MongoDB Aggregation Pipeline
* Category Wise Product Count

---

## 🛠️ Technologies Used

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* Bcrypt
* Nodemailer
* Multer
* Postman

---

## 📁 Project Structure

```text
ECOMMERCE-REST-API
│
├── controller
├── middleware
├── model
├── routes
├── public
├── views
├── app.js
├── package.json
└── README.md
```

---

## 📊 Aggregation Example

Category Wise Product Count

```javascript
{
  $group: {
    _id: "$category_Id",
    totalProducts: { $sum: 1 }
  }
}
```

---

## 🧪 API Testing

All APIs have been tested using Postman.

---

## 👨‍💻 Developer

Rinkal Patel

GitHub: https://github.com/rinkalpatel14
