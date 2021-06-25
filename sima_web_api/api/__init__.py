from flask import Flask, jsonify
import os
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

app = Flask(__name__)

# Configuration
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = f"mysql+mysqlconnector://{os.environ.get('MYSQL_USERNAME')}:{os.environ.get('MYSQL_PASSWORD')}@{os.environ.get('MYSQL_SERVER')}/{os.environ.get('MYSQL_DATABASE_NAME')}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


# SetUp
CORS(app)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

from sima_web_api.api.main.controllers import main
from sima_web_api.api.users.controllers import users

# Blueprints
app.register_blueprint(main)
app.register_blueprint(users)

# Error Handling Pages
@app.errorhandler(404)
def page_not_found(error):
    return jsonify({"message": "Page not found"}), 404

