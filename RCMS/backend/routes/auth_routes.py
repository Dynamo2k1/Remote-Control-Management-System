from flask import Blueprint, request, jsonify, current_app as app
from flask_jwt_extended import create_access_token
from extensions import db
from models.user import User
from werkzeug.security import check_password_hash

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    app.logger.info(f"Login attempt for username: {username}")

    user = User.query.filter_by(username=username).first()
    if not user:
        app.logger.error(f"User {username} not found.")
        return jsonify({"error": "Invalid credentials"}), 401

    if not check_password_hash(user.password, password):
        app.logger.error(f"Incorrect password for user {username}.")
        return jsonify({"error": "Invalid credentials"}), 401

    # Pass `identity=None` and move data to `additional_claims`
    access_token = create_access_token(
        identity="placeholder",  # Use a string as the identity
        additional_claims={
            "username": username,
            "role": user.role
        }
    )
    app.logger.info(f"Login successful for user {username}.")
    return jsonify({"access_token": access_token}), 200
