  
import "./HowItWorks.css";

function HowItWorks() {
  return (
    <div className="how-page">

      {/* ================= NAVBAR ================= */}
      <nav className="home-navbar">

        <div
          className="home-logo"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          <div className="logo-icon">⌂</div>
          <span>
            SERVICE<span>HUB</span>
          </span>
        </div>

        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/services">Services</a>
          <a href="/providers">Providers</a>
          <a href="/how-it-works" className="active">
            How It Works
          </a>
          <a href="/about">About Us</a>
        </div>

        <div className="nav-buttons">
          {/* <a href="/customer" className="login-btn">
            Customer
          </a> */}

          <a href="/role-selection" className="get-started-btn">
            Login
          </a>
        </div>

      </nav>


      {/* =====================================================
          HOW IT WORKS INTRO
      ===================================================== */}

      <section className="hiw-intro">

        <div className="hiw-intro-inner">

          <div className="hiw-intro-number">
            01
          </div>

          <div className="hiw-intro-content">

            <div className="hiw-label">
              HOW SERVICEHUB WORKS
            </div>

            <h1>
              From Search
              <br />
              <span>To Service.</span>
            </h1>

            <p>
              ServiceHub makes finding and booking reliable
              professionals simple. Follow six easy steps and
              get your work done without the hassle.
            </p>

          </div>

          <div className="hiw-intro-side">

            <div className="hiw-process-badge">
              <span>6</span>
              Simple
              <br />
              Steps
            </div>

            <div className="hiw-scroll-text">
              SCROLL TO EXPLORE ↓
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          PROCESS STEPS
      ===================================================== */}

      <section className="hiw-process-section">

        <div className="hiw-process-heading">

          <div>
            <span className="hiw-label">
              THE PROCESS
            </span>

            <h2>
              How Your Service
              <br />
              <span>Journey Works</span>
            </h2>
          </div>

          <p>
            Everything you need is available in one place —
            from discovering the right professional to
            completing your service.
          </p>

        </div>


        <div className="hiw-process-list">

          {/* STEP 1 */}
          <div className="hiw-process-card">

            <div className="process-left">
              <span className="process-number">01</span>

              <div className="process-icon">
                🔍
              </div>
            </div>

            <div className="process-main">

              <span>STEP 01</span>

              <h3>
                Find a Service
              </h3>

              <p>
                Search for the service you need. Explore
                different categories and discover professionals
                available near you.
              </p>

            </div>

            <div className="process-arrow">
              →
            </div>

          </div>


          {/* STEP 2 */}
          <div className="hiw-process-card">

            <div className="process-left">
              <span className="process-number">02</span>

              <div className="process-icon">
                👥
              </div>
            </div>

            <div className="process-main">

              <span>STEP 02</span>

              <h3>
                Compare Providers
              </h3>

              <p>
                Compare professionals using ratings,
                experience, pricing and the services
                they offer.
              </p>

            </div>

            <div className="process-arrow">
              →
            </div>

          </div>


          {/* STEP 3 */}
          <div className="hiw-process-card">

            <div className="process-left">
              <span className="process-number">03</span>

              <div className="process-icon">
                ⭐
              </div>
            </div>

            <div className="process-main">

              <span>STEP 03</span>

              <h3>
                Choose Your Provider
              </h3>

              <p>
                Select the professional who best matches
                your requirements, budget and preferred
                schedule.
              </p>

            </div>

            <div className="process-arrow">
              →
            </div>

          </div>


          {/* STEP 4 */}
          <div className="hiw-process-card">

            <div className="process-left">
              <span className="process-number">04</span>

              <div className="process-icon">
                📅
              </div>
            </div>

            <div className="process-main">

              <span>STEP 04</span>

              <h3>
                Book Your Service
              </h3>

              <p>
                Select your preferred date and time,
                confirm your booking and complete the
                payment securely.
              </p>

            </div>

            <div className="process-arrow">
              →
            </div>

          </div>


          {/* STEP 5 */}
          <div className="hiw-process-card">

            <div className="process-left">
              <span className="process-number">05</span>

              <div className="process-icon">
                🛠️
              </div>
            </div>

            <div className="process-main">

              <span>STEP 05</span>

              <h3>
                Get the Work Done
              </h3>

              <p>
                Your selected professional arrives and
                completes the service according to
                your booking.
              </p>

            </div>

            <div className="process-arrow">
              →
            </div>

          </div>


          {/* STEP 6 */}
          <div className="hiw-process-card">

            <div className="process-left">
              <span className="process-number">06</span>

              <div className="process-icon">
                ⭐
              </div>
            </div>

            <div className="process-main">

              <span>STEP 06</span>

              <h3>
                Rate & Review
              </h3>

              <p>
                Share your experience by rating the provider
                and leaving a review to help future customers.
              </p>

            </div>

            <div className="process-arrow">
              ✓
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          QUICK JOURNEY
      ===================================================== */}

      <section className="hiw-journey-section">

        <div className="hiw-journey-top">

          <div>
            <span className="hiw-label">
              AT A GLANCE
            </span>

            <h2>
              Your Complete
              <br />
              <span>Service Journey</span>
            </h2>
          </div>

          <p>
            One simple flow. No unnecessary steps.
            Just find, choose, book and get it done.
          </p>

        </div>


        <div className="hiw-journey-flow">

          <div className="journey-box">
            <div>🔍</div>
            <strong>Search</strong>
            <span>Find what you need</span>
          </div>

          <div className="journey-line">→</div>

          <div className="journey-box">
            <div>👥</div>
            <strong>Compare</strong>
            <span>Explore professionals</span>
          </div>

          <div className="journey-line">→</div>

          <div className="journey-box">
            <div>⭐</div>
            <strong>Choose</strong>
            <span>Select your provider</span>
          </div>

          <div className="journey-line">→</div>

          <div className="journey-box">
            <div>📅</div>
            <strong>Book</strong>
            <span>Select date & time</span>
          </div>

          <div className="journey-line">→</div>

          <div className="journey-box">
            <div>🛠️</div>
            <strong>Done</strong>
            <span>Get your work completed</span>
          </div>

        </div>

      </section>


      {/* =====================================================
          FOR PROVIDERS
      ===================================================== */}

      <section className="hiw-provider-section">

        <div className="hiw-provider-content">

          <span className="hiw-label">
            FOR SERVICE PROVIDERS
          </span>

          <h2>
            You Provide
            <br />
            <span>The Service.</span>
            <br />
            We Bring The Customers.
          </h2>

          <p>
            Join ServiceHub and connect with customers
            actively looking for reliable professionals.
          </p>

          <a
            href="/provider-login"
            className="hiw-provider-btn"
          >
            Join as a Provider →
          </a>

        </div>


        <div className="hiw-provider-features">

          <div className="provider-feature">
            <div className="feature-icon">
              📈
            </div>

            <div>
              <h3>
                Get More Customers
              </h3>

              <p>
                Reach customers actively searching
                for your services.
              </p>
            </div>
          </div>


          <div className="provider-feature">
            <div className="feature-icon">
              ⭐
            </div>

            <div>
              <h3>
                Build Your Reputation
              </h3>

              <p>
                Showcase your ratings, reviews and
                professional experience.
              </p>
            </div>
          </div>


          <div className="provider-feature">
            <div className="feature-icon">
              📅
            </div>

            <div>
              <h3>
                Manage Your Bookings
              </h3>

              <p>
                Manage your availability and upcoming
                customer bookings easily.
              </p>
            </div>
          </div>

        </div>

      </section>


      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="hiw-final">

        <div className="hiw-final-number">
          06
        </div>

        <div className="hiw-final-content">

          <span className="hiw-label">
            READY?
          </span>

          <h2>
            Now You Know
            <br />
            <span>How It Works.</span>
          </h2>

          <p>
            Find a trusted professional and get your
            service started today.
          </p>

          <a
            href="/services"
            className="hiw-final-btn"
          >
            Find Your Service →
          </a>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

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
            ServiceHub connects you with trusted
            professionals for your daily service needs.
          </p>

          <div className="social-icons">
            <span>f</span>
            <span>𝕏</span>
            <span>◎</span>
            <span>in</span>
          </div>

        </div>


        <div className="footer-column">

          <h3>Quick Links</h3>

          <a href="/">Home</a>
          <a href="/services">Services</a>
          <a href="/providers">Providers</a>
          <a href="/how-it-works">How It Works</a>
          <a href="/about">About Us</a>

        </div>


        <div className="footer-column">

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


        <div className="footer-column">

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

          <a href="#">
            Resources
          </a>

          <a href="#">
            Contact Us
          </a>

        </div>


        <div className="footer-column">

          <h3>Contact Us</h3>

          <p>📞 +91 12345 67890</p>
          <p>✉️ support@servicehub.com</p>
          <p>📍 New Delhi, India</p>

        </div>


        <div className="footer-bottom">
          © 2026 ServiceHub. All rights reserved.
        </div>

      </footer>

    </div>
  );
}

export default HowItWorks;
