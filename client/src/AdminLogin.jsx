import { useState } from "react";
import "./AdminLogin.css";

function AdminLogin({ onLogin }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {

    event.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {

      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/admin/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Login failed"
        );
      }

      // Save admin login
      localStorage.setItem(
        "servicehubAdmin",
        JSON.stringify(data.admin)
      );

      alert("Admin login successful! 🎉");

      onLogin(data.admin);

    } catch (error) {

      console.log("Admin Login Error:", error);

      alert(
        error.message ||
        "Unable to login"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="admin-login-page">

      <div className="admin-login-card">

        <div className="admin-login-icon">
          🔐
        </div>

        <h1>
          ServiceHub
        </h1>

        <h2>
          Admin Login
        </h2>

        <p>
          Login to manage your ServiceHub
        </p>

        <form onSubmit={handleLogin}>

          <label>
            Email
          </label>

          <input
            type="email"
            placeholder="Enter admin email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            required
          />

          <label>
            Password
          </label>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            required
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "🔓 Login"}
          </button>

        </form>

      </div>

    </div>

  );
}

export default AdminLogin;