from flask import Blueprint, jsonify

users = Blueprint(
    "users",
    __name__,
    url_prefix="/users",
)


@users.route("hello")
def hello():
    return jsonify({"message":"Users Blueprint Created successfully"})
