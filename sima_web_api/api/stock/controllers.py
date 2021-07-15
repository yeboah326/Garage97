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

# ----- Stock -----
@stock.route("/<stock_id>",methods=["GET"])
@token_required
def stock_get_by_id(current_user,stock_id):
    pass

@stock.route("/<stock_list_id>",methods=["DELETE"])
@token_required
def stock_delete_by_id(current_user,stock_list_id):
    pass

@stock.route("/list/<stock_list_id>",methods=["PUT"])
@token_required
def stock_update_by_id(current_user,stock_list_id):
    pass


# ----- Stock List -----
@stock.route("/list/<stock_list_id>",methods=["GET"])
@token_required
def stock_list_get_by_id(current_user,stock_list_id):
    pass

@stock.route("/list/<stock_list_id>",methods=["DELETE"])
@token_required
def stock_list_delete_by_id(current_user,stock_list_id):
    pass
