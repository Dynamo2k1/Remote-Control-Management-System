import eventlet
eventlet.monkey_patch()
from extensions import db, jwt, socketio
from models.user import User
from flask_cors import CORS
from config import Config
from flask import Flask
from routes.auth_routes import auth_blueprint as auth_bp
from routes.device_routes import device_bp
from routes.file_routes import file_bp
import atexit

app = Flask(__name__)

# Configure CORS - Update to allow frontend and add flexibility for deployment
CORS(app, resources={r"/*": {"origins": ["http://localhost:3000", "http://127.0.0.1:3000"]}})

# Load configuration from the config file
app.config.from_object(Config)

# Initialize extensions
db.init_app(app)
jwt.init_app(app)
socketio.init_app(app)

# Import and register blueprints after extensions

app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(device_bp, url_prefix="/devices")
app.register_blueprint(file_bp, url_prefix="/files")
def ensure_tables_exist():
    with app.app_context():
        db.create_all()  # This will create tables if they do not exist
        print("Database tables ensured.")
# Function to create default credentials
def create_default_credentials():
    """
    Create default admin and user credentials if they do not exist.
    """
    with app.app_context():
        try:
            # Ensure tables are created
            db.create_all()

            # Create admin user
            admin_user = User.query.filter_by(username="admin").first()
            if not admin_user:
                admin_user = User(username="admin", email="admin@example.com", role="admin")
                admin_user.set_password("admin123")
                db.session.add(admin_user)

            # Create regular user
            regular_user = User.query.filter_by(username="user").first()
            if not regular_user:
                regular_user = User(username="user", email="user@example.com", role="user")
                regular_user.set_password("user123")
                db.session.add(regular_user)

            db.session.commit()
            print("Default credentials created:")
            print("Admin: username='admin', password='admin123'")
            print("User: username='user', password='user123'")

        except Exception as e:
            db.session.rollback()
            print(f"Error creating default credentials: {e}")

# Function to delete default credentials
def delete_default_credentials():
    """
    Delete default admin and user credentials on application shutdown.
    """
    with app.app_context():
        try:
            User.query.filter(User.username.in_(["admin", "user"])).delete()
            db.session.commit()
            print("Default credentials deleted.")
        except Exception as e:
            db.session.rollback()
            print(f"Error deleting default credentials: {e}")

# Ensure credentials are created at startup and deleted at shutdown
ensure_tables_exist()
create_default_credentials()

# Register cleanup function to delete credentials on app shutdown
atexit.register(delete_default_credentials)

if __name__ == "__main__":
    # Use `socketio.run` for websocket-enabled Flask app
    socketio.run(app, debug=True)
