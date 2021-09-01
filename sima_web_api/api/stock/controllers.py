from flask import Blueprint, jsonify, request
from sima_web_api.api.users.utils import token_required
from sima_web_api.api.stock.models import Stock, StockList
from sima_web_api.api.product.models import Product
from sima_web_api.api import db
import datetime
from sima_web_api.api.business.utils import (
    compute_total_buying_price,
    compute_total_quantity_stocklist,
)
from sima_web_api.api.business.utils import (
    next_page_items
)

stock = Blueprint(
    "stock",
    __name__,
    url_prefix="/stock",
)


@stock.route("/hello")
def hello():
    try:
        return jsonify({"message": "Stock blueprint working"}), 200
    except:
        return jsonify({"message": "Could not process the request"}), 400


# ----- Stock -----
@stock.route("/stock_list/<stock_list_id>", methods=["GET"],defaults={"page": 1, "items_per_page": 10})
@token_required
def stock_get_all_by_stock_list_id(current_user, stock_list_id, page, items_per_page):
    """
    stock_get_all_by_stock_list_id(current_user, stock_list_id)

    HTTP Methods - GET

    get all stocks by stock list id
    """
    try:
        page = int(request.args["page"] if request.args["page"] else page)
        items_per_page = int(
            request.args["items_per_page"]
            if request.args["items_per_page"]
            else items_per_page
        )
    except:
        pass
    try:
        stocks_by_stock_list_id = Stock.query.filter_by(stock_list_id=stock_list_id)
        stocks_by_stock_list_id_json = [
            {
                "id": stock.id,
                "product": Product.query.filter_by(id=stock.product_id).first().name,
                "buying_price": str(stock.buying_price),
                "quantity": stock.quantity,
                "created_on": stock.created_on,
            }
            for stock in stocks_by_stock_list_id
        ]

        results = next_page_items(stocks_by_stock_list_id_json, items_per_page, page) 
        return jsonify(stocks_by_stock_list_id_json["page_items"]), 200
    except:
        return jsonify({"mesage": "Could not process request"}), 400


@stock.route("/<stock_id>", methods=["GET"])
@token_required
def stock_get_by_id(current_user, stock_id):
    """
    stock_get_by_id(current_user, stock_id)

    HTTP Methods - GET

    get stocks by id
    """
    try:
        stock = Stock.query.filter_by(id=stock_id).first()
        stock_json = {
            "id": stock.id,
            "product": Product.query.filter_by(id=stock.product_id).first().name,
            "buying_price": str(stock.buying_price),
            "quantity": stock.quantity,
            "created_on": stock.created_on,
        }
        return jsonify(stock_json), 200
    except:
        return jsonify({"mesage": "Could not process request"}), 400


@stock.route("/<stock_id>", methods=["DELETE"])
@token_required
def stock_delete_by_id(current_user, stock_id):
    """
    stock_delete_by_id(current_user, stock_id)

    HTTP Methods - DELETE

    Deletes stocks by id
    """
    try:
        stock = Stock.query.filter_by(id=stock_id).first()

        db.session.delete(stock)
        db.session.commit()
        return jsonify({"message": "Stock deleted successfully"}), 200
    except:
        return jsonify({"message": "Could not process request"}), 400


@stock.route("/<stock_id>", methods=["PUT"])
@token_required
def stock_update_by_id(current_user, stock_id):
    """
    stock_update_by_id(current_user, stock_id)

    HTTP Methods - PUT

    Updates stocks using the stock id
    """
    try:
        stock = Stock.query.filter_by(id=stock_id).first()

        data = request.get_json()

        try:
            if data["quantity"]:
                stock.quantity = data["quantity"]
        except KeyError:
            pass
        try:
            if data["buying_price"]:
                stock.buying_price = data["buying_price"]
        except KeyError:
            pass
        db.session.commit()
        return jsonify({"message": "Stock updated successfully"}), 200
    except:
        return jsonify({"message": "Could not process request"}), 400


@stock.route("/add/<stock_list_id>", methods=["POST"])
@token_required
def stock_add_new_stock_to_stocklist(current_user, stock_list_id):
    """
    stock_add_new_stock_to_stocklist(current_user,stock_list_id)

    HTTP Methods - POST

    Adds new stocks to an already existing stock_list
    """
    try:
        data = request.get_json()

        stock_list = StockList.query.filter_by(id=stock_list_id)

        if data["stocks"]:
            for stock in data["stocks"]:
                new_stock = Stock(
                    quantity=stock["quantity"],
                    buying_price=stock["buying_price"],
                    created_on=str(datetime.date.today()),
                    product_id=stock["product_id"],
                    stock_list_id=stock_list_id,
                )
                db.session.add(new_stock)
                db.session.commit()

            return jsonify({"message": "New stock added successfully"}), 201
        else:
            return jsonify({"message": "No data passed"}), 400
    except:
        return jsonify({"message": "Could not process request"}), 400


# ----- Stock List -----
@stock.route("/list", methods=["POST"])
@token_required
def stock_list_create_new(current_user):
    """
    stock_list_creat_new(current_user)

    HTTP Methods - POST

    create a new stock list
    """
    try:
        data = request.get_json()

        new_stock_list = StockList(
            created_on=str(datetime.date.today()), business_id=data["business_id"]
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

        return jsonify({"message": "Stocks created successfully"}), 201
    except:
        return jsonify({"message": "Could not process request"}), 400


@stock.route("/list/<stocklist_id>", methods=["GET"])
@token_required
def stock_list_get_by_id(current_user, stocklist_id):
    """
    stock_list_get_by_id(current_user, stocklist_id)

    HTTP Methods - GET

    For getting the sale listusing the customers id
    """
    try:
        stock_list = StockList.query.filter_by(id=stocklist_id).first()

        stock_list_json = {
            "id": stock_list.id,
            "created_on": stock_list.created_on,
            "total_quantity": str(
                compute_total_quantity_stocklist(stock_list)["total_quantity"]
            ),
            "total_buying_price": str(
                compute_total_buying_price(stock_list)["total_buying_price"]
            ),
        }
        return jsonify(stock_list_json), 200
    except:
        return jsonify({"message": "Could not process request"}), 400


@stock.route("/list/<stock_list_id>", methods=["DELETE"])
@token_required
def stock_list_delete_by_id(current_user, stock_list_id):
    """
    stock_list_delete_by_id(current_user, stock_list_id)

    HTTP Methods - DELETE

    Deletes stock list by id
    """
    try:
        stock_list = StockList.query.filter_by(id=stock_list_id).first()

        db.session.delete(stock_list)
        db.session.commit()
        return jsonify({"message": "Stock list deleted successfully"}), 200
    except:
        return jsonify({"message": "Could not delete stock list"}), 400


@stock.route("/list/<stocklist_id>", methods=["PUT"])
@token_required
def stock_list_update_by_id(current_user, stocklist_id):
    """
    stock_list_update_by_id(current_user,stocklist_id)

    HTTP Methods - PUT

    For updating the sale list
    """
    try:

        stock_list = StockList.query.filter_by(id=stocklist_id).first()

        data = request.get_json()

        try:
            if data["name"]:
                sale_list.name = data["name"]
        except KeyError:
            pass
        db.session.commit()
        return jsonify({"message": "Sale list updated sucessfully"}), 200
    except:
        return jsonify({"message": "Could not process request"}), 400
