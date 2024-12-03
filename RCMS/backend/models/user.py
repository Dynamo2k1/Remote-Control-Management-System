from extensions import db
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)  # Increased size for secure hashed passwords
    role = db.Column(db.String(20), nullable=False, default="user")  # Default role is "user"

    def set_password(self, password):
        """Hashes and securely stores the password."""
        self.password = generate_password_hash(password)

    def check_password(self, password):
        """Compares the hashed password."""
        return check_password_hash(self.password, password)
