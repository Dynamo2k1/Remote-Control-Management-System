import React, { useState } from "react";
import { register } from "../services/api";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import "./css/RegisterPage.css";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsLoading(true);

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
    <div className="register-container">
      <div className="register-card">
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit} className="register-form">
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
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group password-group"> {/* Added class for styling */}
            <label htmlFor="password">Password</label>
            <div className="input-container"> {/* Container for input and icon */}
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
          <button type="submit" disabled={isLoading} className="register-button">
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    </div>
  );
};

export default RegisterPage;
