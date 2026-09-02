const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

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
});

module.exports = mongoose.model("Provider", providerSchema);
