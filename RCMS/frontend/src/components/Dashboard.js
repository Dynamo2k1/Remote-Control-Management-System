import React, { useState, useEffect } from "react";
import { executeDevices } from "../services/api";
import "./Dashboard.css";

const Dashboard = () => {
    const [file, setFile] = useState(null);
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileUpload = async (e) => {
        e.preventDefault();

        if (!file) {
            setError("Please upload a valid YAML file.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await executeDevices(file);
            if (response.success) {
                setResults(response.data.results);
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

            {/* Scrollable results section */}
            {results && (
                <div className="results-container">
                    <h3>Execution Results:</h3>
                    <div className="results-scroll">
                        {results.map((deviceResult, index) => (
                            <div key={index} className="device-card">
                                <h4>Device: {deviceResult.device}</h4>
                                <ul>
                                    {deviceResult.results.map((action, idx) => (
                                        <li key={idx} className={`action-result ${action.result.status === "❌ Failure" ? "failure" : "success"}`}>
                                            <strong>Action:</strong> {action.action} <br />
                                            <strong>Service:</strong> {action.service} <br />
                                            <strong>Status:</strong> {action.result.status} <br />
                                            <strong>Output:</strong>
                                            <pre>{action.result.output || "No output"}</pre>
                                            <strong>Error:</strong>
                                            <pre>{action.result.error || "No error"}</pre>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
