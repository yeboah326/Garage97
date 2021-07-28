from flask import Blueprint, jsonify, request
from sima_web_api.api.users.utils import token_required
from sima_web_api.api.stock.models import Stock, StockList
from sima_web_api.api.product.models import Product
from sima_web_api.api import db
import datetime

stock = Blueprint(
    "stock",
    __name__,
    url_prefix="/stock",
)


@stock.route("/hello")
def hello():
    return jsonify({"message": "Hello"})


# ----- Stock -----
@stock.route("/all", methods=["GET"])
@token_required
def stock_get_all(current_user):
    """
    stock_get_all(current_user)

    HTTP Methods - GET

    To test if the module is working
    """
    stocks = Stock.query.all()

    stocks_json = [
        {
            "id": stock.id,
            "product": Product.query.filter_by(id=stock.product_id),
            "buying_price": stock.buying_price,
            "quantity": stock.quantity,
            "created_on": stock.created_on,
        }
        for stock in stocks
    ]

    return jsonify(stocks_json)


@stock.route("/stock_list/<stock_list_id>", methods=["GET"])
@token_required
def stock_get_all_by_stock_list_id(current_user, stock_list_id):
    """
    stock_get_all_by_stock_list_id(current_user, stock_list_id)

    HTTP Methods - GET

    To test if the module is working
    """
    stocks_by_stock_list_id = Stock.query.filter_by(stock_list_id=stock_list_id).first()
    stocks_by_stock_list_id_json = [
        {
            "id": stock.id,
            "product": Product.query.filter_by(id=stock.product_id),
            "buying_price": stock.buying_price,
            "quantity": stock.quantity,
            "created_on": stock.created_on,
        }
        for stock in stocks_by_stock_list_id
    ]

    return jsonify(stocks_by_stock_list_id_json)


@stock.route("/<stock_id>", methods=["GET"])
@token_required
def stock_get_by_id(current_user, stock_id):
    """
    stock_get_by_id(current_user, stock_id)

    HTTP Methods - GET

    To test if the module is working
    """
    stock = Stock.query.filter_by(id=stock_id).first()
    stock_json = {
        "id": stock.id,
        "product": Product.query.filter_by(id=stock.product_id),
        "buying_price": stock.buying_price,
        "quantity": stock.quantity,
        "created_on": stock.created_on,
    }
    return jsonify(stock_json), 200


@stock.route("/<stock_id>", methods=["DELETE"])
@token_required
def stock_delete_by_id(current_user, stock_id):
    """
    stock_delete_by_id(current_user, stock_id)

    HTTP Methods - DELETE

    Deletes resource
    """
    stock = Stock.query.filter_by(id=stock_id).first()

    if stock:
        db.session.delete(stock)
        db.session.commit()
        return jsonify({"message": "Stock deleted successfully"})
    else:
        return jsonify({"message": "Could not delete stock"})


@stock.route("/<stock_id>", methods=["PUT"])
@token_required
def stock_update_by_id(current_user, stock_id):
    """
    stock_update_by_id(current_user, stock_id)

    HTTP Methods - PUT

    Updates existing resources
    """
    stock = Stock.query.filter_by(id=stock_id).first()

    data = request.get_json()

    try:
        if data["quantity"]:
            stock.quantity = data["quantity"]

        if data["buying_price"]:
            stock.buying_price = data["buying_price"]

    except KeyError:
        return jsonify({"message": "Wrong data passed"})

    db.session.commit()
    return jsonify({"message": "Stock updated successfully"})


# ----- Stock List -----
@stock.route("/list", methods=["POST"])
@token_required
def stock_list_create_new(current_user):
    """
    stock_list_creat_new(current_user)

    HTTP Methods - POST

    To send data
    """
    data = request.get_json()

    new_stock_list = StockList(
        created_on=str(datetime.date.today()),
        business_id=data["business_id"]  
        )
    db.session.add(new_stock_list)
    db.session.commit()

    for stock in data["stock_list"]:
        new_stock = Stock(
            quantity=stock["quantity"],
            buying_price=stock["buying_price"],
            created_on=str(datetime.date.today()),
            product_id=stock["product_id"],
            stock_list_id=new_stock_list.id,
        )
        db.session.add(new_stock)
        db.session.commit()

    return jsonify({"message": "Stocks created sucessfully"}), 201


@stock.route("<product_id>/stock_list", methods=["GET"])
@token_required
def stock_list_get_all(current_user, product_id):
    """
    stock_list_get_all(current_user, product_id)

    HTTP Methods - GET

    To test if the module is working
    """
    product_stock_list = StockList.query.filter_by(product_id=product_id)

    product_stock_list_json = [
        {
            "id": stock_list.id,
            "name": stock_list.name,
            "created_on": stock_list.created_on,
        }
        for stock_list in product_stock_list
    ]


@stock.route("/list/<stock_list_id>", methods=["DELETE"])
@token_required
def stock_list_delete_by_id(current_user, stock_list_id):
    """
    stock_list_delete_by_id(current_user, stock_list_id)

    HTTP Methods - DELETE

    Deletes resource
    """
    stock_list = StockList.query.filter_by(id=stock_list_id)

    if stock_list:
        db.session.delete(stock_list)
        db.session.commit()
        return jsonify({"message": "Stock list deleted successfully"})
    else:
        return jsonify({"message": "Could not delete stock list"})


@stock.route("<product_id>/stock_list", methods=["DELETE"])
@token_required
def stock_list_delete_all(current_user, product_id):
    """
    stock_list_delete_all(current_user, product_id)

    HTTP Methods - DELETE

    Deletes resource
    """
    stock_lists = StockList.query.all().delete()

    return jsonify({"message": "All stocklists successfully deleted"})
