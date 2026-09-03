const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Customer = require("../models/Customer");

const router = express.Router();

// =========================================
// CUSTOMER REGISTER
// POST /api/customers/register
// =========================================

router.post("/register", async (req, res) => {
  try {
    const { name, phone, email, password, confirmPassword } = req.body;

    // =========================================
    // VALIDATION
    // =========================================

    if (!name || !phone || !email || !password || !confirmPassword) {
      return res.status(400).json({
        message: "Please fill all required fields.",
      });
    }

    if (!/^[0-9]{10}$/.test(String(phone))) {
      return res.status(400).json({
        message: "Please enter a valid 10-digit phone number.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters.",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match.",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // =========================================
    // CHECK EXISTING CUSTOMER
    // =========================================

    const existingCustomer = await Customer.findOne({
      $or: [{ email: normalizedEmail }, { phone: String(phone) }],
    });

    if (existingCustomer) {
      return res.status(409).json({
        message: "Customer with this email or phone already exists.",
      });
    }

    // =========================================
    // HASH PASSWORD
    // =========================================

    const hashedPassword = await bcrypt.hash(password, 10);

    // =========================================
    // CREATE CUSTOMER
    // =========================================

    const customer = new Customer({
      name: name.trim(),
      phone: String(phone),
      email: normalizedEmail,
      password: hashedPassword,
    });

    await customer.save();

    res.status(201).json({
      message: "Customer registered successfully.",
    });
  } catch (error) {
    console.log("Customer Register Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// =========================================
// CUSTOMER LOGIN
// POST /api/customers/login
// =========================================

router.post("/login", async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;

    if (!emailOrPhone || !password) {
      return res.status(400).json({
        message: "Please enter email/phone and password.",
      });
    }

    const loginValue = String(emailOrPhone).trim();

    const customer = await Customer.findOne({
      $or: [
        {
          email: loginValue.toLowerCase(),
        },
        {
          phone: loginValue,
        },
      ],
    });

    if (!customer) {
      return res.status(401).json({
        message: "Invalid email/phone or password.",
      });
    }

    // =========================================
    // CHECK PASSWORD
    // =========================================

    const isPasswordCorrect = await bcrypt.compare(password, customer.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email/phone or password.",
      });
    }

    // =========================================
    // CREATE JWT
    // =========================================

    const token = jwt.sign(
      {
        id: customer._id,
        role: "customer",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.json({
      message: "Login successful.",

      token,

      customer: {
        id: customer._id,
        name: customer.name,
        phone: customer.phone,
        email: customer.email,
      },
    });
  } catch (error) {
    console.log("Customer Login Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
