import { useEffect, useMemo, useState } from "react";
import "./Admin.css";

const API_URL = import.meta.env.VITE_API_URL;

function Admin() {

  // =========================================
  // BOOKINGS
  // =========================================

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & filter
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // =========================================
  // PROVIDERS
  // =========================================

  const [providers, setProviders] = useState([]);

  const [showProviderForm, setShowProviderForm] =
    useState(false);

  const [editingProvider, setEditingProvider] =
    useState(null);

  const [providerData, setProviderData] = useState({
    name: "",
    service: "",
    location: "",
    price: "",
    rating: "",
    experience: ""
  });

  // =========================================
  // ADMIN LOGOUT
  // =========================================

  const handleAdminLogout = () => {

    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("servicehubAdmin");

    window.location.href = "/";

  };

  // =========================================
  // LOAD BOOKINGS
  // =========================================

  const loadBookings = async () => {

    try {

      const response = await fetch(
        `${API_URL}/api/bookings`
      );

      const data = await response.json();

      if (!response.ok) {

        throw new Error(
          data.message || "Failed to load bookings"
        );

      }

      setBookings(data);

    } catch (error) {

      console.log("Load Bookings Error:", error);

      alert("Unable to load bookings");

    } finally {

      setLoading(false);

    }

  };

  // =========================================
  // LOAD PROVIDERS
  // =========================================

  const loadProviders = async () => {

    try {

      const response = await fetch(
        `${API_URL}/api/providers`
      );

      const data = await response.json();

      if (!response.ok) {

        throw new Error(
          data.message || "Failed to load providers"
        );

      }

      setProviders(data);

    } catch (error) {

      console.log("Load Providers Error:", error);

      alert("Unable to load providers");

    }

  };

  // =========================================
  // LOAD DATA ON PAGE LOAD
  // =========================================

  useEffect(() => {

    const loadAdminData = async () => {

      await Promise.all([
        loadBookings(),
        loadProviders()
      ]);

    };

    loadAdminData();

  }, []);

  // =========================================
  // UPDATE BOOKING STATUS
  // =========================================

  const updateBookingStatus = async (
    bookingId,
    newStatus
  ) => {

    try {

      const response = await fetch(
        `${API_URL}/api/bookings/${bookingId}/status`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            status: newStatus
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {

        throw new Error(
          data.message || "Failed to update status"
        );

      }

      alert(
        `Booking ${newStatus.toLowerCase()} successfully!`
      );

      setBookings((previousBookings) =>

        previousBookings.map((booking) =>

          booking._id === bookingId
            ? {
                ...booking,
                status: newStatus
              }
            : booking

        )

      );

    } catch (error) {

      console.log(
        "Update Status Error:",
        error
      );

      alert(
        error.message ||
        "Unable to update booking"
      );

    }

  };

  // =========================================
  // PROVIDER FORM CHANGE
  // =========================================

  const handleProviderChange = (event) => {

    setProviderData({
      ...providerData,
      [event.target.name]: event.target.value
    });

  };

  // =========================================
  // OPEN ADD PROVIDER FORM
  // =========================================

  const openAddProvider = () => {

    setEditingProvider(null);

    setProviderData({
      name: "",
      service: "",
      location: "",
      price: "",
      rating: "",
      experience: ""
    });

    setShowProviderForm(true);

  };

  // =========================================
  // OPEN EDIT PROVIDER
  // =========================================

  const openEditProvider = (provider) => {

    setEditingProvider(provider);

    setProviderData({
      name: provider.name || "",
      service: provider.service || "",
      location: provider.location || "",
      price: provider.price || "",
      rating: provider.rating || "",
      experience: provider.experience || ""
    });

    setShowProviderForm(true);

  };

  // =========================================
  // ADD / UPDATE PROVIDER
  // =========================================

  const handleProviderSubmit = async (event) => {

    event.preventDefault();

    try {

      const url = editingProvider
         ? `${API_URL}/api/providers/${editingProvider._id}`
         : `${API_URL}/api/providers`;

      const method = editingProvider
        ? "PUT"
        : "POST";

      const response = await fetch(url, {

        method,

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({

          name: providerData.name.trim(),

          service: providerData.service,

          location: providerData.location,

          price: Number(providerData.price),

          rating: Number(providerData.rating),

          experience: Number(providerData.experience)

        })

      });

      const data = await response.json();

      if (!response.ok) {

        throw new Error(
          data.message ||
          "Provider operation failed"
        );

      }

      if (editingProvider) {

        alert("Provider updated successfully! ✅");

      } else {

        alert("Provider added successfully! 🎉");

      }

      setShowProviderForm(false);
      setEditingProvider(null);

      setProviderData({
        name: "",
        service: "",
        location: "",
        price: "",
        rating: "",
        experience: ""
      });

      loadProviders();

    } catch (error) {

      console.log(
        "Provider Submit Error:",
        error
      );

      alert(
        error.message ||
        "Provider operation failed"
      );

    }

  };

  // =========================================
  // DELETE PROVIDER
  // =========================================

  const deleteProvider = async (providerId) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this provider?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      const response = await fetch(
       `${API_URL}/api/providers/${providerId}`,
        {
          method: "DELETE"
        }
      );

      const data = await response.json();

      if (!response.ok) {

        throw new Error(
          data.message ||
          "Failed to delete provider"
        );

      }

      alert("Provider deleted successfully! 🗑️");

      setProviders((previousProviders) =>

        previousProviders.filter(
          (provider) =>
            provider._id !== providerId
        )

      );

    } catch (error) {

      console.log(
        "Delete Provider Error:",
        error
      );

      alert(
        error.message ||
        "Unable to delete provider"
      );

    }

  };

  // =========================================
  // BASIC STATISTICS
  // =========================================

  const totalBookings = bookings.length;

  const pendingBookings =
    bookings.filter(
      (booking) => booking.status === "Pending"
    ).length;

  const confirmedBookings =
    bookings.filter(
      (booking) => booking.status === "Confirmed"
    ).length;

  const completedBookings =
    bookings.filter(
      (booking) => booking.status === "Completed"
    ).length;

  const cancelledBookings =
    bookings.filter(
      (booking) => booking.status === "Cancelled"
    ).length;

    
  // =========================================
  // REVENUE ANALYTICS
  // =========================================

  const completedRevenueBookings = bookings.filter(
    (booking) =>
      booking.status === "Completed"
  );

  const paidBookings = bookings.filter(
    (booking) =>
      booking.paymentStatus === "Paid"
  );

  // Revenue amount helper
  const getBookingAmount = (booking) => {

    return (
      Number(booking.totalAmount) ||
      Number(booking.amount) ||
      Number(booking.price) ||
      Number(booking.providerPrice) ||
      0
    );

  };

  // Total revenue from completed bookings
  const totalAmountGenerated =
    completedRevenueBookings.reduce(
      (total, booking) =>
        total + getBookingAmount(booking),
      0
    );

  // Total revenue from paid bookings
  const totalRevenue =
    paidBookings.reduce(
      (total, booking) =>
        total + getBookingAmount(booking),
      0
    );

  // Average completed booking
  const averageBookingValue =
    completedRevenueBookings.length > 0
      ? Math.round(
          totalAmountGenerated /
          completedRevenueBookings.length

        )
      : 0;

  // Average paid booking
  const averageBooking =
    paidBookings.length > 0
      ? Math.round(
          totalRevenue /
          paidBookings.length
        )
      : 0;

  // =========================================
  // REVENUE BY SERVICE
  // =========================================

  const revenueAnalytics = useMemo(() => {

    const revenueMap = {};

    bookings.forEach((booking) => {

      if (booking.status !== "Completed") {
        return;
      }

      const service =
        booking.service || "Other";

      const amount =
        Number(booking.totalAmount) ||
        Number(booking.amount) ||
        Number(booking.price) ||
        Number(booking.providerPrice) ||
        0;

      if (!revenueMap[service]) {
        revenueMap[service] = 0;
      }

      revenueMap[service] += amount;

    });

    return Object.entries(revenueMap)
      .map(([service, amount]) => ({
        service,
        amount
      }))
      .sort(
        (a, b) => b.amount - a.amount
      )
      .slice(0, 6);

  }, [bookings]);

  const maxRevenue =
    revenueAnalytics.length > 0
      ? Math.max(
          ...revenueAnalytics.map(
            (item) => item.amount
          )
        )
      : 1;

  // =========================================
  // ANALYTICS
  // =========================================

  const completionRate =
    totalBookings > 0
      ? Math.round(
          (completedBookings / totalBookings) * 100
        )
      : 0;

  const cancellationRate =
    totalBookings > 0
      ? Math.round(
          (cancelledBookings / totalBookings) * 100
        )
      : 0;

  const confirmationRate =
    totalBookings > 0
      ? Math.round(
          ((confirmedBookings + completedBookings) /
            totalBookings) *
            100
        )
      : 0;

  // =========================================
  // SERVICE ANALYTICS
  // =========================================

  const serviceAnalytics = useMemo(() => {

    const serviceMap = {};

    bookings.forEach((booking) => {

      const service =
        booking.service || "Other";

      if (!serviceMap[service]) {
        serviceMap[service] = 0;
      }

      serviceMap[service]++;

    });

    return Object.entries(serviceMap)
      .map(([service, count]) => ({
        service,
        count
      }))
      .sort(
        (a, b) => b.count - a.count
      );

  }, [bookings]);

  const maxServiceBookings =
    serviceAnalytics.length > 0
      ? Math.max(
          ...serviceAnalytics.map(
            (item) => item.count
          )
        )
      : 1;

  // =========================================
  // LOCATION ANALYTICS
  // =========================================

  const locationAnalytics = useMemo(() => {

    const locationMap = {};

    bookings.forEach((booking) => {

      const location =
        booking.location ||
        booking.city ||
        "Not specified";

      if (!locationMap[location]) {
        locationMap[location] = 0;
      }

      locationMap[location]++;

    });

    return Object.entries(locationMap)
      .map(([location, count]) => ({
        location,
        count
      }))
      .sort(
        (a, b) => b.count - a.count
      );

  }, [bookings]);

  const maxLocationBookings =
    locationAnalytics.length > 0
      ? Math.max(
          ...locationAnalytics.map(
            (item) => item.count
          )
        )
      : 1;

  // =========================================
  // PROVIDER PERFORMANCE
  // =========================================

  const providerAnalytics = useMemo(() => {

    const providerMap = {};

    bookings.forEach((booking) => {

      const providerName =
        booking.providerName ||
        "Unknown Provider";

      if (!providerMap[providerName]) {

        providerMap[providerName] = {
          name: providerName,
          bookings: 0,
          completed: 0,
          cancelled: 0
        };

      }

      providerMap[providerName].bookings++;

      if (booking.status === "Completed") {
        providerMap[providerName].completed++;
      }

      if (booking.status === "Cancelled") {
        providerMap[providerName].cancelled++;
      }

    });

    return Object.values(providerMap)
      .sort(
        (a, b) =>
          b.bookings - a.bookings
      )
      .slice(0, 5);

  }, [bookings]);

  // =========================================
  // RECENT BOOKINGS
  // =========================================

  const recentBookings = useMemo(() => {

    return [...bookings]
      .reverse()
      .slice(0, 5);

  }, [bookings]);

  // =========================================
  // BOOKING STATUS CHART
  // =========================================

  const statusAnalytics = [
    {
      label: "Pending",
      value: pendingBookings,
      className: "analytics-pending"
    },
    {
      label: "Confirmed",
      value: confirmedBookings,
      className: "analytics-confirmed"
    },
    {
      label: "Completed",
      value: completedBookings,
      className: "analytics-completed"
    },
    {
      label: "Cancelled",
      value: cancelledBookings,
      className: "analytics-cancelled"
    }
  ];

  // =========================================
  // SEARCH + FILTER BOOKINGS
  // =========================================

  const filteredBookings = bookings.filter(
    (booking) => {

      const searchText =
        search.toLowerCase();

      const searchMatch =
        booking.providerName
          ?.toLowerCase()
          .includes(searchText) ||

        booking.customerName
          ?.toLowerCase()
          .includes(searchText) ||

        booking.phone
          ?.includes(searchText) ||

        booking.service
          ?.toLowerCase()
          .includes(searchText);

      const statusMatch =
        statusFilter === "" ||
        booking.status === statusFilter;

      return searchMatch && statusMatch;

    }
  );

  // =========================================
  // LOADING
  // =========================================

  if (loading) {

    return (

      <div className="admin-container">

        <div className="admin-loading-screen">

          <div className="admin-loading-spinner">

            <span></span>
            <span></span>
            <span></span>

          </div>

          <h2>
            Loading ServiceHub Admin
          </h2>

          <p>
            Preparing your dashboard...
          </p>

        </div>

      </div>

    );

  }

  // =========================================
  // ADMIN DASHBOARD
  // =========================================

  return (

    <div className="admin-container">

      {/* =====================================
          TOPBAR
      ===================================== */}

      <div className="admin-topbar">

        <div>

          <div className="admin-welcome">
            SERVICEHUB CONTROL CENTER
          </div>

          <h1>
            📋 Admin Dashboard
          </h1>

          <p className="admin-topbar-subtitle">
            Monitor bookings, providers and platform
            performance.
          </p>

        </div>

        <button
          className="admin-logout-btn"
          onClick={handleAdminLogout}
        >
          🚪 Logout
        </button>

      </div>


      {/* =====================================
          MAIN STATISTICS
      ===================================== */}

      <div className="admin-stats">

        <div className="stat-card total">

          <div className="stat-icon">
            📊
          </div>

          <div>

            <p>Total Bookings</p>

            <h2>
              {totalBookings}
            </h2>

            <span>
              All platform bookings
            </span>

          </div>

        </div>


        <div className="stat-card pending">

          <div className="stat-icon">
            ⏳
          </div>

          <div>

            <p>Pending</p>

            <h2>
              {pendingBookings}
            </h2>

            <span>
              Waiting for action
            </span>

          </div>

        </div>


        <div className="stat-card confirmed">

          <div className="stat-icon">
            ✅
          </div>

          <div>

            <p>Confirmed</p>

            <h2>
              {confirmedBookings}
            </h2>

            <span>
              Active bookings
            </span>

          </div>

        </div>


        <div className="stat-card completed">

          <div className="stat-icon">
            ✔️
          </div>

          <div>

            <p>Completed</p>

            <h2>
              {completedBookings}
            </h2>

            <span>
              Successfully finished
            </span>

          </div>

        </div>


        <div className="stat-card cancelled">

          <div className="stat-icon">
            ❌
          </div>

          <div>

            <p>Cancelled</p>

            <h2>
              {cancelledBookings}
            </h2>

            <span>
              Cancelled bookings
            </span>

          </div>

        </div>


        {/* TOTAL REVENUE */}

        <div className="stat-card revenue">

          <div className="stat-icon">
            💰
          </div>

          <div>

            <p>Total Revenue</p>

            <h2>
              ₹{totalAmountGenerated.toLocaleString("en-IN")}
            </h2>

            <span>
              From completed bookings
            </span>

          </div>

        </div>


        {/* AVERAGE BOOKING */}

        <div className="stat-card average">

          <div className="stat-icon">
            💵
          </div>

          <div>

            <p>Average Booking</p>

            <h2>
              ₹{averageBookingValue.toLocaleString("en-IN")}
            </h2>

            <span>
              Average completed booking
            </span>

          </div>

        </div>

      </div>


      {/* =====================================
          ANALYTICS SECTION
      ===================================== */}

      <section className="admin-analytics-section">

        <div className="analytics-section-heading">

          <div>

            <span>
              INSIGHTS & PERFORMANCE
            </span>

            <h2>
              📈 Platform Analytics
            </h2>

            <p>
              Get a quick overview of how ServiceHub
              is performing.
            </p>

          </div>

          <div className="analytics-live-badge">

            <span></span>

            Live Data

          </div>

        </div>


        {/* =====================================
            ANALYTICS KPI CARDS
        ===================================== */}

        <div className="analytics-kpi-grid">

          <div className="analytics-kpi-card purple">

            <div className="analytics-kpi-top">

              <span>
                Completion Rate
              </span>

              <div>
                🎯
              </div>

            </div>

            <h3>
              {completionRate}%
            </h3>

            <div className="analytics-progress">

              <span
                style={{
                  width: `${completionRate}%`
                }}
              ></span>

            </div>

            <p>
              Completed bookings
            </p>

          </div>


          <div className="analytics-kpi-card blue">

            <div className="analytics-kpi-top">

              <span>
                Confirmation Rate
              </span>

              <div>
                ⚡
              </div>

            </div>

            <h3>
              {confirmationRate}%
            </h3>

            <div className="analytics-progress">

              <span
                style={{
                  width: `${confirmationRate}%`
                }}
              ></span>

            </div>

            <p>
              Confirmed or completed
            </p>

          </div>


          <div className="analytics-kpi-card pink">

            <div className="analytics-kpi-top">

              <span>
                Cancellation Rate
              </span>

              <div>
                📉
              </div>

            </div>

            <h3>
              {cancellationRate}%
            </h3>

            <div className="analytics-progress">

              <span
                style={{
                  width: `${cancellationRate}%`
                }}
              ></span>

            </div>

            <p>
              Cancelled bookings
            </p>

          </div>


          <div className="analytics-kpi-card cyan">

            <div className="analytics-kpi-top">

              <span>
                Total Providers
              </span>

              <div>
                👨‍🔧
              </div>

            </div>

            <h3>
              {providers.length}
            </h3>

            <div className="analytics-provider-mini">

              <span>
                Active service providers
              </span>

            </div>

            <p>
              Available on ServiceHub
            </p>

          </div>

        </div>


        {/* =====================================
            CHART ROW
        ===================================== */}

        <div className="analytics-chart-grid">


          {/* BOOKING STATUS */}

          <div className="analytics-panel">

            <div className="analytics-panel-header">

              <div>

                <span>
                  BOOKING OVERVIEW
                </span>

                <h3>
                  Booking Status
                </h3>

              </div>

              <div className="analytics-panel-icon">
                📊
              </div>

            </div>


            <div className="status-chart">

              {statusAnalytics.map((item) => {

                const percentage =
                  totalBookings > 0
                    ? Math.round(
                        (item.value /
                          totalBookings) *
                          100
                      )
                    : 0;

                return (

                  <div
                    className="status-chart-row"
                    key={item.label}
                  >

                    <div className="status-chart-info">

                      <div>

                        <span
                          className={`status-dot ${item.className}`}
                        ></span>

                        <strong>
                          {item.label}
                        </strong>

                      </div>

                      <span>
                        {item.value}
                      </span>

                    </div>


                    <div className="status-chart-track">

                      <div
                        className={`status-chart-bar ${item.className}`}
                        style={{
                          width: `${percentage}%`
                        }}
                      ></div>

                    </div>


                    <small>
                      {percentage}% of total
                    </small>

                  </div>

                );

              })}

            </div>

          </div>


          {/* =====================================
              REVENUE ANALYTICS
          ===================================== */}

          <div className="analytics-panel revenue-panel">

            <div className="analytics-panel-header">

              <div>

                <span>
                  REVENUE PERFORMANCE
                </span>

                <h3>
                  💰 Revenue Overview
                </h3>

              </div>

              <div className="analytics-panel-icon">
                💰
              </div>

            </div>


            <div className="revenue-big-number">

              ₹{totalAmountGenerated.toLocaleString("en-IN")}

              <span>
                generated revenue
              </span>

            </div>


            <div className="revenue-stats">

              <div>

                <span>
                  Completed
                </span>

                <strong>
                  {completedBookings}
                </strong>

              </div>

              <div>

                <span>
                  Average
                </span>

                <strong>
                  ₹{averageBookingValue.toLocaleString("en-IN")}
                </strong>

              </div>

            </div>

          </div>

        </div>


        {/* =====================================
            SERVICE + REVENUE ANALYTICS
        ===================================== */}

        <div className="analytics-chart-grid">


          {/* REVENUE BY SERVICE */}

          <div className="analytics-panel">

            <div className="analytics-panel-header">

              <div>

                <span>
                  SERVICE REVENUE
                </span>

                <h3>
                  📈 Revenue by Service
                </h3>

              </div>

              <div className="analytics-panel-icon">
                📊
              </div>

            </div>


            {revenueAnalytics.length === 0 ? (

              <div className="analytics-empty">

                No completed booking revenue available.

              </div>

            ) : (

              <div className="revenue-chart">

                {revenueAnalytics.map(
                  (item, index) => {

                    const width =
                      maxRevenue > 0
                        ? (item.amount /
                            maxRevenue) *
                          100
                        : 0;

                    return (

                      <div
                        className="revenue-chart-row"
                        key={item.service}
                      >

                        <div className="revenue-chart-info">

                          <div>

                            <span className="revenue-rank">
                              #{index + 1}
                            </span>

                            <strong>
                              {item.service}
                            </strong>

                          </div>

                          <b>
                            ₹
                            {item.amount.toLocaleString(
                              "en-IN"
                            )}
                          </b>

                        </div>


                        <div className="revenue-chart-track">

                          <div
                            className="revenue-chart-bar"
                            style={{
                              width: `${width}%`
                            }}
                          ></div>

                        </div>

                      </div>

                    );

                  }
                )}

              </div>

            )}

          </div>


          {/* SERVICE PERFORMANCE */}

          <div className="analytics-panel">

            <div className="analytics-panel-header">

              <div>

                <span>
                  SERVICE DEMAND
                </span>

                <h3>
                  Popular Services
                </h3>

              </div>

              <div className="analytics-panel-icon">
                🔧
              </div>

            </div>


            {serviceAnalytics.length === 0 ? (

              <div className="analytics-empty">

                No service data available yet.

              </div>

            ) : (

              <div className="service-chart">

                {serviceAnalytics
                  .slice(0, 5)
                  .map((item, index) => {

                    const width =
                      (item.count /
                        maxServiceBookings) *
                      100;

                    return (

                      <div
                        className="service-chart-row"
                        key={item.service}
                      >

                        <div className="service-chart-label">

                          <span>
                            #{index + 1}
                          </span>

                          <strong>
                            {item.service}
                          </strong>

                          <b>
                            {item.count}
                          </b>

                        </div>

                        <div className="service-chart-track">

                          <div
                            className="service-chart-bar"
                            style={{
                              width: `${width}%`
                            }}
                          ></div>

                        </div>

                      </div>

                    );

                  })}

              </div>

            )}

          </div>

        </div>


        {/* =====================================
            SECOND ANALYTICS ROW
        ===================================== */}

        <div className="analytics-bottom-grid">


          {/* TOP PROVIDERS */}

          <div className="analytics-panel">

            <div className="analytics-panel-header">

              <div>

                <span>
                  PROVIDER PERFORMANCE
                </span>

                <h3>
                  🏆 Top Providers
                </h3>

              </div>

            </div>


            {providerAnalytics.length === 0 ? (

              <div className="analytics-empty">

                No provider booking data available.

              </div>

            ) : (

              <div className="provider-performance-list">

                {providerAnalytics.map(
                  (provider, index) => {

                    const successRate =
                      provider.bookings > 0
                        ? Math.round(
                            (provider.completed /
                              provider.bookings) *
                              100
                          )
                        : 0;

                    return (

                      <div
                        className="provider-performance-item"
                        key={provider.name}
                      >

                        <div className="provider-rank">
                          {index + 1}
                        </div>

                        <div className="provider-performance-info">

                          <strong>
                            {provider.name}
                          </strong>

                          <span>
                            {provider.bookings} bookings
                          </span>

                        </div>

                        <div className="provider-success">

                          <strong>
                            {successRate}%
                          </strong>

                          <span>
                            success
                          </span>

                        </div>

                      </div>

                    );

                  }
                )}

              </div>

            )}

          </div>


          {/* LOCATION ANALYTICS */}

          <div className="analytics-panel">

            <div className="analytics-panel-header">

              <div>

                <span>
                  LOCATION DEMAND
                </span>

                <h3>
                  📍 Popular Locations
                </h3>

              </div>

            </div>


            {locationAnalytics.length === 0 ? (

              <div className="analytics-empty">

                No location data available.

              </div>

            ) : (

              <div className="location-list">

                {locationAnalytics
                  .slice(0, 5)
                  .map((item) => {

                    const percentage =
                      (item.count /
                        maxLocationBookings) *
                      100;

                    return (

                      <div
                        className="location-item"
                        key={item.location}
                      >

                        <div className="location-info">

                          <span>
                            📍
                          </span>

                          <strong>
                            {item.location}
                          </strong>

                          <b>
                            {item.count}
                          </b>

                        </div>

                        <div className="location-track">

                          <div
                            className="location-bar"
                            style={{
                              width: `${percentage}%`
                            }}
                          ></div>

                        </div>

                      </div>

                    );

                  })}

              </div>

            )}

          </div>

        </div>


        {/* =====================================
            RECENT ACTIVITY
        ===================================== */}

        <div className="analytics-panel analytics-recent-panel">

          <div className="analytics-panel-header">

            <div>

              <span>
                LATEST ACTIVITY
              </span>

              <h3>
                🕒 Recent Bookings
              </h3>

            </div>

            <div className="recent-count">
              {recentBookings.length} latest
            </div>

          </div>


          {recentBookings.length === 0 ? (

            <div className="analytics-empty">

              No recent bookings available.

            </div>

          ) : (

            <div className="recent-bookings-list">

              {recentBookings.map((booking) => (

                <div
                  className="recent-booking-item"
                  key={booking._id}
                >

                  <div className="recent-booking-icon">
                    🔧
                  </div>

                  <div className="recent-booking-main">

                    <strong>
                      {booking.providerName ||
                        "Service Provider"}
                    </strong>

                    <span>
                      {booking.service ||
                        "Service"}{" "}
                      •{" "}
                      {booking.customerName ||
                        "Customer"}
                    </span>

                  </div>

                  <div className="recent-booking-date">

                    <span>
                      {booking.date || "No date"}
                    </span>

                    <small>
                      {booking.time || "No time"}
                    </small>

                  </div>

                  <span
                    className={`admin-status ${booking.status?.toLowerCase()}`}
                  >
                    {booking.status}
                  </span>

                </div>

              ))}

            </div>

          )}

        </div>

      </section>


      {/* =====================================
          PROVIDER MANAGEMENT
      ===================================== */}

      <div className="admin-header">

        <div>

          <span className="admin-section-label">
            MANAGEMENT
          </span>

          <h2>
            👨‍🔧 Service Providers
          </h2>

        </div>

        <button
          onClick={openAddProvider}
        >
          ➕ Add Provider
        </button>

      </div>


      {/* =====================================
          PROVIDER LIST
      ===================================== */}

      {providers.length === 0 ? (

        <div className="no-bookings">

          <h3>
            No providers found
          </h3>

          <p>
            Add your first service provider.
          </p>

        </div>

      ) : (

        <div className="admin-bookings-grid">

          {providers.map((provider) => (

            <div
              className="admin-booking-card"
              key={provider._id}
            >

              <div className="provider-card-top">

                <div className="provider-avatar">
                  👨‍🔧
                </div>

                <div>

                  <h3>
                    {provider.name}
                  </h3>

                  <span className="provider-service-tag">
                    {provider.service}
                  </span>

                </div>

              </div>


              <p>
                <strong>Location:</strong>{" "}
                {provider.location}
              </p>

              <p>
                <strong>Price:</strong>{" "}
                ₹{provider.price}
              </p>

              <p>
                <strong>Rating:</strong>{" "}
                ⭐ {provider.rating}
              </p>

              <p>
                <strong>Experience:</strong>{" "}
                {provider.experience} years
              </p>


              <div className="admin-actions">

                <button
                  className="confirm-btn"
                  onClick={() =>
                    openEditProvider(provider)
                  }
                >
                  ✏️ Edit
                </button>


                <button
                  className="admin-cancel-btn"
                  onClick={() =>
                    deleteProvider(provider._id)
                  }
                >
                  🗑️ Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      )}


      {/* =====================================
          PROVIDER FORM MODAL
      ===================================== */}

      {showProviderForm && (

        <div className="admin-modal-overlay">

          <div className="admin-modal">

            <button
              className="admin-modal-close"
              onClick={() =>
                setShowProviderForm(false)
              }
            >
              ×
            </button>


            <div className="modal-heading">

              <div className="modal-icon">
                {editingProvider ? "✏️" : "➕"}
              </div>

              <div>

                <span>
                  SERVICEHUB
                </span>

                <h2>
                  {editingProvider
                    ? "Edit Provider"
                    : "Add Provider"}
                </h2>

              </div>

            </div>


            <form
              onSubmit={handleProviderSubmit}
            >

              <label>
                Provider Name
              </label>

              <input
                type="text"
                name="name"
                value={providerData.name}
                onChange={handleProviderChange}
                placeholder="Enter provider name"
                required
              />


              <label>
                Service
              </label>

              <select
                name="service"
                value={providerData.service}
                onChange={handleProviderChange}
                required
              >

                <option value="">
                  Select Service
                </option>
                

                <option value="Plumbing">
                  Plumbing
                </option>
                <option value="Electrical">
                  Electrical
                </option>
                <option value="Cleaning">
                  Cleaning
                </option>
                <option value="Computer Repair">
                  Computer Repair
                </option>
                <option value="Painting">
                  Painting
                </option>
                <option value="Appliance Repair">
                  Appliance Repair
                </option>                
                 <option value="AC Repair">
                  AC Repair
                </option>
                <option value="Water Purifier">
                  Water Purifier
                </option>
                <option value="TV Repair">
                  TV Repair
                </option>

                <option value="Plumber">
                  Plumber
                </option>

                <option value="Car Service">
                  Car Service
                </option>

                <option value="Bike Service">
                  Bike Service
                </option>
                <option value="Carpentry">
                  Carpentry
                </option>

              </select>


              <label>
                Location
              </label>

              <select
                name="location"
                value={providerData.location}
                onChange={handleProviderChange}
                required
              >

                <option value="">
                  Select Location
                </option>

<option value="Andhra Pradesh">Andhra Pradesh</option>
<option value="Arunachal Pradesh">Arunachal Pradesh</option>
<option value="Assam">Assam</option>
<option value="Bihar">Bihar</option>
<option value="Chhattisgarh">Chhattisgarh</option>
<option value="Goa">Goa</option>
<option value="Gujarat">Gujarat</option>
<option value="Haryana">Haryana</option>
<option value="Himachal Pradesh">Himachal Pradesh</option>
<option value="Jharkhand">Jharkhand</option>
<option value="Karnataka">Karnataka</option>
<option value="Kerala">Kerala</option>
<option value="Madhya Pradesh">Madhya Pradesh</option>
<option value="Maharashtra">Maharashtra</option>
<option value="Manipur">Manipur</option>
<option value="Meghalaya">Meghalaya</option>
<option value="Mizoram">Mizoram</option>
<option value="Nagaland">Nagaland</option>
<option value="Odisha">Odisha</option>
<option value="Punjab">Punjab</option>
<option value="Rajasthan">Rajasthan</option>
<option value="Sikkim">Sikkim</option>
<option value="Tamil Nadu">Tamil Nadu</option>
<option value="Telangana">Telangana</option>
<option value="Tripura">Tripura</option>
<option value="Uttar Pradesh">Uttar Pradesh</option>
<option value="Uttarakhand">Uttarakhand</option>
<option value="West Bengal">West Bengal</option>

{/* Union Territories */}

<option value="Andaman and Nicobar Islands">
  Andaman and Nicobar Islands
</option>
<option value="Chandigarh">Chandigarh</option>
<option value="Dadra and Nagar Haveli and Daman and Diu">
  Dadra and Nagar Haveli and Daman and Diu
</option>
<option value="Delhi">Delhi</option>
<option value="Jammu and Kashmir">Jammu and Kashmir</option>
<option value="Ladakh">Ladakh</option>
<option value="Lakshadweep">Lakshadweep</option>
<option value="Puducherry">Puducherry</option>

              </select>


              <label>
                Price
              </label>

              <input
                type="number"
                name="price"
                value={providerData.price}
                onChange={handleProviderChange}
                placeholder="Enter price"
                min="0"
                required
              />


              <label>
                Rating
              </label>

              <input
                type="number"
                name="rating"
                value={providerData.rating}
                onChange={handleProviderChange}
                placeholder="Example: 4.5"
                min="0"
                max="5"
                step="0.1"
                required
              />


              <label>
                Experience
              </label>

              <input
                type="number"
                name="experience"
                value={providerData.experience}
                onChange={handleProviderChange}
                placeholder="Years of experience"
                min="0"
                required
              />


              <button
                type="submit"
                className="confirm-booking-btn"
              >
                {editingProvider
                  ? "Update Provider"
                  : "Add Provider"}
              </button>

            </form>

          </div>

        </div>

      )}


      {/* =====================================
          BOOKINGS HEADER
      ===================================== */}

      <div className="admin-header">

        <div>

          <span className="admin-section-label">
            BOOKINGS MANAGEMENT
          </span>

          <h2>
            📋 All Bookings
          </h2>

        </div>

        <button
          onClick={loadBookings}
        >
          🔄 Refresh
        </button>

      </div>


      {/* =====================================
          SEARCH & FILTER
      ===================================== */}

      <div className="admin-filters">

        <input
          type="text"
          placeholder="🔍 Search customer, provider, phone..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
        />


        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value)
          }
        >

          <option value="">
            All Status
          </option>

          <option value="Pending">
            Pending
          </option>

          <option value="Confirmed">
            Confirmed
          </option>

          <option value="Completed">
            Completed
          </option>

          <option value="Cancelled">
            Cancelled
          </option>

        </select>

      </div>


      {/* =====================================
          BOOKINGS
      ===================================== */}

      {filteredBookings.length === 0 ? (

        <div className="no-bookings">

          <h3>
            No bookings found
          </h3>

          <p>
            Try changing your search or filter.
          </p>

        </div>

      ) : (

        <div className="admin-bookings-grid">

          {filteredBookings.map((booking) => (

            <div
              className="admin-booking-card"
              key={booking._id}
            >

              <div className="booking-card-heading">

                <div>

                  <span className="booking-service">
                    {booking.service}
                  </span>

                  <h3>
                    🔧 {booking.providerName}
                  </h3>

                </div>

                <span
                  className={`admin-status ${booking.status?.toLowerCase()}`}
                >
                  {booking.status}
                </span>

              </div>


              <p>
                <strong>Customer:</strong>{" "}
                {booking.customerName}
              </p>


              <p>
                <strong>Phone:</strong>{" "}
                {booking.phone}
              </p>


              <p>
                <strong>Date:</strong>{" "}
                {booking.date}
              </p>


              <p>
                <strong>Time:</strong>{" "}
                {booking.time}
              </p>


              <div className="admin-actions">


                {/* PENDING → CONFIRMED */}

                {booking.status === "Pending" && (

                  <button
                    className="confirm-btn"
                    onClick={() =>
                      updateBookingStatus(
                        booking._id,
                        "Confirmed"
                      )
                    }
                  >
                    ✅ Confirm
                  </button>

                )}


                {/* CONFIRMED → COMPLETED */}

                {booking.status === "Confirmed" && (

                  <button
                    className="complete-btn"
                    onClick={() =>
                      updateBookingStatus(
                        booking._id,
                        "Completed"
                      )
                    }
                  >
                    ✔️ Complete
                  </button>

                )}


                {/* CANCEL */}

                {booking.status !== "Cancelled" &&
                  booking.status !== "Completed" && (

                  <button
                    className="admin-cancel-btn"
                    onClick={() =>
                      updateBookingStatus(
                        booking._id,
                        "Cancelled"
                      )
                    }
                  >
                    ❌ Cancel
                  </button>

                )}

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}

export default Admin;