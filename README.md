# 🚀 Remote Control Management System (RCMS)

**RCMS** is a powerful, secure, and centralized platform designed for system administrators to manage networked fleets of devices. It automates critical IT operations—from software installation to service management—through a simple YAML configuration, all visualized in a modern real-time dashboard.

---

## 🌟 Why RCMS?

Managing multiple remote servers manually via SSH is tedious and error-prone. RCMS solves this by allowing you to:

* **Orchestrate Fleets:** Push commands to multiple servers simultaneously.
* **Declarative Configuration:** Define *what* you want (e.g., "nginx should be running") using simple YAML files, and let RCMS handle the *how*.
* **Live Feedback:** Watch command execution logs and exit statuses in real-time via WebSockets.

---

## ✨ Key Features

* **🔐 Secure Authentication**: JWT-based login system with role-based access (Admin/User).
* **⚡ specific Actions**: detailed control over system services:
* `start`, `stop`, `restart` services.
* `enable`, `disable` boot-time services.
* `install` new packages automatically.
* `status` checks for health monitoring.


* **📄 YAML-Based Tasking**: No complex scripting required. Just upload a declarative `.yaml` file.
* **📡 Real-Time Monitoring**: WebSocket integration provides instant feedback on task execution from remote servers.
* **🐳 Dockerized Architecture**: Fully containerized backend and frontend for instant deployment.
* **🖥️ Modern UI**: A responsive React frontend using MDB Bootstrap for a sleek user experience.

---

## 🛠️ Tech Stack

### **Backend**

* **Framework**: Python Flask (Factory Pattern)
* **Networking**: `Paramiko` for SSH tunneling, `Socket.IO` for real-time streams.
* **Database**: SQLite (SQLAlchemy ORM).
* **Security**: Flask-JWT-Extended for token-based auth.

### **Frontend**

* **Library**: React.js (v18).
* **Styling**: MDB React UI Kit & Custom CSS.
* **State**: React Hooks & Context API.
* **Communication**: Axios (REST) & Socket.io-client (WebSockets).

### **DevOps**

* **Containerization**: Docker & Docker Compose.

---

## 🚀 Getting Started

### Prerequisites

* **Docker Desktop** installed on your machine.
* **Git**.

### Installation

1. **Clone the Repository**
```bash
git clone https://github.com/Dynamo2k1/Remote-Control-Management-System.git
cd Remote-Control-Management-System/RCMS

```


2. **Launch with Docker Compose**
```bash
docker-compose up --build

```


*This will start the Backend on port `5000` and the Frontend on port `3000`.*
3. **Access the Application**
* Open your browser and navigate to: [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000)



---

## 🔑 Default Credentials

Upon first startup, the system automatically creates these default accounts:

| Role | Username | Password |
| --- | --- | --- |
| **Administrator** | `admin` | `admin123` |
| **Standard User** | `user` | `user123` |

> ⚠️ **Note:** For security, these credentials are reset/managed in `app.py`. It is recommended to change these in a production environment.

---

## 📂 Configuration Guide (YAML)

RCMS uses a declarative YAML format to instruct remote devices.

### Supported Actions

| Action | Description | Example |
| --- | --- | --- |
| `install` | Installs a package (apt) | `install: "nginx"` |
| `start` | Starts a systemd service | `start: "apache2"` |
| `stop` | Stops a systemd service | `stop: "docker"` |
| `enable` | Enables service on boot | `enable: "ssh"` |
| `status` | Checks service status | `status: "nginx"` |

### Example `tasks.yaml`

Create a file named `tasks.yaml` and upload it via the dashboard:

```yaml
devices:
  # Device 1: Web Server
  - ip: "192.168.1.50"
    username: "ubuntu"
    password: "securepassword123"
    actions:
      - install: "nginx"      # Install Nginx
      - enable: "nginx"       # Enable it on boot
      - start: "nginx"        # Start the service

  # Device 2: Database Server
  - ip: "192.168.1.51"
    username: "admin"
    password: "dbpassword456"
    actions:
      - status: "postgresql"  # Check DB status
      - stop: "apache2"       # Ensure Apache is off

```

---

## 📂 Project Structure

```bash
RCMS/
├── backend/
│   ├── instance/          # SQLite Database
│   ├── routes/            # API Endpoints (Auth, Devices, Files)
│   ├── utils/             # SSH Executor & YAML Parsers
│   ├── app.py             # App Factory & Config
│   ├── Dockerfile         # Python Container Logic
│   └── requirements.txt   # Python Dependencies
├── frontend/
│   ├── public/            # Static Assets
│   ├── src/               # React Components & Pages
│   ├── Dockerfile         # Node.js Container Logic
│   └── package.json       # JS Dependencies
├── docker-compose.yml     # Container Orchestration
└── README.md              # Documentation

```

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📧 Contact

**Project Maintainer**: Dynamo2k1

**Email**: [dynamo89247@gmail.com](mailto:dynamo89247@gmail.com)

**GitHub**: [github.com/Dynamo2k1](https://github.com/Dynamo2k1)

---

## 📝 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<div align="center">
<sub>Built with ❤️ by Dynamo2k1</sub>
</div>
