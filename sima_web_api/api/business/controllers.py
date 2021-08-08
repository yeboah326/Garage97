from flask import Blueprint, jsonify, request
from sima_web_api.api.users.utils import token_required
from sima_web_api.api.business.models import Business
from sima_web_api.api.business.utils import compute_total_buying_price
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
    try:
        return jsonify({"message": "Business Blueprint Created successfully"}), 200
    except:
        return jsonify({"message": "Could not process request"}), 400

@business.route("", methods=["POST"])
@token_required
def business_create_new(current_user):
    """
    business_creat_new(current_user)

    HTTP Methods - POST

    To send data
    """
    try:
        data = request.get_json()

        new_business = Business(name=data["name"],description=data["description"], user_id=current_user.id)

        db.session.add(new_business)
        db.session.commit()
        return jsonify({"message": "New business successfully created"}), 201
    except:
        return jsonify({"message": "Could not process request"}), 400


@business.route("", methods=["GET"])
@token_required
def business_get_all(current_user):
    """
    business_get_all(current_user)

    HTTP Methods - GET

    To test if the module is working
    """
    try:
        businesses = Business.query.filter_by(user_id=current_user.id)
        businesses_json = [
            {"id": business.id, "name": business.name,"description":business.description} for business in businesses
        ]
        return jsonify(businesses_json), 200
    except:
        return jsonify({"message": "Could not process thee request"}), 400


@business.route("/<business_id>", methods=["GET"])
@token_required
def business_get_by_id(current_user, business_id):
    """
    business_get_by_id(current_user, business_id)

    HTTP Methods - GET

    To test if the module is working
    """
    try:
        business = Business.query.filter_by(user_id=current_user.id, id=business_id).first()
        business_json = {"name": business.name,"description":business.description}
        return jsonify(business_json), 200
    except:
        return jsonify({"message": "Could not process request"}), 400


@business.route("/<business_id>", methods=["PUT"])
@token_required
def business_update_info(current_user, business_id):
    """
    business_update_info(current_user, business_id)

    HTTP Methods - PUT

    Updates existing resources
    """
    try:
        business = Business.query.filter_by(id=business_id, user_id=current_user.id).first()

        data = request.get_json()

        try:
            if data["name"]:
                business.name = data["name"]
        except KeyError:
            pass

        db.session.commit()

        return jsonify({"message": "User info updated successfully"}), 200
    except:
        return jsonify({"message": "Could not process request"}), 400


# TODO: Implement later
@business.route("", methods=["DELETE"])
@token_required
def business_delete_all(current_user):
    """
    business_delete_all(current_user, business_id)

    HTTP Methods - DELETE

    Deletes resource
    """
    try:
        businesses = Business.query.filter_by(user_id=current_user.id).delete()
        db.session.commit()
        return jsonify({"message": "Businesses deleted successfully"}), 200
    except:
        return jsonify({"message": "Could not process request"}), 400


@business.route("/<business_id>", methods=["DELETE"])
@token_required
def business_delete_by_id(current_user, business_id):
    """
    business_delete_by_id(current_user, business_id)

    HTTP Methods - DELETE

    Deletes resource
    """
    try:
        business = Business.query.filter_by(user_id=current_user.id, id=business_id).first()
        db.session.delete(business)
        db.session.commit()
        return jsonify({"message": "Business deleted"}), 200
    except:
        return jsonify({"message": "Could not process request"}), 400


# Product related views
@business.route("/<business_id>/product", methods=["GET"])
@token_required
def business_get_all_product(current_user, business_id):
    """
    business_get_all_product(current_user, business_id)

    HTTP Methods - GET

    To test if the module is working
    """
    try:
        business_products = Product.query.filter_by(business_id=business_id)
        business_products_json = [{"product_id":product.id,"name": product.name, "description":product.description} for product in business_products]
        return jsonify(business_products_json), 200
    except:
        return jsonify({"message":"Could not process request"}), 400


@business.route("/<business_id>/product", methods=["POST"])
@token_required
def busines_create_new_product(current_user, business_id):
    """
    business_create_new_product(current_user, business_id)

    HTTP Methods - POST

    To send data
    """
    try:
        data = request.get_json()

        new_product = Product(name=data["name"],description=data["description"], business_id=business_id)

        db.session.add(new_product)
        db.session.commit()

        return jsonify({"message": "Product created successfully"}), 201
    except:
        return jsonify({"message":"Could not process request"}), 400


# Sale and SaleList
@business.route("/<business_id>/sale_list",methods=["GET"])
@token_required
def business_get_all_sale_list(current_user, business_id):
    try:
        business_sale_lists = SaleList.query.filter_by(business_id=business_id)
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
            "business": Business.query.filter_by(id=business_id).first().name,
            "business_sale_lists": business_sale_lists_json,
        }

        return jsonify(business_sale_lists_json), 200
    except:
        return jsonify({"message":"Could not process request"}), 400

@business.route("/<business_id>/sale_list",methods=["DELETE"])
@token_required
def business_delete_all_sale_list(current_User,business_id):
    try:
        SaleList.query.filter_by(business_id=business_id).delete()
        return jsonify({"message":f"All salelist from {Business.query.filter_by(id=business_id).first().name} have been deleted"}), 200
    except:
        return jsonify({"message":"Could not process request"}), 400

# Stock and StockList
@business.route("/<business_id>/stock_list",methods=["GET"])
@token_required
def business_get_all_stock_list(current_user, business_id):
    try:
        business_stock_lists = StockList.query.filter_by(business_id=business_id)

        business_stock_lists_json = [
            {
                "id": stock_list.id,
                "created_on": stock_list.created_on,
                "total_quantity": len(stock_list.stocks),
                "total_buying_price": str(compute_total_buying_price(stock_list.stocks)["total_buying_price"])
            }
            for stock_list in business_stock_lists
        ]

        business_sale_lists_json = {
            "business": Business.query.filter_by(id=business_id).first().name,
            "business_stock_lists": business_stock_lists_json,
        }

        return jsonify(business_sale_lists_json), 200
    except:
        return jsonify({"message":"Could not process request"}), 400

@business.route("/<business_id>/stock_list",methods=["DELETE"])
@token_required
def business_delete_all_stock_list(current_user, business_id):
    try:
        StockList.query.filter_by(business_id=business_id).delete()
        return jsonify({"message":f"All stocklist from {Business.query.filter_by(id=business_id).first().name} have been deleted"}), 200
    except:
        return jsonify({"message":"Could not process request"}), 400