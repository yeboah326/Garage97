from flask import Flask, render_template
from sima_web_app.main.controllers import main
from sima_web_app.users.controllers import users

app = Flask(__name__)

# Blueprints
app.register_blueprint(main)
app.register_blueprint(users)

# Error Handling Pages
@app.errorhandler(404)
def page_not_found(error):
    return render_template("error_pages/404.html")
