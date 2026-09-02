const express = require("express");
const Provider = require("../models/Provider");

const router = express.Router();

// ADD PROVIDER http://localhost:5000/api/providers
router.post("/", async (req, res) => {
  try {
    const provider = new Provider({
      name: req.body.name,
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

// GET ALL PROVIDERS http://localhost:5000/api/providers
router.get("/", async (req, res) => {
  try {
    const providers = await Provider.find();

    res.json(providers);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// UPDATE PROVIDER  put http://localhost:5000/api/providers/6a8c3d2bcfb272b9392b4a7f
router.put("/:id", async (req, res) => {
  try {
    const provider = await Provider.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

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

// DELETE PROVIDER     DELETE http://localhost:5000/api/providers/6a8c3d2bcfb272b9392b4a7f
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
