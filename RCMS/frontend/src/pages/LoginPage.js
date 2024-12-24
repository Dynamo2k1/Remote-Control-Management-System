import React, { useState } from "react";
import { login } from "../services/api";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Eye icons
import "./css/LoginPage.css"; // Import CSS

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const result = await login(username, password);
    setIsLoading(false);

    if (result.success) {
      alert(result.message || "Login successful");
      window.location.href = "/dashboard"; // Redirect to dashboard
    } else {
      setError(result.message || "An unexpected error occurred");
    }
  };

  return (
    <div className="container">
      <div className="login-box">
        <h1 className="title">Login</h1>
        <form onSubmit={handleSubmit} className="login-form">
          {/* Username Input */}
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="input"
            />
          </div>

          {/* Password Input */}
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <div className="input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input"
              />
              {/* Eye icon to toggle password visibility */}
              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Login Button */}
          <button type="submit" disabled={isLoading} className="login-button">
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Error Message */}
        {error && <p className="error-message">{error}</p>}

        {/* Registration Link */}
        <div className="register-link">
          Don't have an account? <a href="/register">Register here.</a>
        </div>
        <footer className="footer">© 2024 Sentra. All rights reserved.</footer>
      </div>
    </div>
  );
};

export default LoginPage;
