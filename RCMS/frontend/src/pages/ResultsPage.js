import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./css/ResultsPage.css";

const ResultsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [results, setResults] = useState([]);

    // Fetch results from location state or fallback to localStorage
    useEffect(() => {
        if (location.state?.results) {
            setResults(location.state.results);
        } else {
            const storedResults = JSON.parse(localStorage.getItem("results")) || [];
            if (storedResults.length > 0) {
                setResults(storedResults);
            } else {
                // If no results found, navigate back to the dashboard
                navigate("/");
            }
        }
    }, [location.state, navigate]);

    return (
        <div className="results-page">
            <h1>Execution Results</h1>
            {results.length > 0 ? (
                <div className="results-container">
                    {results.map((deviceResult, index) => (
                        <div key={index} className="device-result">
                            <h3>Device: {deviceResult.device}</h3>
                            {deviceResult.results.map((action, idx) => (
                                <div
                                    key={idx}
                                    className={`action-result ${
                                        action.result.status === "❌ Failure" ? "failure" : "success"
                                    }`}
                                >
                                    <strong>Action:</strong> {action.action} <br />
                                    <strong>Status:</strong> {action.result.status} <br />
                                    <strong>Output:</strong> <pre>{action.result.output || "No output"}</pre>
                                    <strong>Error:</strong> <pre>{action.result.error || "No error"}</pre>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ) : (
                <p>No results found. Please upload a YAML file from the dashboard.</p>
            )}
        </div>
    );
};

export default ResultsPage;
