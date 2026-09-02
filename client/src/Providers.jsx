
import { useEffect, useState } from "react";
import "./Providers.css";

function Providers() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [serviceFilter, setServiceFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");

  // =========================================
  // FETCH PROVIDERS
  // =========================================

  useEffect(() => {
    fetch("http://localhost:5000/api/providers")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch providers");
        }

        return res.json();
      })
      .then((data) => {
        setProviders(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error("Provider fetch error:", error);
        setProviders([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // =========================================
  // FILTER DATA
  // =========================================

  const services = [
    "All",
    ...new Set(
      providers
        .map((provider) => provider.service)
        .filter(Boolean)
    ),
  ];

  const locations = [
    "All",
    ...new Set(
      providers
        .map((provider) => provider.location)
        .filter(Boolean)
    ),
  ];

  // =========================================
  // FILTER PROVIDERS
  // =========================================

  const filteredProviders = providers.filter((provider) => {
    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      !searchText ||
      provider.name?.toLowerCase().includes(searchText) ||
      provider.service?.toLowerCase().includes(searchText) ||
      provider.location?.toLowerCase().includes(searchText);

    const matchesService =
      serviceFilter === "All" ||
      provider.service === serviceFilter;

    const matchesLocation =
      locationFilter === "All" ||
      provider.location === locationFilter;

    return (
      matchesSearch &&
      matchesService &&
      matchesLocation
    );
  });

  // =========================================
  // BOOK PROVIDER
  // =========================================

  const handleBookNow = (provider) => {
    const customerName =
      localStorage.getItem("customerName");

    const customerPhone =
      localStorage.getItem("customerPhone");

    if (!customerName || !customerPhone) {
      window.location.href = "/login";
      return;
    }

    const params = new URLSearchParams();

    params.set("providerId", provider._id);
    params.set("providerName", provider.name || "");
    params.set("service", provider.service || "");

    window.location.href =
      "/customer?" + params.toString();
  };

  return (
    <div className="providers-page">

      {/* =========================================
          NAVBAR
      ========================================= */}

      <nav className="providers-navbar">

        <div
          className="providers-logo"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          <div className="providers-logo-icon">
            ⌂
          </div>

          <span>
            SERVICE<span>HUB</span>
          </span>
        </div>

        <div className="providers-nav-links">

          <a href="/">
            Home
          </a>

          <a href="/services">
            Services
          </a>

          <a
            href="/providers"
            className="active"
          >
            Providers
          </a>

          <a href="/how-it-works">
            How It Works
          </a>

          <a href="/about">
            About Us
          </a>

        </div>

        <div className="providers-nav-buttons">

          {/* <a
            href="/customer"
            className="providers-customer-btn"
          >
            Customer
          </a> */}

          <a
            href="/role-selection"
            className="providers-login-btn"
          >
            Login
          </a>

        </div>

      </nav>


      {/* =========================================
          HERO
      ========================================= */}

      <section className="providers-hero">

        <div className="providers-hero-content">

          <div className="providers-small-title">
            TRUSTED PROFESSIONALS
          </div>

          <h1>
            Find the Right
            <br />
            <span>Service Provider</span>
          </h1>

          <p>
            Connect with trusted professionals
            near you and get your work done
            quickly and reliably.
          </p>

        </div>

      </section>


      {/* =========================================
          SEARCH + FILTER
      ========================================= */}

      <section className="providers-search-section">

        <div className="providers-search-box">

          <div className="provider-search-input">

            <span>🔍</span>

            <input
              type="text"
              placeholder="Search provider, service or location..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>


          <div className="provider-filter">

            <span>🛠️</span>

            <select
              value={serviceFilter}
              onChange={(e) =>
                setServiceFilter(e.target.value)
              }
            >
              {services.map((service) => (
                <option
                  key={service}
                  value={service}
                >
                  {service}
                </option>
              ))}
            </select>

          </div>


          <div className="provider-filter">

            <span>📍</span>

            <select
              value={locationFilter}
              onChange={(e) =>
                setLocationFilter(e.target.value)
              }
            >
              {locations.map((location) => (
                <option
                  key={location}
                  value={location}
                >
                  {location}
                </option>
              ))}
            </select>

          </div>

        </div>

      </section>


      {/* =========================================
          PROVIDERS
      ========================================= */}

      <section className="providers-section">

        <div className="providers-section-heading">

          <div>
            <h2>
              Available Providers
            </h2>

            <p>
              Trusted professionals ready to help
            </p>
          </div>

          <div className="provider-count">
            {filteredProviders.length} Providers
          </div>

        </div>


        {/* LOADING */}

        {loading && (
          <div className="providers-message">
            <div className="provider-loader"></div>

            <p>
              Finding trusted providers...
            </p>
          </div>
        )}


        {/* NO PROVIDERS */}

        {!loading &&
          filteredProviders.length === 0 && (

            <div className="providers-message">

              <div className="empty-provider-icon">
                🔎
              </div>

              <h3>
                No providers found
              </h3>

              <p>
                Try changing your search or filters.
              </p>

            </div>

          )}


        {/* PROVIDER GRID */}

        {!loading &&
          filteredProviders.length > 0 && (

            <div className="providers-grid">

              {filteredProviders.map(
                (provider, index) => (

                  <div
                    className="provider-card"
                    key={provider._id || index}
                  >

                    {/* CARD TOP */}

                    <div className="provider-card-top">

                      <div className="provider-avatar">

                        {provider.name
                          ?.charAt(0)
                          ?.toUpperCase() || "P"}

                      </div>

                      <div className="provider-verified">
                        ✓ Verified
                      </div>

                    </div>


                    {/* NAME */}

                    <h3>
                      {provider.name ||
                        "Service Provider"}
                    </h3>


                    {/* SERVICE */}

                    <div className="provider-service">

                      <span>
                        🛠️
                      </span>

                      {provider.service ||
                        "Professional Service"}

                    </div>


                    {/* LOCATION */}

                    <div className="provider-location">

                      <span>
                        📍
                      </span>

                      {provider.location ||
                        "Location not specified"}

                    </div>


                    {/* DETAILS */}

                    <div className="provider-details">

                      <div className="provider-detail">

                        <span className="detail-label">
                          Rating
                        </span>

                        <strong>
                          ⭐{" "}
                          {provider.rating ??
                            "New"}
                        </strong>

                      </div>


                      <div className="provider-detail">

                        <span className="detail-label">
                          Experience
                        </span>

                        <strong>
                          {provider.experience
                            ? `${provider.experience} yrs`
                            : "—"}
                        </strong>

                      </div>


                      <div className="provider-detail">

                        <span className="detail-label">
                          Starting
                        </span>

                        <strong>
                          ₹
                          {provider.price ??
                            "—"}
                        </strong>

                      </div>

                    </div>


                    {/* AVAILABILITY */}

                    <div className="provider-availability">

                      <span className="availability-dot"></span>

                      Available

                    </div>


                    {/* BUTTON */}

                    <button
                      className="provider-book-btn"
                      onClick={() =>
                        handleBookNow(provider)
                      }
                    >
                      View & Book
                      <span>→</span>
                    </button>

                  </div>

                )
              )}

            </div>

          )}

      </section>


      {/* =========================================
          CTA
      ========================================= */}

      <section className="providers-cta">

        <div>

          <span>
            NEED A SERVICE?
          </span>

          <h2>
            Can't find the right provider?
          </h2>

          <p>
            Explore all available services and
            find the perfect professional for your needs.
          </p>

        </div>

        <a href="/services">
          Explore Services →
        </a>

      </section>


      {/* =========================================
          FOOTER
      ========================================= */}

      <footer className="providers-footer">

        <div className="providers-footer-brand">

          <div className="providers-logo">

            <div className="providers-logo-icon">
              ⌂
            </div>

            <span>
              SERVICE<span>HUB</span>
            </span>

          </div>

          <p>
            ServiceHub connects you with trusted
            professionals for your daily service needs.
          </p>

        </div>


        <div className="providers-footer-column">

          <h3>
            Quick Links
          </h3>

          <a href="/">
            Home
          </a>

          <a href="/services">
            Services
          </a>

          <a href="/providers">
            Providers
          </a>

          <a href="/how-it-works">
            How It Works
          </a>

          <a href="/about">
            About Us
          </a>

        </div>


        <div className="providers-footer-column">

          <h3>
            For Customers
          </h3>

          <a href="/login">
            Customer Login
          </a>

          <a href="/customer">
            My Bookings
          </a>

          <a href="/services">
            Find Services
          </a>
            <a href="/help-support">
            Help & Support
          </a>

          <a href="/terms-conditions">
            Terms & Conditions
          </a>

        </div>


        <div className="providers-footer-column">

          <h3>
            For Providers
          </h3>

          <a href="/provider-login">
            Provider Login
          </a>

          <a href="/provider-dashboard">
            Provider Dashboard
          </a>

          <a href="/provider-login">
            Register as Provider
          </a>

        </div>


        <div className="providers-footer-column">

          <h3>
            Contact Us
          </h3>

          <p>
            📞 +91 12345 67890
          </p>

          <p>
            ✉️ support@servicehub.com
          </p>

          <p>
            📍New Delhi, India
          </p>

        </div>


        <div className="providers-footer-bottom">

          © 2026 ServiceHub. All rights reserved.

        </div>

      </footer>

    </div>
  );
}

export default Providers;

