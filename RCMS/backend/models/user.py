
from extensions import db
from werkzeug.security import generate_password_hash

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)  # Securely hashed
    role = db.Column(db.String(20), nullable=False)

    def set_password(self, password):
        """Hash and store the password securely."""
        self.password = generate_password_hash(password)

    def check_password(self, password):
        """Compare hashed passwords."""
        return check_password_hash(self.password, password)
