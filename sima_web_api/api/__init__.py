from flask import Flask, render_template
import os
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sima_web_api.api.main.controllers import main
from sima_web_api.api.users.controllers import users

app = Flask(__name__)

# Configuration
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = f"mysql+mysqlconnector://{os.environ.get('MYSQL_USERNAME')}:{os.environ.get('MYSQL_PASSWORD')}@{os.environ.get('MYSQL_SERVER')}/{os.environ.get('MYSQL_DATABASE_NAME')}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Blueprints
app.register_blueprint(main)
app.register_blueprint(users)

# Database SetUp
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Error Handling Pages
@app.errorhandler(404)
def page_not_found(error):
    return render_template("error_pages/404.html")
