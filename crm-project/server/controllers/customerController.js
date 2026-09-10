const Customer = require("../models/Customer");

// Add Customer
const createCustomer = async (req, res) => {
  try {
    const { name, email, phone, company, address } = req.body;

    const customer = await Customer.create({
      name,
      email,
      phone,
      company,
      address,
    });

    res.status(201).json({
      message: "Customer created successfully",
      customer,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create customer",
      error: error.message,
    });
  }
};

// Get All Customers
const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();

    res.status(200).json({
      customers,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch customers",
      error: error.message,
    });
  }
};

// Update Customer
const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const customer = await Customer.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    res.status(200).json({
      message: "Customer updated successfully",
      customer,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update customer",
      error: error.message,
    });
  }
};

// Delete Customer
const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const customer = await Customer.findByIdAndDelete(id);

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    res.status(200).json({
      message: "Customer deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete customer",
      error: error.message,
    });
  }
};

module.exports = {
  createCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer,
};