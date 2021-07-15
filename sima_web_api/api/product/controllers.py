from flask import Blueprint, jsonify, request
from sima_web_api.api.users.utils import token_required
from sima_web_api.api.product.models import Product
from sima_web_api.api.stock.models import (Stock, StockList)
from sima_web_api.api.sale.models import (Sale, SaleList)
from sima_web_api.api import db

product = Blueprint(
    "product",
    __name__,
    url_prefix="/product",
)


@product.route("/<product_id>",methods=["GET"])
@token_required
def product_get_by_id(current_user,product_id):
    product = Product.query.filter_by(id=product_id).first()
    product_json = {"name":product.name}
    return jsonify(product_json), 200


@product.route("/<product_id>",methods=["DELETE"])
@token_required
def product_delete_by_id(current_user,product_id):
    product = Product.query.filter_by(id=product_id).first()

    if product:
        db.session.delete(product)
        db.session.save()

    return jsonify({"message":"Product deleted successfully"}), 200

@product.route("/<product_id>",methods=["PUT"])
@token_required
def product_update_by_id(current_user,product_id):
    product = Product.query.filter_by(id=product_id).first()

    data = request.get_json()

    try:
        if data["name"]:
            product.name = data["name"]
    except KeyError:
        pass

    db.session.commit()

    return jsonify({"message": "User info updated successfully"}), 200

# ----- Sale -----
@product.route("/<product_id>/sale", methods=["POST"])
@token_required
def sale_create_new(current_user, product_id):
    data = request.get_json()

    new_sale = Sale(
        quantity=data["quantity"],
        sellingPrice=data["sellingPrice"],
        product_id=product_id
    )

    db.session.add(new_sale)
    db.session.commit()
    return jsonify({"message":"Sale created successfully"}), 201

# TODO: Check relevance of endpoint
@product.route("/<product_id>/sale", methods=["GET"])
@token_required
def sale_get_all(current_user, product_id):
    product_sales = Sale.query.filter_by(product_id=product_id)
    product_sales_json = [
        {
        "quantity":sale.quantity, 
        "sellingPrice":sale.sellingPrice
        }
        for sale in product_sales
    ]
    return jsonify(product_sales_json), 200

@product.route("/<product_id>/sale", methods=["DELETE"])
@token_required
def sale_delete_all(current_user,product_id):
    sales = Sale.query.filter_by(product_id=product_id)
    if sales:
        db.session.delete(sales)
        db.session.save()

    return jsonify({"message": "Sales deleted successfully"}), 200




# ----- Sale List ----
@product.route("<product_id>/sale_list", methods=["GET"])
@token_required
def sale_list_get_all(current_user,product_id):
    product_sales_list = SaleList.query.filter_by(product_id=product_id)
    product_sales_list_json = [
        {
            "name": sales_list.name,
            "customerName": sales_list.customerName,
            "customerContact": sales_list.customerContact
        }
        for sales_list in product_sales_list
    ]
    return jsonify(product_sales_list_json), 200

@product.route("<product_id>/sale_list", methods=["DELETE"])
@token_required
def sale_list_delete_all(current_user,product_id):
    pass

# ----- Stock -----

@product.route("/<product_id>/stock", methods=["GET"])
@token_required
def stock_create_new(current_user,product_id):
    pass

# TODO: Check relevance of endpoint
@product.route("/<product_id>/stock", methods=["GET"])
@token_required
def stock_get_all(current_user,product_id):
    pass

# ----- Stock List -----
@product.route("<product_id>/stock_list", methods=["GET"])
@token_required
def stock_list_get_all(current_user,product_id):
    pass

@product.route("<product_id>/stock_list", methods=["DELETE"])
@token_required
def stock_list_delete_all(current_user,product_id):
    pass