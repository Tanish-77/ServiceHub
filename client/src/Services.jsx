import "./Services.css";

function Services() {
  const services = [
    {
      icon: "🔧",
      name: "Plumbing",
      description:
        "Professional plumbing repair, installation and maintenance services.",
    },
    {
      icon: "⚡",
      name: "Electrical",
      description:
        "Safe and reliable electrical installation, repair and maintenance.",
    },
    {
      icon: "🧹",
      name: "Cleaning",
      description:
        "Home and office cleaning services from trusted professionals.",
    },
    {
      icon: "💻",
      name: "Computer Repair",
      description:
        "Computer, laptop and software repair with expert technical support.",
    },
    {
      icon: "🎨",
      name: "Painting",
      description:
        "Professional home and office painting with quality finishing.",
    },
    {
      icon: "🔌",
      name: "Appliance Repair",
      description:
        "Fast repair and maintenance for your everyday home appliances.",
    },
    {
      icon: "❄️",
      name: "AC Repair",
      description:
        "AC servicing, installation and repair by experienced technicians.",
    },
    {
      icon: "🚿",
      name: "Water Purifier",
      description:
        "RO installation, servicing and water purifier repair services.",
    },
    {
      icon: "📺",
      name: "TV Repair",
      description:
        "Professional LED, LCD and Smart TV repair services at your doorstep.",
    },
    {
      icon: "🚗",
      name: "Car Service",
      description:
        "Reliable car servicing, maintenance and repair from skilled mechanics.",
    },
    {
      icon: "🏍️",
      name: "Bike Service",
      description:
        "Complete bike servicing and repair for smooth and safe rides.",
    },
    {
      icon: "🔨",
      name: "Carpentry",
      description:
        "Furniture repair, installation and custom carpentry services.",
    },
  ];

  return (
    <div className="services-page">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <nav className="services-navbar">

        {/* LOGO */}
        <a href="/" className="services-logo">

          <div className="services-logo-icon">
            ⌂
          </div>

          <span>
            SERVICE<span>HUB</span>
          </span>

        </a>


        {/* NAV LINKS */}
        <div className="services-nav-links">

          <a href="/">
            Home
          </a>

          <a
            href="/services"
            className="active"
          >
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


        {/* NAV BUTTONS */}
        <div className="services-nav-buttons">

          {/* <a
            href="/customer"
            className="services-login-btn"
          >
            Customer
          </a> */}

          <a
            href="/role-selection"
            className="services-start-btn"
          >
            Login
          </a>

        </div>

      </nav>


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="services-hero">

        <div className="services-hero-glow"></div>

        <div className="services-hero-content">

          <p className="services-small-title">
            SERVICEHUB MARKETPLACE
          </p>

          <h1>
            Find The Right
            <br />
            <span>Service For You</span>
          </h1>

          <p>
            Explore trusted professionals for all your
            everyday service needs.
            <br />
            Fast. Easy. Reliable.
          </p>

        </div>

      </section>


      {/* =====================================================
          SERVICES
      ===================================================== */}

      <section className="all-services-section">

        <div className="services-heading">

          <p>
            WHAT WE OFFER
          </p>

          <h2>
            Explore Our Services
          </h2>
           
          <p>
            Choose from a wide range of professional services
          </p>

        </div>


        <div className="all-services-grid">

          {services.map((service, index) => (

            <div
              className="service-box"
              key={index}
            >

              <div className="service-box-glow"></div>

              <div className="service-box-icon">
                {service.icon}
              </div>

              <h3>
                {service.name}
              </h3>

              <p>
                {service.description}
              </p>

              <a href="/providers">
                Find Providers
                <span>→</span>
              </a>

            </div>

          ))}

        </div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="services-cta">

        <div>

          <p>
            READY TO GET STARTED?
          </p>

          <h2>
            Get Your Work Done
            <br />
            By Trusted Professionals
          </h2>

          <span>
            Book reliable service providers near you.
          </span>

        </div>

        <a href="/provider-login">
          Find a Provider →
        </a>

      </section>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="services-footer">

        <div className="services-footer-brand">

          <a
            href="/"
            className="services-logo"
          >

            <div className="services-logo-icon">
              ⌂
            </div>

            <span>
              SERVICE<span>HUB</span>
            </span>

          </a>

          <p>
            ServiceHub connects you with trusted
            professionals for your daily service needs.
          </p>

          <div className="services-socials">
            <span>f</span>
            <span>𝕏</span>
            <span>◎</span>
            <span>in</span>
          </div>

        </div>


        {/* QUICK LINKS */}

        <div className="services-footer-column">

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


        {/* CUSTOMERS */}

        <div className="services-footer-column">

          <h3>
            For Customers
          </h3>

          <a href="/role-selection">
            Login
          </a>

          <a href="/login">
            Customer Login
          </a>

          <a href="/customer">
            My Bookings
          </a>

          <a href="/help-support">
            Help & Support
          </a>
            
          <a href="/terms-conditions">
            Terms & Conditions
          </a>
        </div>


        {/* PROVIDERS */}

        <div className="services-footer-column">

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

          <a href="#">
            Resources
          </a>

        </div>


        {/* CONTACT */}

        <div className="services-footer-column">

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
            📍 Your City, India
          </p>

        </div>


        <div className="services-footer-bottom">
          © 2026 ServiceHub. All rights reserved.
        </div>

      </footer>

    </div>
  );
}

export default Services;