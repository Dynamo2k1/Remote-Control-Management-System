from flask import Blueprint, request, redirect, url_for, session, flash, jsonify, current_app as app
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from extensions import db
from models.user import User

# Create a Blueprint for authentication
auth_blueprint = Blueprint("auth", __name__)

@auth_blueprint.route("/register", methods=["POST"])
def register():
    """API route for user registration."""
    data = request.json  # Receive JSON data from the frontend
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    # Validation
    if not email or not username or not password:
        return jsonify({"message": "All fields are required."}), 400

    # Check if the username or email already exists
    existing_user = User.query.filter((User.username == username) | (User.email == email)).first()
    if existing_user:
        return jsonify({"message": "Username or email already taken. Please try again."}), 400

    # Create and save the new user
    new_user = User(username=username, email=email, role="user")
    new_user.set_password(password)
    db.session.add(new_user)
    try:
        db.session.commit()
        return jsonify({"message": "Registration successful! Please login."}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"An error occurred while registering: {e}"}), 500


@auth_blueprint.route("/login", methods=["POST"])
def login():
    """Handles user login."""
    try:
        # Parse JSON data from the request
        data = request.json
        username = data.get("username")
        password = data.get("password")

        # Validate input
        if not username or not password:
            return jsonify({"message": "Username and password are required"}), 400

        # Fetch user by username
        user = User.query.filter_by(username=username).first()
        if not user or not user.check_password(password):
            return jsonify({"message": "Invalid username or password"}), 401

        # Generate JWT token
        access_token = create_access_token(
            identity="placeholder",  # Use a string as the identity
            additional_claims={
                "username": username,
                "role": user.role
            }
        )

        # Return success response
        return jsonify({"access_token": access_token, "message": "Login successful"}), 200
    except Exception as e:
        app.logger.error(f"Login error: {e}")
        return jsonify({"message": "Internal server error"}), 500



@auth_blueprint.route("/logout", methods=["POST"])
def logout():
    """API route for user logout."""
    session.clear()
    return jsonify({"message": "Logout successful."}), 200
