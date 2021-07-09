from flask import Blueprint, jsonify, request
from sima_web_api.api.business.utils import token_required
from sima_web_api.api.business.models import Business
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
    businesses_json = [{"name":business.name} for business in businesses]
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
    pass

@business.route("/<business_id>",methods=["DELETE"])
@token_required
def business_delete_by_id(current_user,business_id):
    business = Business.query.filter_by(user_id=current_user.id,id=business_id).first()
    if business:
        db.session.delete(business)
        db.session.commit()
        return jsonify({"message":"Business deleted"}), 200
    return jsonify({"message":"Business not found"}), 404
    