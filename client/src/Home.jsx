import { useState } from "react";
import "./Home.css";

function Home() {
  const [searchService, setSearchService] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (searchService.trim()) {
      params.set("service", searchService.trim());
    }

    if (searchLocation.trim()) {
      params.set("location", searchLocation.trim());
    }

    const query = params.toString();

    window.location.href = query
      ? "/customer?" + query
      : "/customer";
  };

  const services = [
    {
      icon: "🔧",
      name: "Plumbing",
      description: "Repair & Installation",
    },
    {
      icon: "⚡",
      name: "Electrical",
      description: "Installation & Repair",
    },
    {
      icon: "🧹",
      name: "Cleaning",
      description: "Home & Office",
    },
    {
      icon: "💻",
      name: "Computer Repair",
      description: "Repair & Support",
    },
    {
      icon: "🎨",
      name: "Painting",
      description: "Home & Office",
    },
    {
      icon: "🔌",
      name: "Appliance Repair",
      description: "Repair & Service",
    },
  ];

  return (
    <div className="home">

      {/* =========================================
          NAVBAR
      ========================================= */}

      <nav className="home-navbar">

        <div className="home-logo">
          <div className="logo-icon">⌂</div>

          <span>
            SERVICE<span>HUB</span>
          </span>
        </div>

        <div className="nav-links">

          <a href="/" className="active">
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

        <div className="nav-buttons">

          {/* <a
            href="/customer"
            className="login-btn"
          >
            Customer
          </a> */}

          <a
            href="/role-selection"
            className="get-started-btn"
          >
            Login
          </a>

        </div>

      </nav>


      {/* =========================================
          HERO SECTION
      ========================================= */}

      <section className="hero-section">

        <div className="hero-content">

          <p className="hero-small-title">
            YOUR LOCAL SERVICE MARKETPLACE
          </p>

          <h1>
            Find Trusted
            <br />
            <span>Services Near You</span>
          </h1>

          <p className="hero-description">
            Book reliable professionals for your daily needs.
            <br />
            Fast. Easy. Trusted.
          </p>

          <div className="trust-points">

            <div className="trust-item">
              <span>✓</span>
              Verified Professionals
            </div>

            <div className="trust-item">
              <span>₹</span>
              Affordable Pricing
            </div>

            <div className="trust-item">
              <span>⚡</span>
              Quick Booking
            </div>

          </div>

        </div>


        {/* =========================================
            HERO VISUAL
        ========================================= */}

        <div className="hero-visual">

          <div className="hero-circle"></div>

          <div className="provider-illustration">
            👨‍🔧
          </div>

          <div className="floating-icon icon-one">
            🔧
          </div>

          <div className="floating-icon icon-two">
            ⚡
          </div>

          <div className="floating-icon icon-three">
            🧹
          </div>

          <div className="floating-icon icon-four">
            💻
          </div>

        </div>

      </section>


      {/* =========================================
          POPULAR SERVICES
      ========================================= */}

      <section className="services-section">

        <div className="section-heading">

          <h2>
            Popular Services
          </h2>

          <p>
            Most booked services by our customers
          </p>

        </div>


        <div className="services-grid">

          {services.map((service, index) => (

            <div
              className="service-card"
              key={index}
            >

              {/* =================================
                  IMPORTANT 3D INNER WRAPPER
              ================================= */}

              <div className="service-card-inner">

                {/* FRONT SIDE */}

                <div className="service-face service-front">

                  <div className="service-icon">
                    {service.icon}
                  </div>

                  <h3>
                    {service.name}
                  </h3>

                  <p>
                    {service.description}
                  </p>

                  <a href="/services">
                    Book Now →
                  </a>

                </div>


                {/* BACK SIDE */}

                <div className="service-face service-back">

                  <div className="service-icon">
                    {service.icon}
                  </div>

                  <h3>
                    {service.name}
                  </h3>

                  <p>
                    {service.description}
                  </p>

                  <a href="/services">
                    Book Now →
                  </a>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* =========================================
          WHY SERVICEHUB
      ========================================= */}

      <section
        className="why-section"
        id="about"
      >

        <div className="section-heading">

          <h2>
            Why Choose ServiceHub?
          </h2>

        </div>


        <div className="why-grid">

          <div className="why-card">

            <div className="why-icon">
              ✓
            </div>

            <h3>
              Verified Professionals
            </h3>

            <p>
              All providers are background checked and verified.
            </p>

          </div>


          <div className="why-card">

            <div className="why-icon">
              ₹
            </div>

            <h3>
              Affordable Pricing
            </h3>

            <p>
              Get quality services at fair and transparent prices.
            </p>

          </div>


          <div className="why-card">

            <div className="why-icon">
              ⚡
            </div>

            <h3>
              Quick & Easy Booking
            </h3>

            <p>
              Book your service in just a few simple clicks.
            </p>

          </div>


          <div className="why-card">

            <div className="why-icon">
              ★
            </div>

            <h3>
              Customer Reviews
            </h3>

            <p>
              See real reviews from real customers.
            </p>

          </div>

        </div>

      </section>


      {/* =========================================
          HOW IT WORKS
      ========================================= */}

      <section
        className="how-section"
        id="how-it-works"
      >

        <div className="section-heading">

          <h2>
            How ServiceHub Works
          </h2>

          <p>
            Getting your work done is simple
          </p>

        </div>


        <div className="steps-container">

          <div className="step">

            <div className="step-number">
              1
            </div>

            <div className="step-icon">
              🔍
            </div>

            <h3>
              Find Service
            </h3>

            <p>
              Search for the service you need and compare options.
            </p>

          </div>


          <div className="step-arrow">
            →
          </div>


          <div className="step">

            <div className="step-number">
              2
            </div>

            <div className="step-icon">
              👥
            </div>

            <h3>
              Choose Provider
            </h3>

            <p>
              Select from trusted and highly rated service providers.
            </p>

          </div>


          <div className="step-arrow">
            →
          </div>


          <div className="step">

            <div className="step-number">
              3
            </div>

            <div className="step-icon">
              📅
            </div>

            <h3>
              Book Service
            </h3>

            <p>
              Book your service and relax while we take care of the rest.
            </p>

          </div>

        </div>

      </section>


      {/* =========================================
          CTA
      ========================================= */}

      <section className="cta-section">

        <div>

          <h2>
            Ready to get started?
          </h2>

          <p>
            Find trusted professionals and get your work done.
          </p>

        </div>


        <a href="/services">
          Explore Services →
        </a>

      </section>


      {/* =========================================
          FOOTER
      ========================================= */}

      <footer className="home-footer">

        <div className="footer-column footer-brand">

          <div className="home-logo footer-logo">

            <div className="logo-icon">
              ⌂
            </div>

            <span>
              SERVICE<span>HUB</span>
            </span>

          </div>


          <p>
            ServiceHub connects you with trusted professionals
            for your daily service needs.
          </p>


          <div className="social-icons">

            <span>f</span>
            <span>𝕏</span>
            <span>◎</span>
            <span>in</span>

          </div>

        </div>


        {/* QUICK LINKS */}

        <div className="footer-column">

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

          <a href="how-it-works">
            How It Works
          </a>

          <a href="/about">
            About Us
          </a>

        </div>


        {/* FOR CUSTOMERS */}

        <div className="footer-column">

          <h3>
            For Customers
          </h3>

          <a href="/role-selection">
            Login
          </a>

          <a href="/login">
            Customer Login
          </a>

          <a href="/my-bookings">
            My Bookings
          </a>

          <a href="/help-support">
            Help & Support
          </a>

          <a href="/terms-conditions">
            Terms & Conditions
          </a>

        </div>


        {/* FOR PROVIDERS */}

        <div className="footer-column">

          <h3>
            For Providers
          </h3>

          <a href="/provider-login">
            Provider Login
          </a>

          <a href="/provider-login">
            Register as Provider
          </a>

          <a href="/provider-dashboard">
            Provider Dashboard
          </a>

          
       
        </div>


        {/* CONTACT */}

        <div className="footer-column">

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


        <div className="footer-bottom">

          © 2026 ServiceHub. All rights reserved.

        </div>

      </footer>

    </div>
  );
}

export default Home;
