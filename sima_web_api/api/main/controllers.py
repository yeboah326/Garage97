from flask import Blueprint, jsonify

main = Blueprint(
    "main",
    __name__,
    url_prefix="/main",
)


@main.route("hello")
def hello():
    return jsonify({"message": "Main Blueprint Created successfully"})
