const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Provider",
      required: true,
    },

    providerName: {
      type: String,
      required: true,
    },

    service: {
      type: String,
      required: true,
    },

    customerName: {
      type: String,
      required: true,
    },
    // Customer account/login phone
    customerPhone: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    // =========================================
    // BOOKING STATUS
    // =========================================

    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
      default: "Pending",
    },

    // =========================================
    // BOOKING AMOUNT
    // =========================================

    amount: {
      type: Number,
      default: 0,
    },

    // =========================================
    // PAYMENT STATUS
    // =========================================

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },

    // =========================================
    // RAZORPAY DETAILS
    // =========================================

    razorpayOrderId: {
      type: String,
      default: null,
    },

    razorpayPaymentId: {
      type: String,
      default: null,
    },

    razorpaySignature: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Booking", bookingSchema);
