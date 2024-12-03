// src/pages/ResultsPage.js
import React from "react";
import { useLocation } from "react-router-dom";

const ResultsPage = () => {
    const location = useLocation();
    const results = location.state?.results;  // Assuming results are passed via location state

    return (
        <div className="results-page">
            <h1>Execution Results</h1>
            {results ? (
                <div className="results-container">
                    {results.map((deviceResult, index) => (
                        <div key={index} className="device-result">
                            <h3>Device: {deviceResult.device}</h3>
                            {deviceResult.results.map((action, idx) => (
                                <div key={idx} className={`action-result ${action.result.status === "❌ Failure" ? "failure" : "success"}`}>
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
                <p>No results found</p>
            )}
        </div>
    );
};

export default ResultsPage;
