import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./components/Dashboard";
import "./App.css"; // Import CSS for styling

const App = () => {
    return (
        <Router>
            <nav>
                <ul>
                    <li><Link to="/">Login</Link></li>
                    <li><Link to="/aboutus">About Us</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<div>404 - Page Not Found</div>} />
            </Routes>
        </Router>
    );
};

export default App;