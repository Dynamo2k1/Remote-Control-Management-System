import React from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import ResultsPage from "./pages/ResultsPage";
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

                Here's the updated HTML and CSS code with the requested changes:

HTML (Updated Header Layout)
html
Copy code
                    <header>
                        <nav className="navbar">
                            <div className="navbar-left">
                                <button
                                    id="theme-toggle"
                                    onClick={toggleTheme}
                                    aria-label="Toggle Theme"
                                    className="theme-toggle-btn"
                                >
                                    {document.body.getAttribute("data-theme") === "dark" ? "☀️" : "🌙"}
                                </button>
                            </div>
                            <div className="navbar-title">Sentra</div>
                            <ul className="navbar-right">
                                <li><Link to="/">Login</Link></li>
                                <li><Link to="/register">Register</Link></li>
                                <li><a href="/about-us.html">About Us</a></li>
                                <li><a href="/contact.html">Contact</a></li>
                                <li><Link to="/results">Result</Link></li>
                                <li><Link to="/dashboard">Dashboard</Link></li>
                            </ul>
                        </nav>
                    </header>

                {/* Main Content */}
                <main>
                    <Routes>
                        <Route path="/" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/results" element={<ResultsPage />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </main>

                {/* Footer */}
                <Footer />
            </div>
        </Router>
    );
};

export default App;
