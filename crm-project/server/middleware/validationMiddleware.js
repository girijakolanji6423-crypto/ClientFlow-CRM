const validateCustomer = (req, res, next) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({
      message: "Name, email and phone are required",
    });
  }

  if (!email.includes("@")) {
    return res.status(400).json({
      message: "Please enter a valid email",
    });
  }

  next();
};

module.exports = validateCustomer;