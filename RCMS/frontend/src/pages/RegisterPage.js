import React, { useState } from "react";
import { register } from "../services/api";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import "./css/RegisterPage.css"; // Import CSS

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsLoading(true);

    // Call register API
    const result = await register(username, email, password);
    setIsLoading(false);

    if (result.success) {
      setSuccessMessage(result.message || "Registration successful");
      setUsername("");
      setEmail("");
      setPassword("");
    } else {
      setError(result.message || "Failed to register");
    }
  };

  return (
    <div className="container">
      <div className="register-box">
        <h1 className="title">Register</h1>
        <form onSubmit={handleSubmit} className="register-form">
          {/* Username Input */}
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="input"
            />
          </div>

          {/* Email Input */}
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              {/* Eye Icon for toggling password visibility */}
              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Register Button */}
          <button type="submit" disabled={isLoading} className="register-button">
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Error and Success Messages */}
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <div className="register-link">
          Already have an account? <a href="/login">Login here.</a>
        </div>

        <footer className="footer">© 2024 Seekora. All rights reserved.</footer>
      </div>
    </div>
  );
};

export default RegisterPage;
