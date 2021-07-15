from flask import Blueprint, jsonify, request
from sima_web_api.api.business.utils import token_required
from sima_web_api.api.business.models import (Business, Product, Sale, SaleList)
from sima_web_api.api import db

business = Blueprint(
    "business",
    __name__,
    url_prefix="/business",
)


@business.route("hello", methods=["GET"])
@token_required
def hello(current_user):
    return jsonify({"message": "Business Blueprint Created successfully"}), 200

@business.route("", methods=["POST"])
@token_required
def business_create_new(current_user):
    data = request.get_json()

    new_business = Business(
        name=data['name'],
        user_id=current_user.id
    )

    db.session.add(new_business)
    db.session.commit()
    return jsonify({"message":"New business successfully created"}), 201

@business.route("/",methods=["GET"])
@token_required
def business_get_all(current_user):
    businesses = Business.query.filter_by(user_id=current_user.id)
    businesses_json = [{"id":business.id,"name":business.name} for business in businesses]
    return jsonify(businesses_json), 200

@business.route("/<business_id>",methods=["GET"])
@token_required
def business_get_by_id(current_user,business_id):
    business = Business.query.filter_by(user_id=current_user.id,id=business_id).first()
    if business:
        business_json = {"name":business.name}
        return jsonify(business_json), 200
    return jsonify({"message":"Business not found"}), 404

@business.route("/<business_id>",methods=["PUT"])
@token_required
def business_update_info(current_user,business_id):
    business = Business.query.filter_by(id=business_id,user_id=current_user.id).first()

    data = request.get_json()

    try:
        if data["name"]:
            business.name = data["name"]
    except KeyError:
        pass

    db.session.commit()

    return jsonify({"message": "User info updated successfully"}), 200

# TODO: Implement later
@business.route("/<business_id>",methods=["DELETE"])
@token_required
def business_delete_all(current_user,business_id):
    business = Business.query.all()

@business.route("/<business_id>",methods=["DELETE"])
@token_required
def business_delete_by_id(current_user,business_id):
    business = Business.query.filter_by(user_id=current_user.id,id=business_id).first()
    if business:
        db.session.delete(business)
        db.session.commit()
        return jsonify({"message":"Business deleted"}), 200
    return jsonify({"message":"Business not found"}), 404

# ------------ Business Section ------------
@business.route("/<business_id>/product",methods=["GET"])
@token_required
def product_get_all(current_user,business_id):
    business_products = Product.query.filter_by(business_id=business_id)
    business_products_json = [
        {"name":product.name}
        for product in business_products
    ]
    return jsonify(business_products_json), 200

@business.route("/<business_id>/product/<product_id>",methods=["GET"])
@token_required
def product_get_by_id(current_user,business_id,product_id):
    product = Product.query.filter_by(id=product_id).first()
    product_json = {"name":product.name}
    return jsonify(product_json), 200

@business.route("/<business_id>/product",methods=["POST"])
@token_required
def product_create_new(current_user,business_id):
    data = request.get_json()
    
    new_product = Product(
        name=data["name"],
        business_id=business_id
    )

    db.session.add(new_product)
    db.session.commit()

    return jsonify({"message":"Product created successfully"}), 201

@business.route("/<business_id>/product/<product_id>",methods=["DELETE"])
@token_required
def product_delete_by_id(current_user,product_id):
    product = Product.query.filter_by(id=product_id).first()

    if product:
        db.session.delete(product)
        db.session.save()

    return jsonify({"message":"Product deleted successfully"}), 200

@business.route("/<business_id>/product/<product_id>",methods=["PUT"])
@token_required
def product_update_by_id(current_user,business_id,product_id):
    product = Product.query.filter_by(id=product_id).first()

    data = request.get_json()

    try:
        if data["name"]:
            product.name = data["name"]
    except KeyError:
        pass

    db.session.commit()

    return jsonify({"message": "User info updated successfully"}), 200

#------------ Sales Section ----------
@business.route("/<product_id>/sale", methods=["POST"])
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

#Modify route
@business.route("/<product_id>/sale", methods=["GET"])
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


@business.route("/<business_id>/product/<product_id>/sale/<sale_id>", methods=["GET"])
@token_required
def sale_get_by_id(current_user,business_id,product_id,sale_id):
    sale = Sale.query.filter_by(id=sale_id).first()
    sale_json = {
        "quantity":sale.quantity,
        "sellingPrice":sale.sellingPrice
    }
    return jsonify(sale_json), 200


@business.route("/<business_id>/product/<product_id>/sale/<sale_id>", methods=["PUT"])
@token_required
def sale_update_by_id(current_user,business_id,product_id,sale_id):
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


@business.route("/<business_id>/product/<product_id>/sale/<sale_id>", methods=["DELETE"])
@token_required
def sale_delete_by_id(current_user, sale_id):
    sale = Sale.query.filter_by(id=sale_id).first()

    if sale:
        db.session.delete(sale)
        db.session.save()
    
    return jsonify({"message":"Sale deleted successfully"}), 200