from flask import Blueprint, jsonify, request
from sima_web_api.api.users.utils import token_required
from sima_web_api.api.sale.models import Sale, SaleList
from sima_web_api.api.product.models import Product
from sima_web_api.api import db
import datetime

sale = Blueprint(
    "sale",
    __name__,
    url_prefix="/sale",
)


@sale.route("/hello")
def hello():
    return jsonify({"message": "Sale blueprint working"}), 200


# ----- Sale -----

@sale.route("/sale_list/<sale_list_id>", methods=["GET"])
@token_required
def sales_get_all_by_sale_list_id(current_user, sale_list_id):
    """
    sales_get_all_by_sale_list_id(current_user, sale_list_id)

    HTTP Methods - GET

    For getting all the sales from the sales list id
    """

    sales_by_sale_list_id = Sale.query.filter_by(sale_list_id=sale_list_id)

    if sales_by_sale_list_id:
        sales_by_sale_list_id_json = [
            {
                "id": sale.id,
                "product": Product.query.filter_by(id=sale.product_id).first().name,
                "selling_price": str(sale.selling_price),
                "quantity": sale.quantity,
                "created_on": sale.created_on,
            }
            for sale in sales_by_sale_list_id
        ]

        return jsonify(sales_by_sale_list_id_json), 200
    return jsonify({"mesage":"Could not process request"}), 400

@sale.route("/<sale_id>", methods=["GET"])
@token_required
def sale_get_by_id(current_user, sale_id):
    """
    sale_get_by_id(current_user, sale_id)

    HTTP Methods - GET

    For getting the sales by the user id
    """
    sale = Sale.query.filter_by(id=sale_id).first()
    if sale:
        sale_json = {
            "id": sale.id,
            "product": Product.query.filter_by(id=sale.product_id).first().name,
            "quantity": sale.quantity,
            "selling_price": str(sale.selling_price),
            "created_on": sale.created_on,
        }
        return jsonify(sale_json), 200
    return jsonify({"mesage":"Could not process request"}), 400


@sale.route("/<sale_id>", methods=["DELETE"])
@token_required
def sale_delete_by_id(current_user, sale_id):
    """
    sale_delete_by_id(current_user, sale_id)

    HTTP Methods - DELETE

    For deleting the sales made by id
    """
    sale = Sale.query.filter_by(id=sale_id).first()

    if sale:
        db.session.delete(sale)
        db.session.commit()
        return jsonify({"message": "Sale deleted successfully"}), 200
    else:
        return jsonify({"mesage":"Could not process request"}), 400


@sale.route("/<sale_id>", methods=["PUT"])
@token_required
def sale_update_by_id(current_user, sale_id):
    """
    sale_update_by_id(current_user, sale_id)

    HTTP Methods - PUT

    For updating the sales made by id
    """
    sale = Sale.query.filter_by(id=sale_id).first()

    if sale:
        data = request.get_json()
        try:
            if data["quantity"]:
                sale.quantity = data["quantity"]
        except KeyError:
            pass
        try:
            if data["selling_rice"]:
                sale.selling_price = data["selling_price"]
        except KeyError:
            pass

        db.session.commit()
        return jsonify({"message": "Sale of product updated successfully"}), 200
    return jsonify({"message":"Could not process request"}), 400

# ----- SaleList -----
@sale.route("/list", methods=["POST"])
@token_required
def sale_list_create_new(current_user):
    """
    sale_list_create_new(current_user)

    HTTP Methods - POST

    For creating a new a new sale list
    """
    data = request.get_json()

    new_sale_list = SaleList(
        created_on=str(datetime.date.today()),
        customer_name=data["customer_details"]["customer_name"],
        customer_contact=data["customer_details"]["customer_contact"],
        business_id=data["business_id"],
    )
    db.session.add(new_sale_list)
    db.session.commit()

    for sale in data["sale_list"]:
        new_sale = Sale(
            quantity=sale["quantity"],
            selling_price=sale["selling_price"],
            created_on=str(datetime.date.today()),
            product_id=sale["product_id"],
            sale_list_id=new_sale_list.id,
        )
        db.session.add(new_sale)
        db.session.commit()
    return jsonify({"message": "Sale created successfully"}), 201


@sale.route("/list/<sale_list_id>", methods=["GET"])
@token_required
def sale_list_get_by_id(current_user, sale_list_id):
    """
    sale_list_get_by_id(current_user, sale_list_id)

    HTTP Methods - GET

    For getting the sale listusing the customers id
    """
    sale_list = SaleList.query.filter_by(id=sale_list_id).first()
    
    if sale_list:
        sale_list_json = {
            "id": sale_list.id,
            "name": sale_list.name,
            "created_on": sale_list.created_on,
            "customer_name": sale_list.customer_name,
            "customer_contact": sale_list.customer_contact,
        }
        return jsonify(sale_list_json), 200
    return jsonify({"message":"Could not process request"}), 400


@sale.route("/list/<sale_list_id>", methods=["DELETE"])
@token_required
def sale_list_delete_by_id(current_user, sale_list_id):
    """
    sale_list_delete_by_id(current_user, sale_list_id)

    HTTP Methods - DELETE

    For deleting the sale list
    """
    sale_list = SaleList.query.filter_by(id=sale_list_id).first()

    if sale_list:
        db.session.delete(sale_list)
        db.session.commit()
        return jsonify({"message": "Sale list deleted successfully"}), 200
    else:
        return jsonify({"message": "Could not process request"}), 400




@sale.route("/list/<sale_list_id>", methods=["PUT"])
@token_required
def sale_list_update_by_id(current_user, sale_list_id):
    """
    sale_list_update_by_id(current_user,sale_list_id)

    HTTP Methods - PUT

    For updating the sale list
    """
    
    sale_list = SaleList.query.filter_by(id=sale_list_id).first()
    if sale_list:
        data = request.get_json()

        try:
            if data["name"]:
                sale_list.name = data["name"]
        except KeyError:
            pass
        try:
            if data["customer_name"]:
                sale_list.customer_name = data["customer_name"]
        except KeyError:
            pass
        try:
            if data["customer_contact"]:
                sale_list.customer_contact = data["customer_contact"]
        except KeyError:
            pass

        db.session.commit()
        return jsonify({"message": "Sale list updated sucessfully"}), 200
    return jsonify({"message":"Could not process request"}), 400