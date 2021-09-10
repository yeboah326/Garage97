from sima_web_api.api.business.utils import get_top_selling_products, report_compute_sales_for_product, report_compute_stocks_for_product
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
        return jsonify({"message": "Could not process request"}), 400


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
        product_json = {"name": product.name, "description": product.description}
        return jsonify(product_json), 200
    except:
        return jsonify({"message": "Could not process request"}), 400


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
        return jsonify({"message": "Could not process request"}), 400


# ----- Sale ------


@product.route(
    "/<product_id>/sale", methods=["GET"], defaults={"page": 1, "items_per_page": 10}
)
@token_required
def product_get_all_sale(current_user, product_id, page, items_per_page):
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
        return jsonify({"message": "Could not process request"}), 400


@product.route(
    "/<product_id>/stock", methods=["GET"], defaults={"page": 1, "items_per_page": 10}
)
@token_required
def product_get_all_stock(current_user, product_id, page, items_per_page):
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
        return jsonify({"message": "Could not processs request"}), 400


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
        return jsonify({"message": "Could not processs request"}), 400

@product.route("/<product_id>/report")
@token_required
def product_get_report(current_user, product_id):
    """Return an overview of the product performance in terms of sales and stock

    Args:
        current_user (db.Model): current user logged in
        product_id (int): the id of the current product whose report is returned

    Returns:
        tuple(dict, int): Summary of the product performance in terms of sales and stock, HTTP status code
    """
    product = Product.query.filter_by(id=product_id).first()

    sales = report_compute_sales_for_product(product_id=product.id)

    stock = report_compute_stocks_for_product(product_id=product.id)

    product_summary = {
        "product_name": f"{product.name}",
        "product_sales": str(sales["total_sales"]),
        "product_stock": str(stock["total_stock"]),
        "product_profit_loss": str(sales["total_sales"]),
        "product_total_sold": str(sales["total_quantity"]),
        "product_total_bought": str(stock["total_quantity"]),
        "product_total_remaining": str(stock["total_quantity"] - sales["total_quantity"])
    }
    
    return product_summary, 200