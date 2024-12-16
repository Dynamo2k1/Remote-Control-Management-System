import React, { useState } from "react";
import { login } from "../services/api";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import "./css/LoginPage.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back</h2>
        <p>Login to your account</p>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group password-group">
            <label htmlFor="password">Password</label>
            <div className="input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span 
                className="eye-icon" 
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: 'pointer' }} // Ensure the cursor shows pointer on hover
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <button type="submit" disabled={isLoading} className="login-button">
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
