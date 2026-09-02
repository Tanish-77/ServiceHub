const express = require("express");
const Booking = require("../models/Booking");
const Provider = require("../models/Provider");
const crypto = require("crypto");
const Razorpay = require("razorpay");

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// =========================================
// CREATE BOOKING
// =========================================

router.post("/", async (req, res) => {
  try {
    const {
      providerId,
      providerName,
      service,
      customerName,
      customerPhone,
      phone,
      date,
      time,
    } = req.body;

    // =========================================
    // BASIC VALIDATION
    // =========================================

    if (
      !providerId ||
      !customerName ||
      !customerPhone ||
      !phone ||
      !date ||
      !time
    ) {
      return res.status(400).json({
        message: "Please provide all required booking details.",
      });
    }

    // =========================================
    // VALIDATE CUSTOMER LOGIN PHONE
    // =========================================

    if (!/^[0-9]{10}$/.test(String(customerPhone))) {
      return res.status(400).json({
        message: "Invalid customer login phone number.",
      });
    }

    // =========================================
    // VALIDATE CONTACT PHONE
    // =========================================

    if (!/^[0-9]{10}$/.test(String(phone))) {
      return res.status(400).json({
        message: "Invalid contact phone number.",
      });
    }

    // =========================================
    // CHECK PROVIDER
    // =========================================

    const provider = await Provider.findById(providerId);

    if (!provider) {
      return res.status(404).json({
        message: "Provider not found",
      });
    }

    // =========================================
    // INDIA DATE & TIME
    // =========================================

    const now = new Date();

    const indiaParts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).formatToParts(now);

    const getIndiaPart = (type) => {
      const part = indiaParts.find((item) => item.type === type);

      return part ? part.value : "";
    };

    const currentYear = getIndiaPart("year");
    const currentMonth = getIndiaPart("month");
    const currentDay = getIndiaPart("day");
    const currentHour = getIndiaPart("hour");
    const currentMinute = getIndiaPart("minute");

    const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;

    // =========================================
    // NORMALIZE SELECTED DATE
    // =========================================

    const selectedDate = String(date).split("T")[0];

    // =========================================
    // CHECK DATE FORMAT
    // =========================================

    if (!/^\d{4}-\d{2}-\d{2}$/.test(selectedDate)) {
      return res.status(400).json({
        message: "Invalid booking date.",
      });
    }

    // =========================================
    // CHECK TIME FORMAT
    // =========================================

    if (!/^\d{2}:\d{2}$/.test(time)) {
      return res.status(400).json({
        message: "Invalid booking time.",
      });
    }

    // =========================================
    // CHECK PAST DATE
    // =========================================

    if (selectedDate < currentDate) {
      return res.status(400).json({
        message: "You cannot book a date that has already passed.",
      });
    }

    // =========================================
    // CHECK TODAY'S PAST TIME
    // =========================================

    if (selectedDate === currentDate) {
      const currentTotalMinutes =
        Number(currentHour) * 60 + Number(currentMinute);

      const [bookingHour, bookingMinute] = time.split(":").map(Number);

      const bookingTotalMinutes = bookingHour * 60 + bookingMinute;

      if (bookingTotalMinutes <= currentTotalMinutes) {
        return res.status(400).json({
          message: "You cannot book a time that has already passed.",
        });
      }
    }

    // =========================================
    // CHECK PROVIDER AVAILABILITY
    // =========================================

    if (provider.availability) {
      // =========================================
      // GET BOOKING DAY
      // =========================================

      const [year, month, day] = selectedDate.split("-").map(Number);

      const bookingDate = new Date(year, month - 1, day);

      const dayNames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      const bookingDay = dayNames[bookingDate.getDay()];

      // =========================================
      // CHECK WORKING DAY
      // =========================================

      if (
        provider.availability.days &&
        !provider.availability.days.includes(bookingDay)
      ) {
        return res.status(400).json({
          message: `Provider is not available on ${bookingDay}.`,
        });
      }

      // =========================================
      // CHECK WORKING HOURS
      // =========================================

      const startTime = provider.availability.startTime;

      const endTime = provider.availability.endTime;

      if (startTime && endTime && (time < startTime || time >= endTime)) {
        return res.status(400).json({
          message: `Provider is available between ${startTime} and ${endTime}.`,
        });
      }
    }

    // =========================================
    // CHECK DUPLICATE TIME SLOT
    // =========================================

    const existingBooking = await Booking.findOne({
      providerId: providerId,
      date: selectedDate,
      time: time,

      // Cancelled slot can be booked again
      status: {
        $ne: "Cancelled",
      },
    });

    if (existingBooking) {
      return res.status(409).json({
        message:
          "This time slot is already booked for this provider on this date.",
      });
    }

    // =========================================
    // GET PROVIDER PRICE
    // =========================================

    const amount = Number(provider.price);

    if (!amount || amount <= 0) {
      return res.status(400).json({
        message: "Invalid provider price.",
      });
    }

    // =========================================
    // CREATE BOOKING
    // =========================================

    const booking = new Booking({
      providerId: providerId,

      providerName: providerName || provider.name,

      service: service || provider.service,

      // Person who is logged into ServiceHub
      customerName: customerName.trim(),

      // Customer account/login phone
      customerPhone: String(customerPhone),

      // Contact number for this booking
      phone: String(phone),

      date: selectedDate,

      time: time,

      // Actual service price
      amount: amount,

      status: "Pending",

      paymentStatus: "Pending",
    });

    // =========================================
    // SAVE BOOKING
    // =========================================

    const savedBooking = await booking.save();

    // =========================================
    // CREATE RAZORPAY ORDER
    // =========================================

    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(amount * 100),

      currency: "INR",

      receipt: `booking_${savedBooking._id}`,

      notes: {
        bookingId: savedBooking._id.toString(),

        customerName: customerName,

        customerPhone: customerPhone,

        contactPhone: phone,

        service: savedBooking.service,
      },
    });

    // =========================================
    // SAVE RAZORPAY ORDER ID
    // =========================================

    savedBooking.razorpayOrderId = razorpayOrder.id;

    await savedBooking.save();

    // =========================================
    // RESPONSE
    // =========================================

    res.status(201).json({
      message: "Booking created successfully",

      booking: savedBooking,

      razorpayOrder: {
        id: razorpayOrder.id,

        amount: razorpayOrder.amount,

        currency: razorpayOrder.currency,
      },

      razorpayKey: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.log("Booking Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// =========================================
// GET BOOKINGS
// =========================================

router.get("/", async (req, res) => {
  try {
    const { phone, customerPhone } = req.query;

    // =========================================
    // GET CUSTOMER BOOKINGS
    // =========================================

    if (customerPhone) {
      const bookings = await Booking.find({
        customerPhone: customerPhone,
      }).sort({
        createdAt: -1,
      });

      return res.json(bookings);
    }

    // =========================================
    // OLD PHONE SEARCH
    // =========================================
    // Kept for compatibility with old bookings.
    // New customer portal will use customerPhone.

    if (phone) {
      const bookings = await Booking.find({
        phone: phone,
      }).sort({
        createdAt: -1,
      });

      return res.json(bookings);
    }

    // =========================================
    // GET ALL BOOKINGS
    // =========================================

    const bookings = await Booking.find().sort({
      createdAt: -1,
    });

    res.json(bookings);
  } catch (error) {
    console.log("Get Bookings Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// =========================================
// CANCEL BOOKING
// =========================================

router.put("/:id/cancel", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    // =========================================
    // BOOKING NOT FOUND
    // =========================================

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    // =========================================
    // ALREADY CANCELLED
    // =========================================

    if (booking.status === "Cancelled") {
      return res.status(400).json({
        message: "Booking is already cancelled",
      });
    }

    // =========================================
    // CANCEL BOOKING
    // =========================================

    booking.status = "Cancelled";

    const updatedBooking = await booking.save();

    res.json({
      message: "Booking cancelled successfully",

      booking: updatedBooking,
    });
  } catch (error) {
    console.log("Cancel Booking Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// =========================================
// UPDATE BOOKING STATUS
// =========================================

router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = ["Pending", "Confirmed", "Completed", "Cancelled"];

    // =========================================
    // CHECK VALID STATUS
    // =========================================

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid booking status",
      });
    }

    // =========================================
    // FIND BOOKING
    // =========================================

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    // =========================================
    // UPDATE STATUS
    // =========================================

    booking.status = status;

    const updatedBooking = await booking.save();

    res.json({
      message: "Booking status updated successfully",

      booking: updatedBooking,
    });
  } catch (error) {
    console.log("Update Status Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// =========================================
// VERIFY RAZORPAY PAYMENT
// =========================================

router.post("/payment/verify", async (req, res) => {
  try {
    const { bookingId, razorpay_payment_id, razorpay_signature } = req.body;

    // =========================================
    // VALIDATION
    // =========================================

    if (!bookingId || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        message: "Payment verification details are missing.",
      });
    }

    // =========================================
    // FIND BOOKING
    // =========================================

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found.",
      });
    }

    // =========================================
    // ALREADY PAID
    // =========================================

    if (booking.paymentStatus === "Paid") {
      return res.status(400).json({
        message: "Payment already verified.",
      });
    }

    // =========================================
    // GENERATE SIGNATURE
    // =========================================

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${booking.razorpayOrderId}|${razorpay_payment_id}`)
      .digest("hex");

    const isValid = generatedSignature === razorpay_signature;

    // =========================================
    // INVALID PAYMENT
    // =========================================

    if (!isValid) {
      booking.paymentStatus = "Failed";

      await booking.save();

      return res.status(400).json({
        message: "Payment verification failed.",
      });
    }

    // =========================================
    // PAYMENT SUCCESS
    // =========================================

    booking.paymentStatus = "Paid";

    booking.razorpayPaymentId = razorpay_payment_id;

    booking.razorpaySignature = razorpay_signature;

    await booking.save();

    res.json({
      message: "Payment verified successfully.",

      booking,
    });
  } catch (error) {
    console.log("Payment Verification Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
