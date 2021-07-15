from flask import Blueprint, jsonify, request
from sima_web_api.api.users.utils import token_required
from sima_web_api.api.stock.models import (Stock, StockList)

stock = Blueprint(
    "stock",
    __name__,
    url_prefix="/stock",
)

@stock.route("/hello")
def hello():
    return "Hello"
    