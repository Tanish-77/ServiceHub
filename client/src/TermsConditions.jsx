import React from "react";
import "./TermsConditions.css";

function TermsConditions() {
  return (
    <div className="terms-page">

      {/* NAVBAR */}
      <nav className="terms-navbar">
        <div className="terms-logo">
          <div className="terms-logo-icon">S</div>
          <span>ServiceHub</span>
        </div>

        <div className="terms-nav-links">
          <a href="/">Home</a>
          <a href="/services">Services</a>
          <a href="/providers">Providers</a>
          <a href="/how-it-works">How It Works</a>
          <a href="/about">About</a>
        </div>

        <div className="terms-nav-buttons">
          <a href="/role-selection" className="terms-customer-btn">
            Login
          </a>
          <a href="/role-selection" className="terms-login-btn">
            Get Started
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="terms-hero">
        <div className="terms-hero-content">
          <span>LEGAL & INFORMATION</span>
          <h1>
            Terms & <strong>Conditions</strong>
          </h1>
          <p>
            Please read these terms carefully before using the ServiceHub
            platform.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="terms-content">

        <div className="terms-intro">
          <span>LAST UPDATED: SEPTEMBER 2026</span>
          <h2>Welcome to ServiceHub</h2>
          <p>
            These Terms & Conditions explain the rules and responsibilities
            that apply when customers and service providers use ServiceHub.
          </p>
        </div>

        <div className="terms-list">

          <article className="terms-card">
            <div className="terms-number">01</div>
            <div>
              <h3>Use of ServiceHub</h3>
              <p>
                ServiceHub provides a platform that helps customers discover
                and connect with local service providers. Users must provide
                accurate information and use the platform responsibly.
              </p>
            </div>
          </article>

          <article className="terms-card">
            <div className="terms-number">02</div>
            <div>
              <h3>Customer Responsibilities</h3>
              <p>
                Customers are responsible for providing correct booking,
                contact, date, and service information. Customers should
                communicate respectfully with service providers.
              </p>
            </div>
          </article>

          <article className="terms-card">
            <div className="terms-number">03</div>
            <div>
              <h3>Provider Responsibilities</h3>
              <p>
                Providers are responsible for maintaining accurate profiles,
                service information, availability, pricing, and delivering
                services professionally.
              </p>
            </div>
          </article>

          <article className="terms-card">
            <div className="terms-number">04</div>
            <div>
              <h3>Bookings & Payments</h3>
              <p>
                A booking is subject to availability and confirmation.
                Payments must be completed through the supported payment
                process provided by ServiceHub.
              </p>
            </div>
          </article>

          <article className="terms-card">
            <div className="terms-number">05</div>
            <div>
              <h3>Cancellation & Refunds</h3>
              <p>
                Cancellation and refund eligibility may depend on the
                applicable booking policy. Users should review the relevant
                details before confirming a booking.
              </p>
            </div>
          </article>

          <article className="terms-card">
            <div className="terms-number">06</div>
            <div>
              <h3>Reviews & Feedback</h3>
              <p>
                Reviews should be honest, relevant, and based on genuine
                experiences. Abusive, misleading, or inappropriate content
                may be removed.
              </p>
            </div>
          </article>

          <article className="terms-card">
            <div className="terms-number">07</div>
            <div>
              <h3>Account Suspension</h3>
              <p>
                ServiceHub may restrict or suspend accounts that violate
                these terms, misuse the platform, provide false information,
                or engage in harmful activity.
              </p>
            </div>
          </article>

          <article className="terms-card">
            <div className="terms-number">08</div>
            <div>
              <h3>Service Disclaimer</h3>
              <p>
                ServiceHub acts as a marketplace platform connecting users
                and providers. The actual service is performed by the
                selected service provider.
              </p>
            </div>
          </article>

          <article className="terms-card">
            <div className="terms-number">09</div>
            <div>
              <h3>Privacy & Information</h3>
              <p>
                Users should provide only accurate information required for
                using the platform. ServiceHub may process information
                necessary to operate bookings and platform services.
              </p>
            </div>
          </article>

          <article className="terms-card">
            <div className="terms-number">10</div>
            <div>
              <h3>Changes to These Terms</h3>
              <p>
                ServiceHub may update these Terms & Conditions when required.
                Continued use of the platform after an update means the user
                accepts the revised terms.
              </p>
            </div>
          </article>

        </div>

        <div className="terms-notice">
          <strong>Important:</strong>
          <p>
            These terms are a general project-level template. Before using
            ServiceHub as a real commercial platform, have the final terms,
            privacy policy, refund policy, and legal disclaimers reviewed by
            a qualified legal professional.
          </p>
        </div>

      </section>

      {/* FOOTER */}
      <footer className="terms-footer">

        <div className="terms-footer-brand">
          <div className="terms-logo">
            <div className="terms-logo-icon">S</div>
            <span>ServiceHub</span>
          </div>

          <p>
            Your trusted local service marketplace for getting everyday work
            done easily.
          </p>
        </div>

        <div className="terms-footer-column">
          <h4>Company</h4>
          <a href="/about">About</a>
          <a href="/how-it-works">How It Works</a>
          <a href="/providers">Providers</a>
        </div>

        <div className="terms-footer-column">
          <h4>Support</h4>
          <a href="/help-support">Help & Support</a>
          <a href="/terms-conditions">Terms & Conditions</a>
        </div>

        <div className="terms-footer-column">
          <h4>Services</h4>
          <a href="/services">Browse Services</a>
          <a href="/providers">Find Providers</a>
        </div>

        <div className="terms-footer-bottom">
          <p>© 2026 ServiceHub. All rights reserved.</p>
          <p>Built for better local services.</p>
        </div>

      </footer>

    </div>
  );
}

export default TermsConditions;