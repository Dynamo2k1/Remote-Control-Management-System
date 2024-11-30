import paramiko
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def create_ssh_connection(ip, username, password):
    """
    Establish an SSH connection to the remote server.
    """
    try:
        ssh_client = paramiko.SSHClient()
        ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        ssh_client.connect(hostname=ip, username=username, password=password, timeout=10)
        logger.info(f"Connected to {ip} successfully.")
        return ssh_client
    except paramiko.AuthenticationException as auth_err:
        logger.error(f"Authentication failed for {ip}: {auth_err}")
        return None
    except Exception as e:
        logger.error(f"Failed to connect to {ip}: {e}")
        return None

def execute_command(ssh_client, command):
    """
    Execute a command on the remote server over an existing SSH connection.
    Waits for the command prompt to reappear before returning.
    """
    try:
        stdin, stdout, stderr = ssh_client.exec_command(command, timeout=30)
        channel = stdout.channel

        # Initialize output and error accumulators
        output = []
        error = []

        # Read outputs incrementally until the command prompt reappears
        while not channel.exit_status_ready():
            if channel.recv_ready():
                line = channel.recv(1024).decode()
                output.append(line)
                logger.info(f"STDOUT: {line.strip()}")
            if channel.recv_stderr_ready():
                err_line = channel.recv_stderr(1024).decode()
                error.append(err_line)
                logger.error(f"STDERR: {err_line.strip()}")

        # Ensure exit status is captured
        exit_status = channel.recv_exit_status()

        # Combine outputs into a single string
        full_output = "".join(output).strip()
        full_error = "".join(error).strip()

        # Log results if empty output
        if not full_output and not full_error:
            logger.info(f"Command executed with no output: {command}")

        return {
            "output": full_output,
            "error": full_error,
            "exit_status": exit_status,
        }
    except Exception as e:
        logger.error(f"Command execution failed: {e}")
        return {
            "output": "",
            "error": str(e),
            "exit_status": 1,
        }


def close_ssh_connection(ssh_client):
    """
    Close an existing SSH connection.
    """
    try:
        ssh_client.close()
        logger.info("SSH connection closed successfully.")
    except Exception as e:
        logger.error(f"Error closing SSH connection: {e}")
