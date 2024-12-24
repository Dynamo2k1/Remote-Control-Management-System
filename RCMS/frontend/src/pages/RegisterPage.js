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
  const [passwordStrength, setPasswordStrength] = useState(""); // State for password strength feedback

  // Password strength checker
  const checkPasswordStrength = (password) => {
    let strength = 0;

    // Conditions for strength
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[\W_]/.test(password)) strength++;

    // Feedback based on conditions
    if (strength === 0) return "Too Weak";
    if (strength <= 2) return "Weak";
    if (strength === 3) return "Medium";
    if (strength === 4) return "Strong";
    if (strength === 5) return "Very Strong";
  };

  // Handle password input and check strength
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordStrength(checkPasswordStrength(value)); // Evaluate strength dynamically
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");

    // Validation for email format
    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address.");
      return;
    }

    // Validation for password strength
    if (passwordStrength === "Weak" || passwordStrength === "Too Weak") {
      setError("Password is too weak. Please choose a stronger password.");
      return;
    }

    setIsLoading(true);

    // Call register API
    const result = await register(username, email, password);
    setIsLoading(false);

    if (result.success) {
      setSuccessMessage(result.message || "Registration successful");
      setUsername("");
      setEmail("");
      setPassword("");
      setPasswordStrength("");
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
                onChange={handlePasswordChange}
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

          {/* Password Strength Indicator */}
          {password && (
            <p
              className={`password-strength ${
                passwordStrength.replace(" ", "-").toLowerCase()
              }`}
            >
              Strength: {passwordStrength}
            </p>
          )}

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

        <footer className="footer">© 2024 Sentra. All rights reserved.</footer>
      </div>
    </div>
  );
};

export default RegisterPage;
