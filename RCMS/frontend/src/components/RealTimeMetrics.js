import React, { useEffect, useState } from "react";
import { socket } from "../services/websocket";

const RealTimeMetrics = () => {
  const [metrics, setMetrics] = useState({ cpu: 0, memory: 0, disk: 0 });

  useEffect(() => {
    socket.on("metrics", (data) => {
      setMetrics(data);
    });

    socket.emit("get_metrics");

    return () => {
      socket.off("metrics");
    };
  }, []);

  return (
    <div>
      <h2>Real-Time Metrics</h2>
      <p>CPU Usage: {metrics.cpu}%</p>
      <p>Memory Usage: {metrics.memory}%</p>
      <p>Disk Usage: {metrics.disk}%</p>
    </div>
  );
};

export default RealTimeMetrics;
