import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import { executeDevices } from "../services/api";
import "./css/Dashboard.css";

const Dashboard = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();  // Initialize navigate

    const handleFileUpload = async (e) => {
        e.preventDefault();

        if (!file) {
            setError("Please upload a valid YAML file.");
            return;
        }

        // Validate file type
        const validExtensions = ["yaml", "yml"];
        const fileExtension = file.name.split(".").pop().toLowerCase();
        if (!validExtensions.includes(fileExtension)) {
            setError("Invalid file type. Please upload a .yaml or .yml file.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await executeDevices(file);
            if (response.success) {
                // Pass the results to the ResultsPage via navigation state
                navigate("/results", { state: { results: response.data.results } });
            } else {
                setError(response.message);
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            setError("Failed to execute commands. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h2>Device Management</h2>
                <p>Upload a YAML file to execute commands on devices.</p>
            </div>

            <form onSubmit={handleFileUpload} className="file-upload-form">
                <div className="file-input-group">
                    <label htmlFor="file-upload" className="file-label">
                        Select YAML File
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="file-input"
                    />
                </div>
                <button type="submit" disabled={loading} className="submit-button">
                    {loading ? "Executing..." : "Execute"}
                </button>
            </form>

            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default Dashboard;
