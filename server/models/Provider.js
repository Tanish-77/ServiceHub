const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema(
  {
    // =========================================
    // PROVIDER BASIC DETAILS
    // =========================================

    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    // =========================================
    // SERVICE DETAILS
    // =========================================

    service: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    rating: {
      type: Number,
      default: 0,
    },

    experience: {
      type: Number,
      default: 0,
    },

    // =========================================
    // PROVIDER AVAILABILITY
    // =========================================

    availability: {
      days: {
        type: [String],

        default: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      },

      startTime: {
        type: String,
        default: "09:00",
      },

      endTime: {
        type: String,
        default: "18:00",
      },
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Provider", providerSchema);
