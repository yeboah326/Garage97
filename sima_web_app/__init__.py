from flask import Flask, render_template
from os import environ
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sima_web_app.api.controllers import api
from sima_web_app.users.controllers import users

app = Flask(__name__)

# Configuration
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = f"mysql+mysqlconnector://{environ.get('MYSQL_USERNAME')}:{environ.get('MYSQL_PASSWORD')}@{eviron.get('MYSQL_SERVER')}/{environ.get('MYSQL_DATABASE_NAME')}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Blueprints
app.register_blueprint(api)
app.register_blueprint(users)

# Database SetUp
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Error Handling Pages
@app.errorhandler(404)
def page_not_found(error):
    return render_template("error_pages/404.html")
