import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./components/Dashboard";
import ResultsPage from "./pages/ResultsPage";  // Import ResultsPage
import Footer from "./components/Footer"; // Footer Component
import "./App.css";

const App = () => {
    // Theme Toggle Handler
    const toggleTheme = () => {
        const currentTheme = document.body.getAttribute("data-theme") || "light";
        const newTheme = currentTheme === "light" ? "dark" : "light";
        document.body.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    };

    React.useEffect(() => {
        // Apply saved theme on load
        const savedTheme = localStorage.getItem("theme") || "light";
        document.body.setAttribute("data-theme", savedTheme);
    }, []);

    return (
        <Router>
            <div className="app-layout">
                {/* Header */}
                <header>
                    <nav className="navbar">
                        <div className="navbar-container">
                            <h1 className="navbar-title">Remote Control Management System</h1>
                            <button id="theme-toggle" onClick={toggleTheme}>
                                🌙
                            </button>
                        </div>
                        <ul className="navbar-links">
                            <li><Link to="/">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                            <li><Link to="/aboutus">About Us</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                            <li><Link to="/results">Results</Link></li> {/* Link to Results Page */}
                        </ul>
                    </nav>
                </header>

                {/* Main Content */}
                <main>
                    <Routes>
                        <Route path="/" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/aboutus" element={<AboutUs />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/results" element={<ResultsPage />} />
                        <Route path="*" element={<div>404 - Page Not Found</div>} />
                    </Routes>
                </main>

                {/* Footer */}
                <Footer />
            </div>
        </Router>
    );
};

export default App;
