import { useState } from "react";
import "./ProviderLogin.css";

const API_URL = import.meta.env.VITE_API_URL;

function ProviderRegister() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    service: "",
    location: "",
    price: "",
    experience: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (Number(formData.price) < 0) {
      alert("Price cannot be negative.");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/providers/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Registration failed.");
        return;
      }

      alert("Provider registration successful! Please login.");

      window.location.href = "/provider-login";
    } catch (error) {
      console.error(error);
      alert("Unable to connect to server.");
    }
  };

  return (
    <div className="provider-login-page">
      <div className="provider-login-card">
        <div className="provider-login-icon">🧑‍🔧</div>

        <h1>Provider Register</h1>

        <p className="provider-login-subtitle">
          Create your ServiceHub provider account
        </p>

        <form onSubmit={handleRegister}>
          <label>Full Name</label>

          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Phone Number</label>

          <input
            type="tel"
            name="phone"
            placeholder="Enter 10-digit phone number"
            value={formData.phone}
            maxLength={10}
            onChange={handleChange}
            required
          />

          <label>Email</label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>

          <input
            type="password"
            name="password"
            placeholder="Create password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label>Confirm Password</label>

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <label>Service</label>

          <input
            type="text"
            name="service"
            placeholder="e.g. Electrician"
            value={formData.service}
            onChange={handleChange}
            required
          />

          <label>Location</label>

          <input
            type="text"
            name="location"
            placeholder="e.g. Faridabad"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <label>Price</label>

          <input
            type="number"
            name="price"
            placeholder="Enter service price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            required
          />

          <label>Experience (Years)</label>

          <input
            type="number"
            name="experience"
            placeholder="e.g. 5"
            value={formData.experience}
            onChange={handleChange}
            min="0"
          />

          <button type="submit">
            Create Provider Account
          </button>
        </form>

        <p style={{ marginTop: "18px" }}>
          Already have an account?{" "}
          <a href="/provider-login">Login</a>
        </p>

        <button
          className="provider-back-btn"
          onClick={() => {
            window.location.href = "/role-selection";
          }}
        >
          ← Back
        </button>
      </div>
    </div>
  );
}

export default ProviderRegister;