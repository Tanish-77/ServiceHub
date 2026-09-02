const express = require("express");
const Admin = require("../models/Admin");

const router = express.Router();

// =========================================
// ADMIN LOGIN
// =========================================

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const admin = await Admin.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!admin) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    if (admin.password !== password) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    res.json({
      message: "Login successful",
      admin: {
        id: admin._id,
        email: admin.email,
      },
    });
  } catch (error) {
    console.log("Admin Login Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
