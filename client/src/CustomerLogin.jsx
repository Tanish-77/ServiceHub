import { useState } from "react";
import "./CustomerLogin.css";

function CustomerLogin() {

  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

  const handleLogin = (event) => {

    event.preventDefault();

    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    // Save customer information
    localStorage.setItem("customerName", name.trim());
    localStorage.setItem("customerPhone", phone);

    // Go to ServiceHub
    window.location.href = "/customer";
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
            Your Name
          </label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />


          <label>
            Phone Number
          </label>

          <input
            type="tel"
            placeholder="Enter 10-digit phone number"
            value={phone}
            maxLength={10}
            onChange={(event) => setPhone(event.target.value)}
          />


          <button type="submit">
            Login
          </button>

        </form>


        <button
  className="back-role-btn"
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

export default CustomerLogin;