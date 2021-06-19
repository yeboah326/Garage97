from flask import Blueprint

users = Blueprint(
    "users",
    __name__,
    static_folder="static/",
    url_prefix="/users",
    template_folder="templates/users",
)


@users.route("hello")
def hello():
    return "Users Blueprint Created successfully"
