import eventlet
eventlet.monkey_patch()
from extensions import db, jwt, socketio
from models.user import User
from flask_cors import CORS  # Import CORS
from config import Config
from flask import Flask
import atexit


app = Flask(__name__)

# Configure CORS - Allow only frontend to access the backend
CORS(app, origins=["http://localhost:3000"])

app.config.from_object(Config)

# Initialize extensions
db.init_app(app)
jwt.init_app(app)
socketio.init_app(app)

# Import and register blueprints after extensions
from routes.auth_routes import auth_bp
from routes.device_routes import device_bp
from routes.file_routes import file_bp

app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(device_bp, url_prefix="/devices")
app.register_blueprint(file_bp, url_prefix="/files")

# Function to create default credentials
def create_default_credentials():
    with app.app_context():
        # Ensure tables are created before querying
        db.create_all()

        # Create admin user
        admin_user = User.query.filter_by(username="admin").first()
        if not admin_user:
            admin_user = User(username="admin", role="admin")
            admin_user.set_password("admin123")
            db.session.add(admin_user)

        # Create regular user
        regular_user = User.query.filter_by(username="user").first()
        if not regular_user:
            regular_user = User(username="user", role="user")
            regular_user.set_password("user123")
            db.session.add(regular_user)

        db.session.commit()
        print("Default credentials created:")
        print("Admin: username='admin', password='admin123'")
        print("User: username='user', password='user123'")

# Function to delete default credentials
def delete_default_credentials():
    with app.app_context():
        User.query.filter(User.username.in_(["admin", "user"])).delete()
        db.session.commit()
        print("Default credentials deleted.")

# Ensure credentials are created at startup and deleted at shutdown
create_default_credentials()

# Register cleanup function to delete credentials on app shutdown
atexit.register(delete_default_credentials)

if __name__ == "__main__":
    socketio.run(app, debug=True)
