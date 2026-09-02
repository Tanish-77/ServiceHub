const express = require("express");
const router = express.Router();

const Review = require("../models/Review");
const Booking = require("../models/Booking");
const Provider = require("../models/Provider");

// =========================================
// CREATE REVIEW
// =========================================

router.post("/", async (req, res) => {
  try {
    const { providerId, bookingId, customerName, rating, comment } = req.body;

    // Check booking
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    // Only completed booking can be reviewed
    if (booking.status !== "Completed") {
      return res.status(400).json({
        message: "You can review only completed bookings.",
      });
    }

    // Prevent duplicate review
    const existingReview = await Review.findOne({
      bookingId,
    });

    if (existingReview) {
      return res.status(400).json({
        message: "You have already reviewed this booking.",
      });
    }

    // =========================================
    // CREATE REVIEW
    // =========================================

    const review = await Review.create({
      providerId,
      bookingId,
      customerName,
      rating,
      comment,
    });

    // =========================================
    // UPDATE PROVIDER RATING
    // =========================================

    const allReviews = await Review.find({
      providerId: providerId,
    });

    const totalRating = allReviews.reduce(
      (sum, review) => sum + review.rating,
      0,
    );

    const averageRating = totalRating / allReviews.length;

    // Round to 2 decimal places
    const finalRating = Math.round(averageRating * 100) / 100;

    // Update provider
    await Provider.findByIdAndUpdate(providerId, {
      rating: finalRating,
    });

    // =========================================
    // RESPONSE
    // =========================================

    res.status(201).json({
      message: "Review submitted successfully!",
      review,
      rating: finalRating,
    });
  } catch (error) {
    console.error("Review Error:", error);

    res.status(500).json({
      message: "Failed to submit review",
    });
  }
});

// =========================================
// GET PROVIDER REVIEWS
// =========================================

router.get("/provider/:providerId", async (req, res) => {
  try {
    const reviews = await Review.find({
      providerId: req.params.providerId,
    }).sort({
      createdAt: -1,
    });

    res.json(reviews);
  } catch (error) {
    console.error("Fetch Reviews Error:", error);

    res.status(500).json({
      message: "Failed to fetch reviews",
    });
  }
});

module.exports = router;
