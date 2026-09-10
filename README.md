# ClientFlow - CRM Application

## Project Overview

ClientFlow is a Customer Relationship Management (CRM) application
developed using the MERN stack.

The application helps users manage customer information efficiently
through a simple and responsive web interface.

## Features

- User Registration
- User Login
- Secure Authentication
- JWT-based Authentication
- Add Customer
- View Customers
- Edit Customer
- Delete Customer
- Search Customers by Name
- Refresh Customer Data
- Logout
- Form Validation
- Error Handling
- Responsive User Interface

## Technology Stack

### Frontend

- React.js
- React Router
- Axios
- Tailwind CSS
- JavaScript
- HTML
- CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt

## Project Structure

```text
ClientFlow
│
├── server
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   ├── config
│   ├── .env
│   ├── app.js
│   └── package.json
│
├── client
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   │   ├── Register.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Customers.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
└── README.md