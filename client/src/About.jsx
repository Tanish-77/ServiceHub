
import "./About.css";

function About() {
  return (
    <div className="about-page">

      {/* ================= NAVBAR ================= */}
      <nav className="about-navbar">

        <div
          className="about-logo"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          <div className="about-logo-icon">⌂</div>

          <span>
            SERVICE<span>HUB</span>
          </span>
        </div>

        <div className="about-nav-links">
          <a href="/">Home</a>
          <a href="/services">Services</a>
          <a href="/providers">Providers</a>
          <a href="/how-it-works">How It Works</a>
          <a href="/about" className="active">
            About Us
          </a>
        </div>

        <div className="about-nav-buttons">
          {/* <a href="/customer" className="about-customer-btn">
            Customer
          </a> */}

          <a href="/role-selection" className="about-login-btn">
            Login
          </a>
        </div>

      </nav>


      {/* ================= HERO ================= */}
      <section className="about-hero">

        <div className="about-hero-bg-number">
          01
        </div>

        <div className="about-hero-content">

          <span className="about-label">
            ABOUT SERVICEHUB
          </span>

          <h1>
            Making Local
            <br />
            <span>Services Simple.</span>
          </h1>

          <p>
            ServiceHub is a local service marketplace designed
            to connect customers with trusted professionals
            quickly, easily and confidently.
          </p>

        </div>

        <div className="about-hero-side">

          <div className="about-round-badge">
            <span>TRUST</span>
            <strong>+</strong>
            <span>CONVENIENCE</span>
          </div>

        </div>

      </section>


      {/* ================= INTRO ================= */}
      <section className="about-intro">

        <div className="about-intro-number">
          02
        </div>

        <div className="about-intro-content">

          <span className="about-label">
            WHO WE ARE
          </span>

          <h2>
            One Place.
            <br />
            <span>Many Solutions.</span>
          </h2>

          <p>
            Finding a reliable professional for everyday work
            should not be complicated. ServiceHub brings
            customers and service providers together on one
            simple platform.
          </p>

          <p>
            Whether you need a home service, repair, maintenance
            or another local professional, ServiceHub helps you
            discover available providers, compare your options
            and book the service that fits your needs.
          </p>

        </div>

        <div className="about-intro-card">

          <div className="about-big-icon">
            🏠
          </div>

          <h3>
            Local Services
          </h3>

          <p>
            Trusted professionals,
            right when you need them.
          </p>

        </div>

      </section>


      {/* ================= MISSION ================= */}
      <section className="about-mission">

        <div className="about-mission-header">

          <span className="about-label">
            OUR MISSION
          </span>

          <h2>
            Building A Better
            <br />
            <span>Way To Get Things Done.</span>
          </h2>

        </div>

        <div className="about-mission-grid">

          <div className="mission-card mission-main">

            <div className="mission-icon">
              🎯
            </div>

            <h3>
              Make Services Accessible
            </h3>

            <p>
              We want customers to easily discover reliable
              professionals without wasting time searching
              through multiple platforms.
            </p>

          </div>


          <div className="mission-card">

            <div className="mission-icon">
              🤝
            </div>

            <h3>
              Create Trust
            </h3>

            <p>
              Ratings, reviews, experience and pricing help
              customers make more informed decisions.
            </p>

          </div>


          <div className="mission-card">

            <div className="mission-icon">
              ⚡
            </div>

            <h3>
              Keep It Simple
            </h3>

            <p>
              From finding a professional to booking a service,
              we keep the process straightforward.
            </p>

          </div>

        </div>

      </section>


      {/* ================= PROBLEM ================= */}
      <section className="about-problem">

        <div className="problem-left">

          <span className="about-label">
            THE PROBLEM
          </span>

          <h2>
            Finding The Right
            <br />
            <span>Professional Can Be Hard.</span>
          </h2>

        </div>

        <div className="problem-right">

          <div className="problem-item">
            <span>01</span>

            <div>
              <h3>
                Too Many Choices
              </h3>

              <p>
                Searching across different sources can
                make it difficult to know who to trust.
              </p>
            </div>
          </div>


          <div className="problem-item">
            <span>02</span>

            <div>
              <h3>
                Limited Information
              </h3>

              <p>
                Customers often struggle to compare pricing,
                experience and ratings in one place.
              </p>
            </div>
          </div>


          <div className="problem-item">
            <span>03</span>

            <div>
              <h3>
                Booking Hassle
              </h3>

              <p>
                Coordinating availability and appointments
                should be much easier.
              </p>
            </div>
          </div>

        </div>

      </section>


      {/* ================= WHY SERVICEHUB ================= */}
      <section className="about-why">

        <div className="about-why-heading">

          <span className="about-label">
            WHY SERVICEHUB
          </span>

          <h2>
            Designed Around
            <br />
            <span>Your Convenience.</span>
          </h2>

        </div>


        <div className="about-why-grid">

          <div className="why-card">
            <div className="why-number">
              01
            </div>

            <div className="why-icon">
              🔍
            </div>

            <h3>
              Easy Discovery
            </h3>

            <p>
              Find the service you need without
              unnecessary searching.
            </p>
          </div>


          <div className="why-card">
            <div className="why-number">
              02
            </div>

            <div className="why-icon">
              ⭐
            </div>

            <h3>
              Compare Providers
            </h3>

            <p>
              Explore ratings, experience, pricing
              and service details.
            </p>
          </div>


          <div className="why-card">
            <div className="why-number">
              03
            </div>

            <div className="why-icon">
              📅
            </div>

            <h3>
              Simple Booking
            </h3>

            <p>
              Select your preferred date and time
              and book your service.
            </p>
          </div>


          <div className="why-card">
            <div className="why-number">
              04
            </div>

            <div className="why-icon">
              🛡️
            </div>

            <h3>
              Better Decisions
            </h3>

            <p>
              Reviews and provider information help
              you choose with confidence.
            </p>
          </div>

        </div>

      </section>


      {/* ================= TWO SIDES ================= */}
      <section className="about-sides">

        <div className="side-card customer-side">

          <div className="side-top">
            <span>FOR CUSTOMERS</span>
            <div>👤</div>
          </div>

          <h2>
            Find.
            <br />
            Compare.
            <br />
            <span>Book.</span>
          </h2>

          <p>
            Discover professionals, compare your options
            and book the service that works best for you.
          </p>

          <a href="/services">
            Explore Services →
          </a>

        </div>


        <div className="side-card provider-side">

          <div className="side-top">
            <span>FOR PROVIDERS</span>
            <div>🛠️</div>
          </div>

          <h2>
            Showcase.
            <br />
            Connect.
            <br />
            <span>Grow.</span>
          </h2>

          <p>
            Build your professional presence, connect with
            customers and manage your service bookings.
          </p>

          <a href="/provider-login">
            Join as Provider →
          </a>

        </div>

      </section>


      {/* ================= VISION ================= */}
      <section className="about-vision">

        <div className="vision-number">
          05
        </div>

        <div className="vision-content">

          <span className="about-label">
            OUR VISION
          </span>

          <h2>
            A Smarter Way
            <br />
            To Find Local Services.
          </h2>

          <p>
            We envision a platform where finding a reliable
            professional is as simple as searching, comparing
            and booking — all from one place.
          </p>

        </div>

        <div className="vision-symbol">
          <div>✦</div>
          <span>CONNECTING<br />PEOPLE & SERVICES</span>
        </div>

      </section>


      {/* ================= CTA ================= */}
      <section className="about-cta">

        <div className="about-cta-content">

          <span className="about-label">
            GET STARTED
          </span>

          <h2>
            Your Next Service
            <br />
            <span>Starts Here.</span>
          </h2>

          <p>
            Find a trusted professional and get your
            work done with ServiceHub.
          </p>

          <a
            href="/services"
            className="about-cta-btn"
          >
            Find Your Service →
          </a>

        </div>

      </section>


      {/* ================= FOOTER ================= */}
      <footer className="about-footer">

        <div className="about-footer-brand">

          <div className="about-logo footer-about-logo">

            <div className="about-logo-icon">
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

          <div className="about-social">
            <span>f</span>
            <span>𝕏</span>
            <span>◎</span>
            <span>in</span>
          </div>

        </div>


        <div className="about-footer-column">

          <h3>Quick Links</h3>

          <a href="/">Home</a>
          <a href="/services">Services</a>
          <a href="/providers">Providers</a>
          <a href="/how-it-works">How It Works</a>
          <a href="/about">About Us</a>

        </div>


        <div className="about-footer-column">

          <h3>For Customers</h3>

          <a href="/role-selection">Login</a>
          <a href="/login">Customer Login</a>
          <a href="/my-bookings">My Bookings</a>
          
                      <a href="/help-support">
            Help & Support
          </a>

          <a href="/terms-conditions">
            Terms & Conditions
          </a>


        </div>


        <div className="about-footer-column">

          <h3>For Providers</h3>

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


        <div className="about-footer-column">

          <h3>Contact Us</h3>

          <p>📞 +91 12345 67890</p>
          <p>✉️ support@servicehub.com</p>
          <p>📍 New Delhi, India</p>

        </div>


        <div className="about-footer-bottom">
          © 2026 ServiceHub. All rights reserved.
        </div>

      </footer>

    </div>
  );
}

export default About;

