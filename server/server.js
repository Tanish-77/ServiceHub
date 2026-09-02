const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const providerRoutes = require("./routes/providerRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const adminRoutes = require("./routes/adminRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// PROVIDER ROUTES
app.use("/api/providers", providerRoutes);

// BOOKING ROUTES
app.use("/api/bookings", bookingRoutes);

// ADMIN ROUTES
app.use("/api/admin", adminRoutes);

// REVIEW ROUTES
app.use("/api/reviews", reviewRoutes);

// HOME ROUTE
app.get("/", (req, res) => {
  res.json({
    message: "ServiceHub API is running",
  });
});

// SERVER PORT
const PORT = 5000;

// MONGODB CONNECTION
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed:", error.message);
  });
