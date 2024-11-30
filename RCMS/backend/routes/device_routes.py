from flask import Blueprint, request, jsonify
from utils.ssh_executor import create_ssh_connection, close_ssh_connection
from flask_jwt_extended import jwt_required, get_jwt_identity
import yaml
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

device_bp = Blueprint("devices", __name__)

# Mapping actions to commands
COMMAND_MAP = {
    "install": "echo {password} | sudo -S apt install -y {service}",
    "start": "echo {password} | sudo -S systemctl start {service} --no-pager",
    "stop": "echo {password} | sudo -S systemctl stop {service} --no-pager",
    "enable": "echo {password} | sudo -S systemctl enable {service} --no-pager",
    "disable": "echo {password} | sudo -S systemctl disable {service} --no-pager",
    "status": "echo {password} | sudo -S systemctl status {service} --no-pager",
}

def execute_command(ip, username, password, command):
    """
    Execute a command on a remote server over SSH.
    """
    try:
        ssh_client = create_ssh_connection(ip, username, password)
        if not ssh_client:
            return {"output": "", "error": f"Failed to connect to {ip}"}

        # Execute the command
        stdin, stdout, stderr = ssh_client.exec_command(command)
        output = stdout.read().decode().strip()
        error = stderr.read().decode().strip()

        close_ssh_connection(ssh_client)

        return {"output": output, "error": error}
    except Exception as e:
        logger.error(f"Command execution failed for {ip}: {e}")
        return {"output": "", "error": str(e)}

@device_bp.route("/execute", methods=["POST"])
@jwt_required()
def execute_commands():
    """
    Execute commands on devices based on an uploaded YAML file.
    """
    identity = get_jwt_identity()

    if not isinstance(identity, str):
        logger.error(f"JWT Identity is not a string: {identity}")
        return jsonify({"error": "JWT Identity must be a string"}), 400

    logger.info(f"JWT Identity: {identity}")

    yaml_file = request.files.get("file")
    if not yaml_file:
        logger.error("YAML file is missing.")
        return jsonify({"error": "YAML file is required"}), 400

    try:
        config = yaml.safe_load(yaml_file)
        logger.info(f"Parsed YAML: {config}")
    except Exception as e:
        logger.error(f"Error parsing YAML file: {e}")
        return jsonify({"error": "Invalid YAML file", "details": str(e)}), 400

    results = []
    for device in config.get("devices", []):
        ip = device["ip"]
        username = device["username"]
        password = device["password"]
        actions = device["actions"]

        logger.info(f"Processing device: {ip}")
        device_results = []

        for action in actions:
            for action_name, service in action.items():
                if action_name in COMMAND_MAP:
                    command = COMMAND_MAP[action_name].format(service=service, password=password)
                    logger.info(f"Executing command on {ip}: {command}")
                    result = execute_command(ip, username, password, command)

                    # Structure the result more clearly
                    device_results.append({
                        "action": action_name,
                        "service": service,
                        "result": {
                            "output": result["output"] if result["output"] else "No output",
                            "error": result["error"] if result["error"] else "No error",
                            "status": "✔️ Success" if not result["error"] else "❌ Failure"
                        }
                    })
                else:
                    logger.error(f"Unknown action: {action_name}")
                    device_results.append({
                        "action": action_name,
                        "service": service,
                        "result": {
                            "output": "N/A",
                            "error": f"Unknown action: {action_name}",
                            "status": "❌ Failure"
                        }
                    })

        results.append({"device": ip, "results": device_results})

    logger.info("All tasks completed successfully.")
    return jsonify({"status": "done", "results": results}), 200
