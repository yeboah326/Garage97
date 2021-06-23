from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash
from sima_web_api.api.users.models import User
from sima_web_api.api import db
import uuid

users = Blueprint(
    "users",
    __name__,
    url_prefix="/users",
)


@users.route("hello")
def hello():
    return jsonify({"message": "Users Blueprint Created successfully"})


# TODO: Define user_login route
@users.route("login/")
def user_login():
    pass


# TODO: Define get_all_users route
@users.route("/", methods=["GET"])
def get_all_users():
    users = User.query.all()

    users_json = [
        {
            "public_id": user.public_id,
            "name": user.name,
            "dateOfBirth": user.dateOfBirth,
            "email": user.email,
            "displayName": user.displayName,
            "contactOne": user.contactOne,
            "contactTwo": user.contactTwo,
        }
        for user in users
    ]
    return jsonify(users_json), 200


# TODO: Define get_user_by_id route
@users.route("/<public_id>", methods=["GET"])
def get_user_by_id(public_id):
    user = User.query.filter_by(public_id=public_id).first()
    if user:
        user_json = {
            "public_id": user.public_id,
            "name": user.name,
            "dateOfBirth": user.dateOfBirth,
            "email": user.email,
            "displayName": user.displayName,
            "contactOne": user.contactOne,
            "contactTwo": user.contactTwo,
        }
        return jsonify(user_json), 200
    return jsonify({"message": "User not found"}), 200




# TODO: Define create_new_user route
@users.route("/", methods=["POST"])
def create_new_user():
    data = request.get_json()

    hashed_password = generate_password_hash(data["password"], method="sha256")

    new_user = User(
        public_id=str(uuid.uuid4()),
        name=data["name"],
        password=hashed_password,
        dateOfBirth=data["dateOfBirth"],
        email=data["email"],
        contactOne="",
        contactTwo="",
        displayName="",
    )

    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "New user created"}), 200


# TODO: Define update_user_info route
@users.route("/", methods=["PUT"])
def update_user_info():
    pass


# TODO: Define delete_all_users route
@users.route("/", methods=["DELETE"])
def delete_all_users():
    pass


# TODO: Define delete_user_by_id route
@users.route("/<public_id>", methods=["DELETE"])
def delete_user_by_id(public_id):
    user = User.query.filter_by(public_id=public_id).first()
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message":"User deleted successfully"})