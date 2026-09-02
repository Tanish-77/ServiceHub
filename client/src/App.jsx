import { useEffect, useState } from "react";
import "./App.css";

function App() {

  
const customerPhone = localStorage.getItem("customerPhone") || "";

  const [message, setMessage] = useState("");
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  // Search & Filter states
  const [search, setSearch] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  // My Bookings states
  const [myBookings, setMyBookings] = useState([]);
 
  const [showMyBookings, setShowMyBookings] = useState(false);
  


  // Booking form data
const [bookingData, setBookingData] = useState({
  name: localStorage.getItem("customerName") || "",
  phone: localStorage.getItem("customerPhone") || "",
  date: "",
  time: ""
});
  // Review states
  const [showReviewForm, setShowReviewForm] = useState(false);

  const [reviewData, setReviewData] = useState({
    rating: 5,
    comment: ""
  });

  const [selectedBooking, setSelectedBooking] = useState(null);


  // =========================================
  // LOAD DATA
  // =========================================

  useEffect(() => {

    fetch("http://localhost:5000/")
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
      })
      .catch((error) => {
        console.log(error);
      });


    fetch("http://localhost:5000/api/providers")
      .then((response) => response.json())
      .then((data) => {
        setProviders(data);
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);


  // =========================================
  // CUSTOMER LOGOUT
  // =========================================

  const handleCustomerLogout = () => {

    localStorage.removeItem("customerName");
    localStorage.removeItem("customerPhone");

    window.location.href = "/";

  };


  // =========================================
  // FILTER PROVIDERS
  // =========================================

  const filteredProviders = providers.filter((provider) => {

    const searchMatch =
      provider.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      provider.service
        .toLowerCase()
        .includes(search.toLowerCase());

    const serviceMatch =
      serviceFilter === "" ||
      provider.service === serviceFilter;

    const locationMatch =
      locationFilter === "" ||
      provider.location === locationFilter;

    return searchMatch && serviceMatch && locationMatch;

  });


  // =========================================
  // BOOKING FORM CHANGE
  // =========================================

  const handleBookingChange = (event) => {

    const { name, value } = event.target;


    // DATE CHANGE
    if (name === "date") {

      const selectedDate = new Date(
        value + "T00:00:00"
      );

      const dayName =
        selectedDate.toLocaleDateString(
          "en-US",
          {
            weekday: "long"
          }
        );


      const availableDays =
        selectedProvider?.availability?.days || [];


      if (!availableDays.includes(dayName)) {

        alert(
          `This provider is not available on ${dayName}. Please select another day.`
        );


        setBookingData({
          ...bookingData,
          date: "",
          time: ""
        });


        return;

      }

    }


    setBookingData({
      ...bookingData,
      [name]: value
    });

  };


  // =========================================
  // SUBMIT REVIEW
  // =========================================

  const handleReviewSubmit = async (event) => {

    event.preventDefault();


    if (!selectedBooking) {
      return;
    }


    try {

      const response = await fetch(
        "http://localhost:5000/api/reviews",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({

            providerId:
              selectedBooking.providerId,

            bookingId:
              selectedBooking._id,

            customerName:
              selectedBooking.customerName,

            rating:
              Number(reviewData.rating),

            comment:
              reviewData.comment.trim()

          })
        }
      );


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(
          data.message ||
          "Failed to submit review"
        );

      }


      alert(
        "Review submitted successfully! ⭐"
      );


      setShowReviewForm(false);

      setSelectedBooking(null);


      setReviewData({
        rating: 5,
        comment: ""
      });


    } catch (error) {

      console.log(
        "Review Error:",
        error
      );


      alert(
        error.message ||
        "Unable to submit review"
      );

    }

  };


  // =========================================
  // CREATE BOOKING + RAZORPAY PAYMENT
  // =========================================

  const handleBookingSubmit = async (event) => {

    event.preventDefault();


    // =========================================
    // PHONE VALIDATION
    // =========================================

    const phone =
      bookingData.phone.trim();


    if (!/^[0-9]{10}$/.test(phone)) {

      alert(
        "Please enter a valid 10-digit phone number."
      );

      return;

    }


    // =========================================
    // DATE VALIDATION
    // =========================================

    if (!bookingData.date) {

      alert(
        "Please select a booking date."
      );

      return;

    }


    const today = new Date();

    today.setHours(
      0,
      0,
      0,
      0
    );


    const selectedDate =
      new Date(
        bookingData.date +
        "T00:00:00"
      );


    if (selectedDate < today) {

      alert(
        "You cannot book a service for a past date."
      );

      return;

    }


    // =========================================
    // TIME VALIDATION
    // =========================================

    if (!bookingData.time) {

      alert(
        "Please select a booking time."
      );

      return;

    }


    // =========================================
    // NAME VALIDATION
    // =========================================

    if (!bookingData.name.trim()) {

      alert(
        "Please enter your name."
      );

      return;

    }


    // =========================================
    // CREATE BOOKING
    // =========================================

    try {

      const response = await fetch(
        "http://localhost:5000/api/bookings",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({

            providerId:
              selectedProvider._id,

            providerName:
              selectedProvider.name,

            service:
              selectedProvider.service,

            customerName:
              bookingData.name.trim(),
             

            customerPhone:
              customerPhone,
 
            phone:
              phone,

            date:
              bookingData.date,

            time:
              bookingData.time

          })
        }
      );


      const data =
        await response.json();


      // =========================================
      // BACKEND ERROR
      // =========================================

      if (!response.ok) {

        throw new Error(
          data.message ||
          "Booking failed"
        );

      }


      console.log(
        "Booking Created:",
        data
      );


      // =========================================
      // CHECK RAZORPAY
      // =========================================

      if (!window.Razorpay) {

        alert(
          "Razorpay is not loaded. Please refresh the page."
        );

        return;

      }


      // =========================================
      // RAZORPAY OPTIONS
      // =========================================

      const options = {

        key:
          data.razorpayKey,

        amount:
          data.razorpayOrder.amount,

        currency:
          data.razorpayOrder.currency,

        name:
          "ServiceHub",

        description:
          `${selectedProvider.service} Booking`,

        order_id:
          data.razorpayOrder.id,


        // =========================================
        // PAYMENT SUCCESS
        // =========================================

        handler:
          async function (paymentResponse) {

            try {

              const verifyResponse =
                await fetch(
                  "http://localhost:5000/api/bookings/payment/verify",
                  {
                    method: "POST",

                    headers: {
                      "Content-Type":
                        "application/json"
                    },

                    body: JSON.stringify({

                      bookingId:
                        data.booking._id,

                      razorpay_payment_id:
                        paymentResponse.razorpay_payment_id,

                      razorpay_signature:
                        paymentResponse.razorpay_signature

                    })
                  }
                );


              const verifyData =
                await verifyResponse.json();


              if (!verifyResponse.ok) {

                throw new Error(
                  verifyData.message ||
                  "Payment verification failed"
                );

              }


              // =========================================
              // PAYMENT SUCCESS
              // =========================================

              alert(
                "Payment successful! Booking confirmed 🎉"
              );


            

              // Reset booking form
             setBookingData({
  name: localStorage.getItem("customerName") || "",
  phone: localStorage.getItem("customerPhone") || "",
  date: "",
  time: ""
});

              // Close booking popup
              setShowBookingForm(false);

              setSelectedProvider(null);


            } catch (error) {

              console.log(
                "Payment Verification Error:",
                error
              );


              alert(
                error.message ||
                "Payment verification failed."
              );

            }

          },


        // =========================================
        // CUSTOMER DETAILS
        // =========================================

        prefill: {

          name:
            bookingData.name,

          contact:
            phone

        },


        theme: {

          color:
            "#3399cc"

        }

      };


      // =========================================
      // OPEN RAZORPAY
      // =========================================

      const razorpay =
        new window.Razorpay(options);


      razorpay.open();


    } catch (error) {

      console.log(
        "Booking Error:",
        error
      );


      alert(
        error.message ||
        "Booking failed. Please try again."
      );

    }

  };


  // =========================================
  // MY BOOKINGS
  // =========================================
   
  const handleMyBookings = async () => {

  if (!customerPhone) {
    alert("Customer login information not found. Please login again.");
    window.location.href = "/login";
    return;
  }

  try {

    const response = await fetch(
      `http://localhost:5000/api/bookings?customerPhone=${customerPhone}`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to fetch bookings"
      );
    }

    setMyBookings(data);
    setShowMyBookings(true);

  } catch (error) {

    console.log(
      "My Bookings Error:",
      error
    );

    alert(
      error.message ||
      "Unable to load bookings"
    );
  }
};

  // =========================================
  // CANCEL BOOKING
  // =========================================

  const handleCancelBooking =
    async (bookingId) => {

      const confirmCancel =
        window.confirm(
          "Are you sure you want to cancel this booking?"
        );


      if (!confirmCancel) {

        return;

      }


      try {

        const response =
          await fetch(
            `http://localhost:5000/api/bookings/${bookingId}/cancel`,
            {
              method: "PUT"
            }
          );


        const data =
          await response.json();


        if (!response.ok) {

          throw new Error(
            data.message ||
            "Failed to cancel booking"
          );

        }


        alert(
          "Booking cancelled successfully!"
        );


        const updatedResponse =
          await fetch(
          `http://localhost:5000/api/bookings?customerPhone=${customerPhone}`
          );


        const updatedData =
          await updatedResponse.json();


        setMyBookings(
          updatedData
        );


      } catch (error) {

        console.log(
          "Cancel Booking Error:",
          error
        );


        alert(
          error.message ||
          "Unable to cancel booking"
        );

      }

    };


  // =========================================
  // RETURN UI
  // =========================================

  return (

    <div className="servicehub-container">


      {/* =========================================
          HEADER
      ========================================= */}

      <div className="servicehub-header">

        <h1 className="servicehub-title">
          ServiceHub
        </h1>


        <button
          className="customer-logout-btn"
          onClick={
            handleCustomerLogout
          }
        >
          Logout
        </button>

      </div>


      <h2>
        {message}
      </h2>


      {/* =========================================
          SEARCH & FILTER
      ========================================= */}

      <div className="search-section">

        <input
          type="text"
          placeholder="🔍 Search service or provider..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
        />


        <select
          value={serviceFilter}
          onChange={(event) =>
            setServiceFilter(
              event.target.value
            )
          }
        >

          <option value="">
            All Services
          </option>

          <option value="AC Repair">
            AC Repair
          </option>

          <option value="Plumber">
            Plumber
          </option>

          <option value="Electrician">
            Electrician
          </option>

        </select>


        <select
          value={locationFilter}
          onChange={(event) =>
            setLocationFilter(
              event.target.value
            )
          }
        >

          <option value="">
            All Locations
          </option>

          <option value="Faridabad">
            Faridabad
          </option>

          <option value="Delhi">
            Delhi
          </option>

        </select>

      </div>


      {/* =========================================
          MY BOOKINGS SECTION
      ========================================= */}

      <div className="my-bookings-section">

        <h2>
          📋 My Bookings
        </h2>


        <div className="booking-search">

  <button
    onClick={handleMyBookings}
  >
    📋 View My Bookings
  </button>

</div>

      </div>


      {/* =========================================
          MY BOOKINGS POPUP
      ========================================= */}

      {showMyBookings && (

        <div className="my-bookings-overlay">

          <div className="my-bookings-popup">


            <button
              className="my-bookings-close"
              onClick={() =>
                setShowMyBookings(
                  false
                )
              }
            >
              ×
            </button>


            <h2>
              📋 My Bookings
            </h2>


            {myBookings.length === 0 ? (

              <p>
                No bookings found for this phone number.
              </p>

            ) : (

              myBookings.map(
                (booking) => (

                  <div
                    className="my-booking-card"
                    key={booking._id}
                  >

                    <h3>
                      {booking.providerName}
                    </h3>


                    <p>
                      <strong>
                        Service:
                      </strong>{" "}
                      {booking.service}
                    </p>


                    <p>
                      <strong>
                        Customer:
                      </strong>{" "}
                      {booking.customerName}
                    </p>
                      <p>
  <strong>
    Contact:
  </strong>{" "}
  {booking.phone}
</p>

                    <p>
                      <strong>
                        Date:
                      </strong>{" "}
                      {booking.date}
                    </p>


                    <p>
                      <strong>
                        Time:
                      </strong>{" "}
                      {booking.time}
                    </p>


                    <span className="booking-status">
                      {booking.status}
                    </span>


                    {/* CANCEL */}

                    {booking.status !==
                      "Cancelled" &&
                      booking.status !==
                      "Completed" && (

                        <button
                          className="cancel-booking-btn"
                          onClick={() =>
                            handleCancelBooking(
                              booking._id
                            )
                          }
                        >
                          Cancel Booking
                        </button>

                      )}


                    {/* REVIEW */}

                    {booking.status ===
                      "Completed" && (

                        <button
                          type="button"
                          className="review-booking-btn"
                          onClick={() => {

                            setSelectedBooking(
                              booking
                            );

                            setShowMyBookings(
                              false
                            );

                            setShowReviewForm(
                              true
                            );

                          }}
                        >
                          ⭐ Give Review
                        </button>

                      )}

                  </div>

                )
              )

            )}

          </div>

        </div>

      )}


      {/* =========================================
          REVIEW POPUP
      ========================================= */}

      {showReviewForm &&
        selectedBooking && (

          <div className="review-overlay">

            <div className="review-popup">


              <button
                className="review-close"
                onClick={() => {

                  setShowReviewForm(
                    false
                  );

                  setSelectedBooking(
                    null
                  );

                }}
              >
                ×
              </button>


              <h2>
                ⭐ Give Review
              </h2>


              <p>
                <strong>
                  Provider:
                </strong>{" "}
                {selectedBooking.providerName}
              </p>


              <p>
                <strong>
                  Service:
                </strong>{" "}
                {selectedBooking.service}
              </p>


              <form
                onSubmit={
                  handleReviewSubmit
                }
              >

                <label>
                  Rating
                </label>


                <select
                  value={
                    reviewData.rating
                  }
                  onChange={(event) =>
                    setReviewData({
                      ...reviewData,
                      rating:
                        event.target.value
                    })
                  }
                >

                  <option value="5">
                    ⭐⭐⭐⭐⭐ 5
                  </option>

                  <option value="4">
                    ⭐⭐⭐⭐ 4
                  </option>

                  <option value="3">
                    ⭐⭐⭐ 3
                  </option>

                  <option value="2">
                    ⭐⭐ 2
                  </option>

                  <option value="1">
                    ⭐ 1
                  </option>

                </select>


                <label>
                  Your Review
                </label>


                <textarea
                  value={
                    reviewData.comment
                  }
                  onChange={(event) =>
                    setReviewData({
                      ...reviewData,
                      comment:
                        event.target.value
                    })
                  }
                  placeholder="Write your experience..."
                  rows="4"
                />


                <button
                  type="submit"
                  className="submit-review-btn"
                >
                  Submit Review
                </button>

              </form>

            </div>

          </div>

        )}


      {/* =========================================
          PROVIDERS
      ========================================= */}

      <div className="providers-grid">

        {filteredProviders.map(
          (provider) => (

            <div
              className="provider-card"
              key={provider._id}
            >

              <h2 className="provider-name">
                {provider.name}
              </h2>


              <p className="provider-info">
                <strong>
                  Service:
                </strong>{" "}
                {provider.service}
              </p>


              <p className="provider-info">
                <strong>
                  Location:
                </strong>{" "}
                {provider.location}
              </p>


              <p className="provider-price">
                ₹{provider.price}
              </p>


              <p className="provider-rating">
                ⭐ {provider.rating}
              </p>


              <p className="provider-info">
                <strong>
                  Experience:
                </strong>{" "}
                {provider.experience} years
              </p>


              <button
                className="view-details-btn"
                onClick={() =>
                  setSelectedProvider(
                    provider
                  )
                }
              >
                View Details
              </button>

            </div>

          )
        )}

      </div>


      {/* =========================================
          PROVIDER DETAILS POPUP
      ========================================= */}

      {selectedProvider && (

        <div className="details-overlay">

          <div className="provider-details">


            <button
              className="details-close"
              onClick={() =>
                setSelectedProvider(
                  null
                )
              }
            >
              ×
            </button>


            <div className="details-icon">
              🔧
            </div>


            <h2>
              {selectedProvider.name}
            </h2>


            <p>
              <strong>
                Service
              </strong>

              <span>
                {selectedProvider.service}
              </span>
            </p>


            <p>
              <strong>
                Location
              </strong>

              <span>
                📍 {selectedProvider.location}
              </span>
            </p>


            <p>
              <strong>
                Price
              </strong>

              <span className="details-price">
                ₹{selectedProvider.price}
              </span>
            </p>


            <p>
              <strong>
                Rating
              </strong>

              <span>
                ⭐ {selectedProvider.rating}
              </span>
            </p>


            <p>
              <strong>
                Experience
              </strong>

              <span>
                {selectedProvider.experience} years
              </span>
            </p>


            <p>
              <strong>
                🕒 Available Days
              </strong>

              <span>
                {selectedProvider.availability?.days?.join(
                  ", "
                ) ||
                  "Not specified"}
              </span>
            </p>


            <p>
              <strong>
                ⏰ Working Hours
              </strong>

              <span>
                {
                  selectedProvider.availability
                    ?.startTime &&
                  selectedProvider.availability
                    ?.endTime
                    ? `${selectedProvider.availability.startTime} - ${selectedProvider.availability.endTime}`
                    : "Not specified"
                }
              </span>
            </p>


            <button
              className="book-service-btn"
              onClick={() =>
                setShowBookingForm(
                  true
                )
              }
            >
              Book Service
            </button>


          </div>

        </div>

      )}


      {/* =========================================
          BOOKING FORM POPUP
      ========================================= */}

      {showBookingForm &&
        selectedProvider && (

          <div className="booking-overlay">

            <div className="booking-form">


              <button
                className="booking-close"
                onClick={() =>
                  setShowBookingForm(
                    false
                  )
                }
              >
                ×
              </button>


              <h2>
                Book Service
              </h2>


              <p>
                <strong>
                  Provider:
                </strong>{" "}
                {selectedProvider.name}
              </p>


              <p>
                <strong>
                  Service:
                </strong>{" "}
                {selectedProvider.service}
              </p>


              <p>
                <strong>
                  Price:
                </strong>{" "}
                ₹{selectedProvider.price}
              </p>


              <form
                onSubmit={
                  handleBookingSubmit
                }
              >


                {/* NAME */}

                <label>
                  Your Name
                </label>


                <input
                  type="text"
                  name="name"
                  value={
                    bookingData.name
                  }
                  onChange={
                    handleBookingChange
                  }
                  placeholder="Enter your name"
                  required
                />


                {/* PHONE */}

                <label>
                  Phone Number
                </label>


                <input
                  type="tel"
                  name="phone"
                  value={
                    bookingData.phone
                  }
                  onChange={
                    handleBookingChange
                  }
                  placeholder="Enter 10-digit phone number"
                  maxLength={10}
                  required
                />


                {/* DATE */}

                <label>
                  Date
                </label>


                <input
                  type="date"
                  name="date"
                  value={
                    bookingData.date
                  }
                  onChange={
                    handleBookingChange
                  }
                  min={
                    new Date()
                      .toISOString()
                      .split("T")[0]
                  }
                  required
                />


                {/* TIME */}

                <label>
                  Time
                </label>


                <input
                  type="time"
                  name="time"
                  value={
                    bookingData.time
                  }
                  onChange={
                    handleBookingChange
                  }
                  min={
                    selectedProvider
                      ?.availability
                      ?.startTime ||
                    "09:00"
                  }
                  max={
                    selectedProvider
                      ?.availability
                      ?.endTime ||
                    "18:00"
                  }
                  required
                />


                {/* SUBMIT */}

                <button
                  type="submit"
                  className="confirm-booking-btn"
                >
                  Proceed to Payment 💳
                </button>


              </form>

            </div>

          </div>

        )}

    </div>

  );

}

export default App;