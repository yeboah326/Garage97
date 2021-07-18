from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash
from sima_web_api.api.users.models import User
from sima_web_api.api import db
import os
import uuid
import jwt
import datetime

users = Blueprint(
    "users",
    __name__,
    url_prefix="/users",
)


@users.route("hello")
def hello():
    return jsonify({"message": "Users Blueprint Created successfully"}), 200


@users.route("/login", methods=["POST"])
def user_login():
    auth = request.get_json()
    if not auth or not auth["email"] or not auth["password"]:
        return jsonify({"message": "User not found or data is invalid"}), 400
    user = User.query.filter_by(email=auth["email"]).first()

    if not user:
        return jsonify({"message": "User not found or data is invalid"}), 400

    if check_password_hash(user.password, auth["password"]):
        token = jwt.encode(
            {
                "public_id": user.public_id,
                "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            },
            os.environ.get("SECRET_KEY"),
        )
        return jsonify({"public_id": user.public_id, "token": token}), 200

    return jsonify({"message": "Authorization failed"}), 401


@users.route("/", methods=["GET"])
def get_all_users():
    users = User.query.all()

    users_json = [
        {
            "public_id": user.public_id,
            "name": user.name,
            "date_of_birth": user.date_of_birth,
            "email": user.email,
            "display_name": user.display_name,
            "contact_one": user.contact_one,
            "contact_two": user.contact_two,
        }
        for user in users
    ]
    return jsonify(users_json), 200


@users.route("/<public_id>", methods=["GET"])
def get_user_by_id(public_id):
    user = User.query.filter_by(public_id=public_id).first()
    if user:
        user_json = {
            "public_id": user.public_id,
            "name": user.name,
            "date_of_birth": user.date_of_birth,
            "email": user.email,
            "display_name": user.display_name,
            "contact_one": user.contact_one,
            "contact_two": user.contact_two,
        }
        return jsonify(user_json), 200
    return jsonify({"message": "User not found"}), 200


@users.route("/", methods=["POST"])
def create_new_user():
    data = request.get_json()

    hashed_password = generate_password_hash(data["password"], method="sha256")

    new_user = User(
        public_id=str(uuid.uuid4()),
        name=data["name"],
        password=hashed_password,
        date_of_birth=None,
        email=data["email"],
        contact_one="",
        contact_two="",
        display_name="",
    )

    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "New user created"}), 201


@users.route("/<public_id>", methods=["PUT"])
def update_user_info(public_id):
    # EMAIL,DISPLAY_NAME, CONTACT ONE, CONTACT TWO
    user = User.query.filter_by(public_id=public_id).first()

    data = request.get_json()

    try:
        if data["email"]:
            user.email = data["email"]
    except KeyError:
        pass

    try:
        if data["display_name"]:
            user.display_name = data["display_name"]
    except KeyError:
        pass
    try:
        if data["contact_one"]:
            user.contact_one = data["contact_one"]
    except KeyError:
        pass
    try:
        if data["contact_two"]:
            user.contact_two = data["contact_two"]
    except KeyError:
        pass
    db.session.commit()
    return jsonify({"message": "User info updated successfully"}), 200


# TODO: Define delete_all_users route
@users.route("/", methods=["DELETE"])
def delete_all_users():
    pass


@users.route("/<public_id>", methods=["DELETE"])
def delete_user_by_id(public_id):
    user = User.query.filter_by(public_id=public_id).first()
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted successfully"}), 200
