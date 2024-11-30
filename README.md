
# 🚀 **Remote Control Management System (RCMS)**

**RCMS is a versatile and secure tool designed to streamline the management of remote devices, automate service management, and provide real-time monitoring. Perfect for system administrators and IT professionals who need efficient control over their networked systems. 💻✨**

---

## 🌟 **Key Features**

- 🔒 **Secure Device Management**: Remotely manage multiple devices with encrypted credentials.
- 📁 **Service Management Automation**: Start, stop, enable, or check the status of services with YAML-based task definitions.
- 🕒 **Real-time Monitoring**: Track live updates on system metrics and device statuses.
- 🌐 **Easy-to-Use YAML Configuration**: Define your tasks in a structured YAML file for seamless execution.
- 🐳 **Dockerized Setup**: Simplified deployment for scalability and consistency.
- 🎨 **Modern Web Interface**: Manage tasks and monitor progress via an intuitive frontend.

---

## 📂 **YAML Configuration Example**

The **RCMS** system uses YAML files to define actions for remote devices. Below is an example of a `tasks.yaml` file:

```yaml
devices:
  - ip: "192.168.100.128"
    username: "dynamo"
    password: "1590"
    actions:
      - start: "apache2"
      - status: "apache2"
      - enable: "apache2"
  - ip: "192.168.100.129"
    username: "admin"
    password: "admin123"
    actions:
      - stop: "nginx"
      - status: "nginx"
```

### 💡 **How it Works**
- **Devices**: Add the IP, username, and password of the target device.
- **Actions**: Define the tasks for each device, such as:
  - `start`: Start a service.
  - `stop`: Stop a service.
  - `status`: Check the status of a service.
  - `enable`: Enable a service to start on boot.

---

## ⚙️ **Functionalities**

1. **Manage Services with Ease**:
   - Automate repetitive tasks like starting or stopping services.
   - Check service statuses or enable them to run at boot.

2. **Device Connectivity**:
   - Connect securely to remote devices using SSH.

3. **Task Execution**:
   - Read tasks from a YAML configuration file and execute them on target devices.

4. **Real-Time Updates**:
   - Monitor device metrics and service statuses via WebSocket integration.

---

## 💻 **Technologies Used**

### Backend
- 🐍 **Flask**: Lightweight and powerful backend framework.
- 📦 **SQLite**: A lightweight database for storing configuration and logs.
- 🌐 **WebSockets**: Enables real-time updates for tasks and monitoring.

### Frontend
- ⚛️ **React**: Interactive and responsive user interface.
- 🎨 **CSS**: Ensures a modern and professional design.

### Deployment
- 🐳 **Docker**: For containerized and scalable deployment.

---

## 🚀 **Getting Started**

### Prerequisites

Before getting started, ensure you have the following installed:
- **Docker**
- **Python 3.x** (with `pip`)

### Installation

1. **Clone this repository**:
   ```bash
   git clone https://github.com/Dynamo2k1/RCMS.git
   cd RCMS
   ```

2. **Start the system**:
   ```bash
   docker-compose up --build
   ```

3. **Prepare your tasks**:
   - Create a YAML file (e.g., `tasks.yaml`) with the structure described above.

4. **Run the task executor**:
   ```bash
   python3 execute_tasks.py --config tasks.yaml
   ```

5. **Access the application**:
   - **Frontend**: [http://localhost:3000](http://localhost:3000)
   - **Backend**: [http://localhost:5000](http://localhost:5000)

---

## 📧 **Contact**

For any queries or suggestions, feel free to reach out:

- **GitHub**: [Dynamo2k1](https://github.com/Dynamo2k1)
- **Email**: [dynamo89247@gmail.com](mailto:dynamo89247@gmail.com)

---

## 📝 **License**

This project is licensed under the **MIT License**. You are free to use, modify, and distribute the project with proper attribution.

---

### 🎉 **Happy Managing!** 🎉
