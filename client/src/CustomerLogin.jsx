import { useState } from "react";
import "./CustomerLogin.css";

const API_URL = import.meta.env.VITE_API_URL;

function CustomerLogin() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!emailOrPhone.trim()) {
      alert("Please enter your email or phone number.");
      return;
    }

    if (!password) {
      alert("Please enter your password.");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/customers/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            emailOrPhone: emailOrPhone.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Invalid email/phone or password."
        );
      }

      // =========================================
      // SAVE CUSTOMER AUTH
      // =========================================

      localStorage.setItem(
        "customerToken",
        data.token
      );

      localStorage.setItem(
        "customerId",
        data.customer.id
      );

      localStorage.setItem(
        "customerName",
        data.customer.name
      );

      localStorage.setItem(
        "customerPhone",
        data.customer.phone
      );

      localStorage.setItem(
        "customerEmail",
        data.customer.email
      );

      // =========================================
      // CUSTOMER APP
      // =========================================

      window.location.href = "/customer";
    } catch (error) {
      console.log(
        "Customer Login Error:",
        error
      );

      alert(
        error.message ||
          "Unable to login. Please try again."
      );
    }
  };

  return (
    <div className="customer-login-page">

      <div className="customer-login-card">

        <div className="customer-login-icon">
          👤
        </div>

        <h1>Customer Login</h1>

        <p className="customer-login-subtitle">
          Login to book and manage your services
        </p>

        <form onSubmit={handleLogin}>

          <label>
            Email or Phone Number
          </label>

          <input
            type="text"
            placeholder="Enter email or phone"
            value={emailOrPhone}
            onChange={(event) =>
              setEmailOrPhone(event.target.value)
            }
          />

          <label>
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
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
          <a href="/customer-register">
            Register
          </a>
        </p>

        <button
          className="back-role-btn"
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

export default CustomerLogin;s