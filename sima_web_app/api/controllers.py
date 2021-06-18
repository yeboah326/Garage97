from flask import Blueprint

api = Blueprint(
    "api",
    __name__,
    static_folder="static",
    url_prefix="/api",
    template_folder="templates/api",
)

@api.route("hello")
def hello():
    return "API Blueprint Created successfully"
