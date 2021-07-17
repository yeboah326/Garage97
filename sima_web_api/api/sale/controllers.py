from flask import Blueprint, jsonify, request
from sima_web_api.api.users.utils import token_required
from sima_web_api.api.sale.models import (Sale,SaleList)
from sima_web_api.api.product.models import (Product)
from sima_web_api.api import db

sale = Blueprint(
    "sale",
    __name__,
    url_prefix="/sale",
)

@sale.route("/hello")
def hello():
    return "Hello"


# ----- Sale -----
@sale.route("/sale_list/<sale_list_id>",methods=["GET"])
@token_required
def sale_get_all_by_sale_list_id(current_user, sale_list_id):
    stocks_by_sale_list_id = Sale.query.filter_by(sale_list_id=sale_list_id).first()

    stocks_by_sale_list_id = [
        {
            "id":sale.id,
            "product":Product.query.filter_by(id=sale.product_id),
            "selling_price":sale.selling_price,
            "quantity":sale.quantity,
            "created_on":sale.created_on,
        }
        for sale in sale_delete_by_id
    ]

@sale.route("/<sale_id>", methods=["GET"])
@token_required
def sale_get_by_id(current_user,sale_id):
    sale = Sale.query.filter_by(id=sale_id).first()
    sale_json = {
        "id":sale.id,
        "product":Product.query.filter_by(id=sale.product_id),
        "quantity":sale.quantity,
        "sellingPrice":sale.sellingPrice,
        "created_on":sale.created_on
    }
    return jsonify(sale_json), 200

@sale.route("/<sale_id>", methods=["DELETE"])
@token_required
def sale_delete_by_id(current_user, sale_id):
    sale = Sale.query.filter_by(id=sale_id).first()

    if sale:
        db.session.delete(sale)
        db.session.save()
        return jsonify({"message":"Sale deleted successfully"}), 200
    else:
        return jsonify({"message":"Could not delete sale"})

@sale.route("/<sale_id>", methods=["PUT"])
@token_required
def sale_update_by_id(current_user,sale_id):
    sale = Sale.query.filter_by(id=sale_id).first()

    data = request.get_json()

    try:
        if data["quantity"]:
            sale.quantity = data["quantity"]

        if data["sellingPrice"]:
            sale.sellingPrice = data["sellingPrice"]

    except KeyError:
        return jsonify({"message": "Wrong data passed"})

    db.session.commit()
    return jsonify({"message": "Sale of product updated successfully"}), 200



# ----- SaleList -----
@sale.route("/list/<sale_list_id>",methods=["GET"])
@token_required
def sale_list_get_by_id(current_user,sale_list_id):
    sale_list = SaleList.query.filter_by(id=sale_list_id).first()

    sale_list_json = {
        "id":sale_list.id,
        "name":sale_list.name,
        "created_on":sale_list.created_on,
        "customer_name":sale_list.customer_name,
        "customer_contact":sale_list.customer_contact
    }

    return jsonify(sale_list_json)

@sale.route("/list/<sale_list_id>",methods=["DELETE"])
@token_required
def sale_list_delete_by_id(current_user,sale_list_id):
    sale_list = SaleList.query.filter_by(id=sale_list_id).first()

    if sale_list:
        db.session.delete(sale_list)
        db.session.commit()
        return jsonify({"message":"Sale list deleted successfully"})
    else:
        return jsonify({"message":"Could not delete sale list"})
