from flask import Blueprint, jsonify, request
from sima_web_api.api.users.utils import token_required
from sima_web_api.api.sale.models import (Sale,SaleList)
from sima_web_api.api import db

sale = Blueprint(
    "sale",
    __name__,
    url_prefix="/sale",
)

@sale.route("/hello")
def hello():
    return "Hello"



@sale.route("/<sale_id>", methods=["GET"])
@token_required
def sale_get_by_id(current_user,sale_id):
    sale = Sale.query.filter_by(id=sale_id).first()
    sale_json = {
        "quantity":sale.quantity,
        "sellingPrice":sale.sellingPrice
    }
    return jsonify(sale_json), 200


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
        pass

    db.session.commit()

    return jsonify({"message": "Sale of product updated successfully"}), 200


@sale.route("/<sale_id>", methods=["DELETE"])
@token_required
def sale_delete_by_id(current_user, sale_id):
    sale = Sale.query.filter_by(id=sale_id).first()

    if sale:
        db.session.delete(sale)
        db.session.save()
    
    return jsonify({"message":"Sale deleted successfully"}), 200