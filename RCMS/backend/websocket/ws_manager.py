from flask_socketio import emit
import psutil

def setup_websockets(socketio):
    @socketio.on("connect")
    def handle_connect():
        emit("message", {"status": "Connected to WebSocket"})

    @socketio.on("get_metrics")
    def send_metrics():
        metrics = {
            "cpu": psutil.cpu_percent(),
            "memory": psutil.virtual_memory().percent,
            "disk": psutil.disk_usage("/").percent,
        }
        emit("metrics", metrics)
