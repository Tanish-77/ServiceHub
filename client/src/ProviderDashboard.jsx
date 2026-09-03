import { useEffect, useState } from "react";
import "./ProviderDashboard.css";

const API_URL = import.meta.env.VITE_API_URL;

function ProviderDashboard() {

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // REVIEWS
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  // BOOKING FILTER
  const [bookingFilter, setBookingFilter] = useState("All");

  // AVAILABILITY
  const [availability, setAvailability] = useState({
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
    ],
    startTime: "09:00",
    endTime: "18:00",
  });

  const daysList = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // PROVIDER INFORMATION
  const providerId = localStorage.getItem("providerId");
  const providerName = localStorage.getItem("providerName");

  // PROVIDER DATA
  const [provider, setProvider] = useState(null);

  // EDIT SERVICE
  const [showEditForm, setShowEditForm] = useState(false);

  const [editData, setEditData] = useState({
    name: "",
    service: "",
    location: "",
    price: "",
    experience: "",
  });


  // =========================================
  // LOGOUT
  // =========================================

  const handleLogout = () => {

  localStorage.removeItem("providerToken");
  localStorage.removeItem("providerId");
  localStorage.removeItem("providerName");
  localStorage.removeItem("providerPhone");
  localStorage.removeItem("providerEmail");


    window.location.href = "/";

  };


  // =========================================
  // GET PROVIDER DATA
  // =========================================

  const fetchProvider = async () => {

    try {

      const response = await fetch(
        `${API_URL}/api/providers`
      );

      const data = await response.json();

      if (!response.ok) {

        throw new Error(
          data.message || "Failed to fetch provider"
        );

      }

      const currentProvider = data.find(
        (item) => item._id === providerId
      );

      if (!currentProvider) {

        alert("Provider information not found.");

        return;

      }

      setProvider(currentProvider);

      setEditData({
        name: currentProvider.name,
        service: currentProvider.service,
        location: currentProvider.location,
        price: currentProvider.price,
        experience: currentProvider.experience,
      });

      setAvailability({

        days:
          currentProvider.availability?.days ||
          [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
          ],

        startTime:
          currentProvider.availability?.startTime ||
          "09:00",

        endTime:
          currentProvider.availability?.endTime ||
          "18:00",

      });

    } catch (error) {

      console.error(
        "Provider fetch error:",
        error
      );

    }

  };


  // =========================================
  // GET PROVIDER BOOKINGS
  // =========================================

  const fetchBookings = async () => {

    try {

      setLoading(true);

      const response = await fetch(
      `${API_URL}/api/bookings`
      );

      const data = await response.json();

      if (!response.ok) {

        throw new Error(
          data.message ||
          "Failed to fetch bookings"
        );

      }

      const providerBookings = data.filter(
        (booking) =>
          booking.providerId === providerId ||
          booking.providerId?._id === providerId
      );

      setBookings(providerBookings);

    } catch (error) {

      console.error(
        "Fetch bookings error:",
        error
      );

    } finally {

      setLoading(false);

    }

  };


  // =========================================
  // GET PROVIDER REVIEWS
  // =========================================

  const fetchReviews = async () => {

    try {

      setReviewsLoading(true);

      const response = await fetch(
        `${API_URL}/api/reviews/provider/${providerId}`
      );

      const data = await response.json();

      if (!response.ok) {

        throw new Error(
          data.message ||
          "Failed to fetch reviews"
        );

      }

      setReviews(data);

    } catch (error) {

      console.error(
        "Fetch reviews error:",
        error
      );

    } finally {

      setReviewsLoading(false);

    }

  };


  // =========================================
  // LOAD DATA
  // =========================================

  useEffect(() => {

    if (!providerId) {

      window.location.href =
        "/provider-login";

      return;

    }

    fetchProvider();
    fetchBookings();
    fetchReviews();

  }, []);


  // =========================================
  // EDIT INPUT CHANGE
  // =========================================

  const handleEditChange = (event) => {

    setEditData({
      ...editData,
      [event.target.name]: event.target.value,
    });

  };


  // =========================================
  // TOGGLE WORKING DAY
  // =========================================

  const toggleDay = (day) => {

    setAvailability((previous) => {

      const alreadySelected =
        previous.days.includes(day);

      if (alreadySelected) {

        return {
          ...previous,

          days: previous.days.filter(
            (item) => item !== day
          ),
        };

      }

      return {
        ...previous,

        days: [
          ...previous.days,
          day,
        ],
      };

    });

  };


  // =========================================
  // UPDATE AVAILABILITY
  // =========================================

  const handleSaveAvailability = async () => {

    if (availability.days.length === 0) {

      alert(
        "Please select at least one working day."
      );

      return;

    }


    if (
      availability.startTime >=
      availability.endTime
    ) {

      alert(
        "End time must be later than start time."
      );

      return;

    }


    try {

      const response = await fetch(
        `${API_URL}/api/providers/${providerId}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            availability: availability,
          }),
        }
      );


      const data = await response.json();


      if (!response.ok) {

        throw new Error(
          data.message ||
          "Failed to update availability"
        );

      }


      setProvider(data);


      alert(
        "Availability saved successfully! ✅"
      );


    } catch (error) {

      console.error(
        "Availability error:",
        error
      );


      alert(
        error.message ||
        "Unable to save availability"
      );

    }

  };


  // =========================================
  // UPDATE PROVIDER
  // =========================================

  const handleUpdateProvider = async (event) => {

    event.preventDefault();

    try {

      const response = await fetch(
       `${API_URL}/api/providers/${providerId}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({

            name: editData.name.trim(),

            service: editData.service.trim(),

            location: editData.location.trim(),

            price: Number(editData.price),

            experience: Number(editData.experience),

          }),
        }
      );


      const data = await response.json();


      if (!response.ok) {

        throw new Error(
          data.message ||
          "Failed to update provider"
        );

      }


      setProvider(data);


      localStorage.setItem(
        "providerName",
        data.name
      );


      setShowEditForm(false);


      alert(
        "Service information updated successfully!"
      );


    } catch (error) {

      console.error(
        "Update provider error:",
        error
      );


      alert(
        error.message ||
        "Unable to update service"
      );

    }

  };


  // =========================================
  // UPDATE BOOKING STATUS
  // =========================================

  const updateStatus = async (
    bookingId,
    status
  ) => {

    try {

      const response = await fetch(
        `${API_URL}/api/bookings/${bookingId}/status`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            status: status,
          }),

        }
      );


      const data = await response.json();


      if (!response.ok) {

        throw new Error(
          data.message ||
          "Status update failed"
        );

      }


      alert(
        `Booking ${status.toLowerCase()} successfully!`
      );


      fetchBookings();


    } catch (error) {

      console.error(
        "Update status error:",
        error
      );


      alert(
        error.message ||
        "Unable to update booking"
      );

    }

  };


  // =========================================
  // FILTER BOOKINGS
  // =========================================

  const filteredBookings =
    bookingFilter === "All"
      ? bookings
      : bookings.filter(
          (booking) =>
            booking.status === bookingFilter
        );


  // =========================================
  // PAYMENT STATUS
  // =========================================

  const getPaymentStatusClass = (paymentStatus) => {

    if (paymentStatus === "Paid") {
      return "payment-status paid";
    }

    if (paymentStatus === "Failed") {
      return "payment-status failed";
    }

    return "payment-status pending";

  };


  const getPaymentStatusText = (paymentStatus) => {

    if (paymentStatus === "Paid") {
      return "🟢 PAID";
    }

    if (paymentStatus === "Failed") {
      return "🔴 FAILED";
    }

    return "🟠 NOT PAID";

  };


  // =========================================
  // STATISTICS
  // =========================================

  const totalBookings =
    bookings.length;

  const pendingBookings =
    bookings.filter(
      (booking) =>
        booking.status === "Pending"
    ).length;

  const confirmedBookings =
    bookings.filter(
      (booking) =>
        booking.status === "Confirmed"
    ).length;

  const completedBookings =
    bookings.filter(
      (booking) =>
        booking.status === "Completed"
    ).length;

  const cancelledBookings =
    bookings.filter(
      (booking) =>
        booking.status === "Cancelled"
    ).length;


  // =========================================
  // UI
  // =========================================

  return (

    <div className="provider-dashboard">


      {/* =====================================
          HEADER
      ===================================== */}

      <div className="dashboard-header">

        <div>

          <h1>
            Provider Dashboard
          </h1>

          <p>
            Welcome{" "}
            <strong>
              {providerName}
            </strong>
          </p>

          <p>
            Manage your bookings and services
          </p>

        </div>


        <button
          className="provider-logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>


      {/* =====================================
          MY SERVICE
      ===================================== */}

      {provider && (

        <div className="service-section">

          <div className="service-section-header">

            <div>

              <h2>
                My Service
              </h2>

              <p>
                Manage your service information
              </p>

            </div>


            <button
              className="edit-service-btn"
              onClick={() =>
                setShowEditForm(true)
              }
            >
              ✏️ Edit Service
            </button>

          </div>


          <div className="service-details">

            <div className="service-detail">

              <span>
                Provider Name
              </span>

              <strong>
                {provider.name}
              </strong>

            </div>


            <div className="service-detail">

              <span>
                Service
              </span>

              <strong>
                {provider.service}
              </strong>

            </div>


            <div className="service-detail">

              <span>
                Location
              </span>

              <strong>
                📍 {provider.location}
              </strong>

            </div>


            <div className="service-detail">

              <span>
                Price
              </span>

              <strong>
                ₹{provider.price}
              </strong>

            </div>


            <div className="service-detail">

              <span>
                Experience
              </span>

              <strong>
                {provider.experience} years
              </strong>

            </div>


            <div className="service-detail">

              <span>
                Rating
              </span>

              <strong>
                ⭐ {provider.rating}
              </strong>

            </div>

          </div>

        </div>

      )}


      {/* =====================================
          EDIT SERVICE POPUP
      ===================================== */}

      {showEditForm && (

        <div className="edit-service-overlay">

          <div className="edit-service-modal">


            <button
              className="edit-close-btn"
              onClick={() =>
                setShowEditForm(false)
              }
            >
              ×
            </button>


            <h2>
              Edit Service
            </h2>

            <p>
              Update your service information
            </p>


            <form
              onSubmit={handleUpdateProvider}
            >


              <label>
                Provider Name
              </label>

              <input
                type="text"
                name="name"
                value={editData.name}
                onChange={handleEditChange}
                required
              />


              <label>
                Service
              </label>

              <input
                type="text"
                name="service"
                value={editData.service}
                onChange={handleEditChange}
                required
              />


              <label>
                Location
              </label>

              <input
                type="text"
                name="location"
                value={editData.location}
                onChange={handleEditChange}
                required
              />


              <label>
                Price
              </label>

              <input
                type="number"
                name="price"
                value={editData.price}
                onChange={handleEditChange}
                min="0"
                required
              />


              <label>
                Experience
              </label>

              <input
                type="number"
                name="experience"
                value={editData.experience}
                onChange={handleEditChange}
                min="0"
                required
              />


              <div className="edit-form-buttons">

                <button
                  type="button"
                  className="edit-cancel-btn"
                  onClick={() =>
                    setShowEditForm(false)
                  }
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="edit-save-btn"
                >
                  Save Changes
                </button>

              </div>

            </form>

          </div>

        </div>

      )}


      {/* =====================================
          AVAILABILITY
      ===================================== */}

      <div className="availability-section">

        <div className="availability-header">

          <div>

            <h2>
              🕒 My Availability
            </h2>

            <p>
              Set your working days and working hours
            </p>

          </div>

        </div>


        <h3>
          Working Days
        </h3>


        <div className="days-container">

          {daysList.map((day) => (

            <button
              key={day}
              type="button"
              className={
                availability.days.includes(day)
                  ? "day-btn active"
                  : "day-btn"
              }
              onClick={() =>
                toggleDay(day)
              }
            >
              {day}
            </button>

          ))}

        </div>


        <div className="working-hours">

          <div>

            <label>
              Start Time
            </label>

            <input
              type="time"
              value={availability.startTime}
              onChange={(event) =>
                setAvailability({
                  ...availability,
                  startTime:
                    event.target.value,
                })
              }
            />

          </div>


          <div>

            <label>
              End Time
            </label>

            <input
              type="time"
              value={availability.endTime}
              onChange={(event) =>
                setAvailability({
                  ...availability,
                  endTime:
                    event.target.value,
                })
              }
            />

          </div>

        </div>


        <button
          className="save-availability-btn"
          onClick={handleSaveAvailability}
        >
          Save Availability
        </button>

      </div>


      {/* =====================================
          STATISTICS
      ===================================== */}

      <div className="dashboard-stats">

        <div className="stat-card">
          <h3>Total Bookings</h3>
          <h2>{totalBookings}</h2>
        </div>

        <div className="stat-card">
          <h3>Pending</h3>
          <h2>{pendingBookings}</h2>
        </div>

        <div className="stat-card">
          <h3>Confirmed</h3>
          <h2>{confirmedBookings}</h2>
        </div>

        <div className="stat-card">
          <h3>Completed</h3>
          <h2>{completedBookings}</h2>
        </div>

        <div className="stat-card">
          <h3>Cancelled</h3>
          <h2>{cancelledBookings}</h2>
        </div>

      </div>


      {/* =====================================
          BOOKINGS
      ===================================== */}

      <div className="bookings-section">

        <h2>
          My Bookings
        </h2>


        {/* BOOKING FILTERS */}

        <div className="booking-filters">

          <button
            onClick={() =>
              setBookingFilter("All")
            }
            className={
              bookingFilter === "All"
                ? "active-filter"
                : ""
            }
          >
            All
          </button>


          <button
            onClick={() =>
              setBookingFilter("Pending")
            }
            className={
              bookingFilter === "Pending"
                ? "active-filter"
                : ""
            }
          >
            Pending
          </button>


          <button
            onClick={() =>
              setBookingFilter("Confirmed")
            }
            className={
              bookingFilter === "Confirmed"
                ? "active-filter"
                : ""
            }
          >
            Confirmed
          </button>


          <button
            onClick={() =>
              setBookingFilter("Completed")
            }
            className={
              bookingFilter === "Completed"
                ? "active-filter"
                : ""
            }
          >
            Completed
          </button>


          <button
            onClick={() =>
              setBookingFilter("Cancelled")
            }
            className={
              bookingFilter === "Cancelled"
                ? "active-filter"
                : ""
            }
          >
            Cancelled
          </button>

        </div>


        {loading ? (

          <p>
            Loading bookings...
          </p>

        ) : filteredBookings.length === 0 ? (

          <div className="no-bookings">

            <p>
              No bookings found.
            </p>

          </div>

        ) : (

          <div className="bookings-table">

            <table>

              <thead>

                <tr>

                  <th>Customer</th>

                  <th>Phone</th>

                  <th>Service</th>

                  <th>Date</th>

                  <th>Time</th>

                  <th>Status</th>

                  <th>Payment</th>

                  <th>Action</th>

                </tr>

              </thead>


              <tbody>

                {filteredBookings.map(
                  (booking) => (

                    <tr
                      key={booking._id}
                    >

                      <td>
                        {booking.customerName}
                      </td>

                      <td>
                        {booking.phone}
                      </td>

                      <td>
                        {booking.service}
                      </td>

                      <td>
                        {booking.date}
                      </td>

                      <td>
                        {booking.time}
                      </td>


                      <td>

                        <span
                          className={`status ${booking.status.toLowerCase()}`}
                        >
                          {booking.status}
                        </span>

                      </td>


                      {/* =====================================
                          PAYMENT STATUS
                      ===================================== */}

                      <td>

                        <span
                          className={getPaymentStatusClass(
                            booking.paymentStatus
                          )}
                        >
                          {getPaymentStatusText(
                            booking.paymentStatus
                          )}
                        </span>

                      </td>


                      <td>

                        {booking.status ===
                          "Pending" && (

                          <>

                            <button
                              onClick={() =>
                                updateStatus(
                                  booking._id,
                                  "Confirmed"
                                )
                              }
                            >
                              Confirm
                            </button>


                            <button
                              onClick={() =>
                                updateStatus(
                                  booking._id,
                                  "Cancelled"
                                )
                              }
                            >
                              Cancel
                            </button>

                          </>

                        )}


                        {booking.status ===
                          "Confirmed" && (

                          <>

                            <button
                              onClick={() =>
                                updateStatus(
                                  booking._id,
                                  "Completed"
                                )
                              }
                            >
                              Complete
                            </button>


                            <button
                              onClick={() =>
                                updateStatus(
                                  booking._id,
                                  "Cancelled"
                                )
                              }
                            >
                              Cancel
                            </button>

                          </>

                        )}


                        {booking.status ===
                          "Completed" && (

                          <span>
                            Completed
                          </span>

                        )}


                        {booking.status ===
                          "Cancelled" && (

                          <span>
                            Cancelled
                          </span>

                        )}

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>


      {/* =====================================
          CUSTOMER REVIEWS
      ===================================== */}

      <div className="reviews-section">

        <div className="reviews-header">

          <div>

            <h2>
              ⭐ Customer Reviews
            </h2>

            <p>
              See what your customers say about your service
            </p>

          </div>

        </div>


        {reviewsLoading ? (

          <p>
            Loading reviews...
          </p>

        ) : reviews.length === 0 ? (

          <div className="no-reviews">

            <p>
              No reviews yet.
            </p>

          </div>

        ) : (

          <div className="reviews-list">

            {reviews.map((review) => (

              <div
                className="review-card"
                key={review._id}
              >

                <div className="review-card-header">

                  <h3>
                    {review.customerName}
                  </h3>

                  <span>
                    ⭐ {review.rating}/5
                  </span>

                </div>


                <p className="review-comment">

                  {review.comment
                    ? review.comment
                    : "No comment provided."}

                </p>


                <small>

                  {new Date(
                    review.createdAt
                  ).toLocaleDateString()}

                </small>

              </div>

            ))}

          </div>

        )}

      </div>


    </div>

  );

}

export default ProviderDashboard;