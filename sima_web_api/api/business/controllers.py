from flask import Blueprint, jsonify, request
from sima_web_api.api.users.utils import token_required
from sima_web_api.api.business.models import Business
from sima_web_api.api.product.models import Product
from sima_web_api.api import db
from sima_web_api.api.sale.models import SaleList
from sima_web_api.api.stock.models import StockList


business = Blueprint(
    "business",
    __name__,
    url_prefix="/business",
)


@business.route("hello", methods=["GET"])
@token_required
def hello(current_user):
    """
    hello(current_user)

    HTTP Methods - GET

    To test if the module is working
    """
    return jsonify({"message": "Business Blueprint Created successfully"}), 200


@business.route("", methods=["POST"])
@token_required
def business_create_new(current_user):
    """
    business_creat_new(current_user)

    HTTP Methods - POST

    To send data
    """
    data = request.get_json()

    new_business = Business(name=data["name"], user_id=current_user.id)

    db.session.add(new_business)
    db.session.commit()
    return jsonify({"message": "New business successfully created"}), 201


@business.route("", methods=["GET"])
@token_required
def business_get_all(current_user):
    """
    business_get_all(current_user)

    HTTP Methods - GET

    To test if the module is working
    """
    businesses = Business.query.filter_by(user_id=current_user.id)
    businesses_json = [
        {"id": business.id, "name": business.name,"description":business.description} for business in businesses
    ]
    return jsonify(businesses_json), 200


@business.route("/<business_id>", methods=["GET"])
@token_required
def business_get_by_id(current_user, business_id):
    """
    business_get_by_id(current_user, business_id)

    HTTP Methods - GET

    To test if the module is working
    """
    business = Business.query.filter_by(user_id=current_user.id, id=business_id).first()
    if business:
        business_json = {"name": business.name,"description":business.description}
        return jsonify(business_json), 200
    return jsonify({"message": "Business not found"}), 404


@business.route("/<business_id>", methods=["PUT"])
@token_required
def business_update_info(current_user, business_id):
    """
    business_update_info(current_user, business_id)

    HTTP Methods - PUT

    Updates existing resources
    """
    business = Business.query.filter_by(id=business_id, user_id=current_user.id).first()

    data = request.get_json()

    try:
        if data["name"]:
            business.name = data["name"]
    except KeyError:
        pass

    db.session.commit()

    return jsonify({"message": "User info updated successfully"}), 200


# TODO: Implement later
@business.route("", methods=["DELETE"])
@token_required
def business_delete_all(current_user):
    """
    business_delete_all(current_user, business_id)

    HTTP Methods - DELETE

    Deletes resource
    """
    businesses = Business.query.filter_by(user_id=current_user.id).delete()
    db.session.commit()
    return jsonify({"message": "Businesses deleted successfully"}), 200


@business.route("/<business_id>", methods=["DELETE"])
@token_required
def business_delete_by_id(current_user, business_id):
    """
    business_delete_by_id(current_user, business_id)

    HTTP Methods - DELETE

    Deletes resource
    """
    business = Business.query.filter_by(user_id=current_user.id, id=business_id).first()
    if business:
        db.session.delete(business)
        db.session.commit()
        return jsonify({"message": "Business deleted"}), 200
    return jsonify({"message": "Business not found"}), 404


# Product related views
@business.route("/<business_id>/product", methods=["GET"])
@token_required
def business_get_all_product(current_user, business_id):
    """
    business_get_all_product(current_user, business_id)

    HTTP Methods - GET

    To test if the module is working
    """
    business_products = Product.query.filter_by(business_id=business_id)
    business_products_json = [{"product_id":product.id,"name": product.name} for product in business_products]
    return jsonify(business_products_json), 200


@business.route("/<business_id>/product", methods=["POST"])
@token_required
def busines_create_new_product(current_user, business_id):
    """
    business_create_new_product(current_user, business_id)

    HTTP Methods - POST

    To send data
    """
    data = request.get_json()

    new_product = Product(name=data["name"], business_id=business_id)

    db.session.add(new_product)
    db.session.commit()

    return jsonify({"message": "Product created successfully"}), 201


@business.route("/<business_id>/sale_list")
@token_required
def business_get_all_sale_list(current_user, business_id):
    business_sale_lists = SaleList.query.filter_by(business_id=business_id)

    if business_sale_lists:
        business_sale_lists_json = [
            {
                "id": sale_list.id,
                "customer_name": sale_list.customer_name,
                "customer_contact": sale_list.customer_contact,
                "created_on": sale_list.created_on,
            }
            for sale_list in business_sale_lists
        ]

        business_sale_lists_json = {
            "business": Business.query.filter_by(id=business_id),
            "business_sale_lists": business_sale_lists_json,
        }

        return jsonify(business_sale_lists_json)


@business.route("/<business_id>/stock_list")
@token_required
def business_get_all_stock_list(current_user, business_id):
    business_stock_lists = StockList.query.filter_by(businesss_id=business_id)

    if business_stock_lists:
        business_stock_lists_json = [
            {
                "id": stock_list.id,
                "customer_name": stock_list.customer_name,
                "customer_contact": stock_list.customer_contact,
                "created_on": stock_list.created_on,
            }
            for stock_list in business_stock_lists
        ]

        business_sale_lists_json = {
            "business": Business.query.filter_by(id=business_id),
            "business_stock_lists": business_stock_lists_json,
        }

        return jsonify(business_sale_lists_json)


@business.route("/list/<stock_list_id>", methods=["GET"])
@token_required
def stock_list_get_by_id(current_user, stock_list_id):
    """
    stock_list_get_by_id(current_user, stock_list_id)

    HTTP Methods - GET

    To test if the module is working
    """
    stock_list = StockList.query.filter_by(id=stock_list_id).first()

    stock_list_json = {
        "id": stock_list.id,
        "name": stock_list.name,
        "created_on": stock_list.created_on,
    }

    return jsonify(stock_list_json)


# ---Stock list---
