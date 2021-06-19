from flask import Blueprint

main = Blueprint(
    "main",
    __name__,
    static_folder="static",
    url_prefix="/main",
    template_folder="templates/main",
)

@main.route("hello")
def hello():
    return "Main Blueprint Created successfully"
