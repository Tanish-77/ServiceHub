import { useState } from "react";
import "./ProviderLogin.css";

function ProviderLogin() {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");


  // =========================================
  // PROVIDER LOGIN
  // =========================================

  const handleLogin = async (event) => {

    event.preventDefault();


    // =========================================
    // NAME VALIDATION
    // =========================================

    if (!name.trim()) {

      alert("Please enter your name.");

      return;

    }


    // =========================================
    // PHONE VALIDATION
    // =========================================

    if (!/^[0-9]{10}$/.test(phone)) {

      alert("Please enter a valid 10-digit phone number.");

      return;

    }


    // =========================================
    // FIND PROVIDER
    // =========================================

    try {

      const response = await fetch(
        "http://localhost:5000/api/providers"
      );


      const providers = await response.json();


      if (!response.ok) {

        throw new Error(
          "Unable to load providers"
        );

      }


      // =========================================
      // MATCH PROVIDER BY NAME
      // =========================================

      const provider = providers.find(
        (item) =>
          item.name.toLowerCase() ===
          name.trim().toLowerCase()
      );


      // =========================================
      // PROVIDER NOT FOUND
      // =========================================

      if (!provider) {

        alert(
          "Provider not found. Please check your provider name."
        );

        return;

      }


      // =========================================
      // SAVE PROVIDER INFORMATION
      // =========================================

      localStorage.setItem(
        "providerId",
        provider._id
      );

      localStorage.setItem(
        "providerName",
        provider.name
      );

      localStorage.setItem(
        "providerPhone",
        phone
      );


      // =========================================
      // GO TO PROVIDER DASHBOARD
      // =========================================

      window.location.href =
        "/provider-dashboard";


    } catch (error) {

      console.log(
        "Provider Login Error:",
        error
      );


      alert(
        error.message ||
        "Unable to login. Please try again."
      );

    }

  };


  // =========================================
  // UI
  // =========================================

  return (

    <div className="provider-login-page">

      <div className="provider-login-card">


        {/* ICON */}

        <div className="provider-login-icon">
          🛠️
        </div>


        {/* TITLE */}

        <h1>
          Provider Login
        </h1>


        <p className="provider-login-subtitle">
          Login to manage your services and bookings
        </p>


        {/* LOGIN FORM */}

        <form onSubmit={handleLogin}>


          {/* NAME */}

          <label>
            Provider Name
          </label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
          />


          {/* PHONE */}

          <label>
            Phone Number
          </label>

          <input
            type="tel"
            placeholder="Enter 10-digit phone number"
            value={phone}
            maxLength={10}
            onChange={(event) =>
              setPhone(event.target.value)
            }
          />


          {/* LOGIN BUTTON */}

          <button type="submit">
            Login
          </button>

        </form>


        {/* BACK BUTTON */}

        <button
          className="provider-back-btn"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          ← Back
        </button>


      </div>

    </div>

  );

}


export default ProviderLogin;