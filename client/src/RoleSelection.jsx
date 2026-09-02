import "./RoleSelection.css";

function RoleSelection() {

  return (
    <div className="role-selection-page">

      {/* =========================================
          HEADER
      ========================================= */}

      <div className="role-header">

        <a
          href="/"
          className="role-logo"
        >
          <span className="role-logo-icon">
            ⌂
          </span>

          <span>
            SERVICE<span>HUB</span>
          </span>
        </a>

      </div>


      {/* =========================================
          MAIN
      ========================================= */}

      <div className="role-container">

        <div className="role-content">

          <p className="role-small-title">
            WELCOME TO SERVICEHUB
          </p>

          <h1>
            Choose Your Role
          </h1>

          <p className="role-description">
            Select how you want to use ServiceHub
          </p>


          {/* =========================================
              ROLE CARDS
          ========================================= */}

          <div className="role-cards">


            {/* CUSTOMER */}

            <div className="role-card">

              <div className="role-card-icon">
                👤
              </div>

              <h2>
                Customer
              </h2>

              <p>
                Find trusted professionals and
                book services easily.
              </p>

              <a
                href="/login"
                className="role-button"
              >
                Customer Login →
              </a>

            </div>


            {/* PROVIDER */}

            <div className="role-card">

              <div className="role-card-icon">
                👨‍🔧
              </div>

              <h2>
                Provider
              </h2>

              <p>
                Manage your services, bookings,
                availability and reviews.
              </p>

              <a
                href="/provider-login"
                className="role-button"
              >
                Provider Login →
              </a>

            </div>


            {/* ADMIN */}

            <div className="role-card">

              <div className="role-card-icon">
                🛡️
              </div>

              <h2>
                Admin
              </h2>

              <p>
                Manage ServiceHub users,
                providers and bookings.
              </p>

              <a
                href="/admin"
                className="role-button"
              >
                Admin Login →
              </a>

            </div>

          </div>


          {/* BACK HOME */}

          <a
            href="/"
            className="back-home"
          >
            ← Back to Home
          </a>

        </div>

      </div>

    </div>
  );
}

export default RoleSelection;