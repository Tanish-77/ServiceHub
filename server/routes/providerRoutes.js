const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Provider = require("../models/Provider");

const router = express.Router();

// =========================
// PROVIDER REGISTER
// =========================
router.post("/register", async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      password,
      confirmPassword,
      service,
      location,
      price,
      experience,
    } = req.body;

    if (
      !name ||
      !phone ||
      !email ||
      !password ||
      !confirmPassword ||
      !service ||
      !location ||
      price === undefined
    ) {
      return res.status(400).json({
        message: "All required fields are required",
      });
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({
        message: "Phone number must be 10 digits",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const existingProvider = await Provider.findOne({
      $or: [{ email: email.toLowerCase().trim() }, { phone }],
    });

    if (existingProvider) {
      return res.status(400).json({
        message: "Email or phone number already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const provider = new Provider({
      name: name.trim(),
      phone,
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      service: service.trim(),
      location: location.trim(),
      price: Number(price),
      experience: Number(experience) || 0,
    });

    await provider.save();

    res.status(201).json({
      message: "Provider registered successfully",
    });
  } catch (error) {
    console.error("Provider registration error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// =========================
// PROVIDER LOGIN
// =========================
router.post("/login", async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;

    if (!emailOrPhone || !password) {
      return res.status(400).json({
        message: "Email/Phone and password are required",
      });
    }

    const provider = await Provider.findOne({
      $or: [
        { email: emailOrPhone.toLowerCase().trim() },
        { phone: emailOrPhone.trim() },
      ],
    });

    if (!provider) {
      return res.status(401).json({
        message: "Invalid email/phone or password",
      });
    }

    const passwordMatch = await bcrypt.compare(password, provider.password);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email/phone or password",
      });
    }

    const token = jwt.sign(
      {
        id: provider._id,
        role: "provider",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.json({
      message: "Login successful",
      token,
      provider: {
        id: provider._id,
        name: provider.name,
        phone: provider.phone,
        email: provider.email,
      },
    });
  } catch (error) {
    console.error("Provider login error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// =========================
// GET ALL PROVIDERS
// =========================
router.get("/", async (req, res) => {
  try {
    const providers = await Provider.find().select("-password");

    res.json(providers);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// =========================
// ADD PROVIDER
// =========================
router.post("/", async (req, res) => {
  try {
    const provider = new Provider({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
      service: req.body.service,
      location: req.body.location,
      price: req.body.price,
      rating: req.body.rating,
      experience: req.body.experience,
    });

    const savedProvider = await provider.save();

    res.status(201).json(savedProvider);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// =========================
// UPDATE PROVIDER
// =========================
router.put("/:id", async (req, res) => {
  try {
    const provider = await Provider.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!provider) {
      return res.status(404).json({
        message: "Provider not found",
      });
    }

    res.json(provider);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// =========================
// DELETE PROVIDER
// =========================
router.delete("/:id", async (req, res) => {
  try {
    const provider = await Provider.findByIdAndDelete(req.params.id);

    if (!provider) {
      return res.status(404).json({
        message: "Provider not found",
      });
    }

    res.json({
      message: "Provider deleted successfully",
      provider,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
