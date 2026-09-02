import React from "react";
import "./HelpSupport.css";

function HelpSupport() {
  return (
    <div className="help-page">

      {/* NAVBAR */}
      <nav className="help-navbar">
        <div className="help-logo">
          <div className="help-logo-icon">S</div>
          <span>ServiceHub</span>
        </div>

        <div className="help-nav-links">
          <a href="/">Home</a>
          <a href="/services">Services</a>
          <a href="/providers">Providers</a>
          <a href="/how-it-works">How It Works</a>
          <a href="/about">About</a>
        </div>

        <div className="help-nav-buttons">
          <a href="/role-selection" className="help-customer-btn">
            Login
          </a>
          <a href="/role-selection" className="help-login-btn">
            Get Started
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="help-hero">
        <div className="help-hero-content">
          <span className="help-label">HELP & SUPPORT</span>

          <h1>
            How Can We <span>Help You?</span>
          </h1>

          <p>
            Find answers to common questions or get assistance with your
            ServiceHub experience.
          </p>
        </div>

        <div className="help-hero-circle">?</div>
      </section>

      {/* SUPPORT OPTIONS */}
      <section className="help-section">
        <div className="help-section-heading">
          <span>SUPPORT CENTER</span>
          <h2>We're Here To Help</h2>
          <p>
            Whether you're booking a service or providing one, we've got you
            covered.
          </p>
        </div>

        <div className="help-grid">

          <div className="help-card">
            <div className="help-card-icon">📅</div>
            <h3>Booking Help</h3>
            <p>
              Having trouble finding, booking, or managing a service?
              Learn how bookings work and what to do if something goes wrong.
            </p>
          </div>

          <div className="help-card">
            <div className="help-card-icon">💳</div>
            <h3>Payment Issues</h3>
            <p>
              Facing a payment problem? Get information about payments,
              failed transactions, and payment confirmation.
            </p>
          </div>

          <div className="help-card">
            <div className="help-card-icon">❌</div>
            <h3>Cancellation & Refunds</h3>
            <p>
              Need to cancel a booking? Understand cancellation rules,
              refunds, and what happens after cancellation.
            </p>
          </div>

          <div className="help-card">
            <div className="help-card-icon">👤</div>
            <h3>Account & Login</h3>
            <p>
              Problems logging in or accessing your account? We can help
              you get back into your ServiceHub account.
            </p>
          </div>

          <div className="help-card">
            <div className="help-card-icon">🧑‍🔧</div>
            <h3>Provider Support</h3>
            <p>
              Providers can get help with availability, bookings, reviews,
              payments, and managing their services.
            </p>
          </div>

          <div className="help-card">
            <div className="help-card-icon">⭐</div>
            <h3>Reviews & Feedback</h3>
            <p>
              Learn how reviews work and how to report inappropriate or
              misleading feedback.
            </p>
          </div>

        </div>
      </section>

      {/* FAQ */}
      <section className="help-faq">
        <div className="help-section-heading">
          <span>FAQ</span>
          <h2>Frequently Asked Questions</h2>
        </div>

        <div className="help-faq-list">

          <div className="help-faq-item">
            <h3>How do I book a service?</h3>
            <p>
              Search for a service, choose a provider, select an available
              date and time, and complete the booking process.
            </p>
          </div>

          <div className="help-faq-item">
            <h3>Can I cancel my booking?</h3>
            <p>
              Yes. You can cancel your booking according to the applicable
              cancellation policy.
            </p>
          </div>

          <div className="help-faq-item">
            <h3>How can I become a provider?</h3>
            <p>
              Select the provider option from the login or registration flow
              and complete your provider profile.
            </p>
          </div>

          <div className="help-faq-item">
            <h3>What if a provider doesn't arrive?</h3>
            <p>
              Contact ServiceHub support and provide your booking details so
              the issue can be reviewed.
            </p>
          </div>

        </div>
      </section>

      {/* CONTACT */}
      <section className="help-contact">
        <div>
          <span>NEED MORE HELP?</span>
          <h2>Talk To Our Support Team</h2>
          <p>
            Can't find what you're looking for? Get in touch with us and
            we'll help you resolve your issue.
          </p>
        </div>

        <a href="mailto:support@servicehub.com" className="help-contact-btn">
          Contact Support →
        </a>
      </section>

      {/* FOOTER */}
      <footer className="help-footer">
        <div className="help-footer-brand">
          <div className="help-logo">
            <div className="help-logo-icon">S</div>
            <span>ServiceHub</span>
          </div>

          <p>
            Your trusted local service marketplace for getting everyday work
            done easily.
          </p>
        </div>

        <div className="help-footer-column">
          <h4>Company</h4>
          <a href="/about">About</a>
          <a href="/how-it-works">How It Works</a>
          <a href="/providers">Providers</a>
        </div>

        <div className="help-footer-column">
          <h4>Support</h4>
          <a href="/help-support">Help & Support</a>
          <a href="/terms-conditions">Terms & Conditions</a>
        </div>

        <div className="help-footer-column">
          <h4>Services</h4>
          <a href="/services">Browse Services</a>
          <a href="/providers">Find Providers</a>
        </div>

        <div className="help-footer-bottom">
          <p>© 2026 ServiceHub. All rights reserved.</p>
          <p>Built for better local services.</p>
        </div>
      </footer>

    </div>
  );
}

export default HelpSupport;