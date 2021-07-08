from flask import Blueprint, jsonify
from sima_web_api.api.business.utils import token_required

business = Blueprint(
    "business",
    __name__,
    url_prefix="/business",
)


@business.route("hello")
@token_required
def hello(current_user):
    return jsonify({"message": "Business Blueprint Created successfully"})
