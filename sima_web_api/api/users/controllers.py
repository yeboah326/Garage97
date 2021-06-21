from flask import Blueprint, jsonify
from sima_web_api.api.users.models import User

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
            "id": user.public_id,
            "name": user.name,
            "dateOfBirth": user.dateOfBirth,
            "email": user.email,
            "displayName": user.displayName,
            "contactOne": user.contactOne,
            "contactTwo": user.contactTwo,
        }
        for user in users
    ]
    return jsonify(users_json)


# TODO: Define get_user_by_id route
@users.route("/<public_id>", methods=["GET"])
def get_user_by_id(id):
    pass


# TODO: Define get_new_user_form route
@users.route("/new", methods=["GET"])
def get_new_user_form():
    pass


# TODO: Define create_new_user route
@users.route("/", methods=["POST"])
def create_new_user():
    pass


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
def delete_user_by_id():
    pass
