import { useState } from "react";
import "./ProviderLogin.css";

const API_URL = import.meta.env.VITE_API_URL;

function ProviderLogin() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!emailOrPhone.trim() || !password) {
      alert("Please enter email/phone and password.");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/providers/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            emailOrPhone,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Login failed.");
        return;
      }

      localStorage.setItem(
        "providerToken",
        data.token
      );

      localStorage.setItem(
        "providerId",
        data.provider.id
      );

      localStorage.setItem(
        "providerName",
        data.provider.name
      );

      localStorage.setItem(
        "providerPhone",
        data.provider.phone
      );

      localStorage.setItem(
        "providerEmail",
        data.provider.email
      );

      window.location.href =
        "/provider-dashboard";
    } catch (error) {
      console.error(error);
      alert("Unable to connect to server.");
    }
  };

  return (
    <div className="provider-login-page">
      <div className="provider-login-card">
        <div className="provider-login-icon">
          🧑‍🔧
        </div>

        <h1>Provider Login</h1>

        <p className="provider-login-subtitle">
          Login to manage your services and bookings
        </p>

        <form onSubmit={handleLogin}>
          <label>Email or Phone</label>

          <input
            type="text"
            placeholder="Enter email or phone"
            value={emailOrPhone}
            onChange={(event) =>
              setEmailOrPhone(event.target.value)
            }
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
          />

          <button type="submit">
            Login
          </button>
        </form>

        <p style={{ marginTop: "18px" }}>
          Don't have an account?{" "}
          <a href="/provider-register">
            Register
          </a>
        </p>

        <button
          className="provider-back-btn"
          onClick={() => {
            window.location.href =
              "/role-selection";
          }}
        >
          ← Back
        </button>
      </div>
    </div>
  );
}

export default ProviderLogin;