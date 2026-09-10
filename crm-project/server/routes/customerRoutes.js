const express = require("express");

const {
  createCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customerController");

const protect = require("../middleware/authMiddleware");
const validateCustomer = require("../middleware/validationMiddleware");

const router = express.Router();

// Create Customer
router.post("/", protect, validateCustomer, createCustomer);

// Get All Customers
router.get("/", protect, getCustomers);

// Update Customer
router.put("/:id", protect, validateCustomer, updateCustomer);

// Delete Customer
router.delete("/:id", protect, deleteCustomer);

module.exports = router;