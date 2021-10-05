from flask import Flask, jsonify
import os
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

app = Flask(__name__, static_folder="../../build", static_url_path="/")

# Configuration
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = f"mysql+mysqlconnector://{os.environ.get('MYSQL_USERNAME')}:{os.environ.get('MYSQL_PASSWORD')}@{os.environ.get('MYSQL_SERVER')}/{os.environ.get('MYSQL_DATABASE_NAME')}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


# SetUp
CORS(app)
db = SQLAlchemy(app, session_options={"expire_on_commit": False})
migrate = Migrate(app, db)

from sima_web_api.api.main.controllers import main
from sima_web_api.api.users.controllers import users
from sima_web_api.api.business.controllers import business
from sima_web_api.api.product.controllers import product
from sima_web_api.api.sale.controllers import sale
from sima_web_api.api.stock.controllers import stock

# Blueprints
app.register_blueprint(main)
app.register_blueprint(users)
app.register_blueprint(business)
app.register_blueprint(product)
app.register_blueprint(sale)
app.register_blueprint(stock)

# Error Handling Pages
@app.errorhandler(404)
def page_not_found(error):
    return app.send_static_file("index.html")

@app.route("/")
def index():
    return app.send_static_file("index.html")