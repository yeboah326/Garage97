from flask import Blueprint, jsonify, request
from sima_web_api.api.users.utils import token_required
from sima_web_api.api.product.models import Product
from sima_web_api.api.stock.models import Stock, StockList
from sima_web_api.api.sale.models import Sale, SaleList
from sima_web_api.api import db
import datetime

product = Blueprint(
    "product",
    __name__,
    url_prefix="/product",
)


@product.route("/hello")
def product_hello():
    try:
        return jsonify({"message": "Product blueprint working"}), 200
    except:
        return jsonify({"message":"Could not process request"}), 400


@product.route("/<product_id>", methods=["GET"])
@token_required
def product_get_by_id(current_user, product_id):
    """
    product_get_by_id(current_user, product_id)

    HTTP Methods - GET

    for getting a product by the id
    """
    try:
        product = Product.query.filter_by(id=product_id).first()
        product_json = {"name": product.name,"description": product.description}
        return jsonify(product_json), 200
    except:
        return jsonify({"message":"Could not process request"}), 400

@product.route("/<product_id>", methods=["DELETE"])
@token_required
def product_delete_by_id(current_user, product_id):
    """
    product_delete_by_id(current_user, product_id)

    HTTP Methods - DELETE

    for deleting a product by the id
    """
    try:
        product = Product.query.filter_by(id=product_id).first()
        db.session.delete(product)
        db.session.commit()
        return jsonify({"message": "Product deleted successfully"}), 200
    except:
        return jsonify({"messsage": "Could not process request"}), 400


@product.route("/<product_id>", methods=["PUT"])
@token_required
def product_update_by_id(current_user, product_id):
    """
    product_update_by_id(current_user, product_id)

    HTTP Methods - PUT

    For updating a product by the id
    """
    try:
        product = Product.query.filter_by(id=product_id).first()

        data = request.get_json()

        try:
            if data["name"]:
                product.name = data["name"]
        except KeyError:
            pass
        try:
            if data["description"]:
                product.name = data["description"]
        except KeyError:
            pass

        db.session.commit()
        return jsonify({"message": "Product info updated successfully"}), 200
    except:
        return jsonify({"message":"Could not process request"}), 400


# ----- Sale -----


@product.route("/<product_id>/sale", methods=["GET"])
@token_required
def product_get_all_sale(current_user, product_id):
    """
    product_get_all_sale(current_user, product_id)

    HTTP Methods - GET

    For getting all product sales
    """
    try:
        product_sales = Sale.query.filter_by(product_id=product_id)
        product_sales_json = [
            {
                "id": sale.id,
                "quantity": sale.quantity,
                "selling_price": str(sale.selling_price),
                "created_on": sale.created_on,
            }
            for sale in product_sales
        ]

        product_sales_json = {
            "product": Product.query.filter_by(id=product_id).first().name,
            "product_sales": product_sales_json,
        }
        return jsonify(product_sales_json), 200
    except:
        return jsonify({"message":"Could not process request"}),400


@product.route("/<product_id>/stock")
@token_required
def product_get_all_stock(current_user, product_id):
    """
    product_get_all_stock(current_user, product_id)

    HTTP Methods - GET

    For getting all product stocks
    """
    try:
        product_stocks = Stock.query.filter_by(product_id=product_id)
        product_stocks_json = [
            {
                "id": stock.id,
                "quantity": stock.quantity,
                "buying_price": str(stock.buying_price),
                "created_on": stock.created_on,
            }
            for stock in product_stocks
        ]

        product_stocks_json = {
            "product": Product.query.filter_by(id=product_id).first().name,
            "product_stocks": product_stocks_json,
        }
        return jsonify(product_stocks_json), 200
    except:
        return jsonify({"message":"Could not processs request"}), 400


@product.route("/<product_id>/sale", methods=["DELETE"])
@token_required
def product_delete_all_sale(current_user, product_id):
    """
    product_delete_all_sale(current_user, product_id)

    HTTP Methods - DELETE

    deletes all product sales
    """
    try:
        product_sales = Sale.query.filter_by(product_id=product_id).delete()
        db.session.commit()
        return jsonify({"message": "Sales deleted successfully"}), 200
    except:
        return jsonify({"message":"Could not processs request"}), 400
