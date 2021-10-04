from flask import Blueprint, jsonify, request
from sima_web_api.api.users.utils import token_required
from sima_web_api.api.business.models import Business
from sima_web_api.api.business.utils import (
    compute_total_buying_price,
    compute_total_quantity_salelist,
    compute_total_selling_price,
    get_products_low_on_stock,
    get_top_selling_products,
    report_compute_sales_for_product,
    report_compute_stocks_for_product,
    next_page_items
)
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

        new_business = Business(
            name=data["name"], description=data["description"], user_id=current_user.id
        )

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
            {
                "id": business.id,
                "name": business.name,
                "description": business.description,
            }
            for business in businesses
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
        business = Business.query.filter_by(
            user_id=current_user.id, id=business_id
        ).first()
        business_json = {"name": business.name, "description": business.description}
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
        business = Business.query.filter_by(
            id=business_id, user_id=current_user.id
        ).first()

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
        business = Business.query.filter_by(
            user_id=current_user.id, id=business_id
        ).first()
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
        business_products_json = [
            {
                "product_id": product.id,
                "name": product.name,
                "description": product.description,
            }
            for product in business_products
        ]
        return jsonify(business_products_json), 200
    except:
        return jsonify({"message": "Could not process request"}), 400


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

        new_product = Product(
            name=data["name"], description=data["description"], business_id=business_id
        )

        db.session.add(new_product)
        db.session.commit()

        return jsonify({"message": "Product created successfully"}), 201
    except:
        return jsonify({"message": "Could not process request"}), 400


# Sale and SaleList
@business.route(
    "/<business_id>/sale_list",
    methods=["GET"],
    defaults={"page": 1, "items_per_page": 10},
)
@token_required
def business_get_all_sale_list(current_user, business_id, page, items_per_page):
    page = int(request.args["page"] if request.args["page"] else page)
    items_per_page = int(
        request.args["items_per_page"]
        if request.args["items_per_page"]
        else items_per_page
    )

    try:
        business_sale_lists = SaleList.query.filter_by(business_id=business_id)
        business_sale_lists_json = [
            {
                "id": sale_list.id,
                "customer_name": sale_list.customer_name,
                "customer_contact": sale_list.customer_contact,
                "total_quantity": str(
                    compute_total_quantity_salelist(sale_list)["total_quantity"]
                ),
                "total_price": str(
                    compute_total_selling_price(sale_list)["total_selling_price"]
                ),
                "created_on": sale_list.created_on,
            }
            for sale_list in business_sale_lists
        ]

        results = next_page_items(business_sale_lists_json,items_per_page,page)
        business_sale_lists_json = {
            "business": Business.query.filter_by(id=business_id).first().name,
            "business_sale_lists": results["page_items"],
            "business_sale_lists_pages": results["total_page_count"],
        }
        return jsonify(business_sale_lists_json), 200
    except:
        return jsonify({"message": "Could not process request"}), 400


@business.route("/<business_id>/sale_list", methods=["DELETE"])
@token_required
def business_delete_all_sale_list(current_User, business_id):
    try:
        SaleList.query.filter_by(business_id=business_id).delete()
        return (
            jsonify(
                {
                    "message": f"All salelist from {Business.query.filter_by(id=business_id).first().name} have been deleted"
                }
            ),
            200,
        )
    except:
        return jsonify({"message": "Could not process request"}), 400


# Stock and StockList
@business.route(
    "/<business_id>/stock_list",
    methods=["GET"],
    defaults={"page": 1, "items_per_page": 10},
)
@token_required
def business_get_all_stock_list(current_user, business_id, page, items_per_page):
    """business_get_all_stock_list - endpoint to return all business stocklists

    Args:
        current_user (db.Model): [current user logged in]
        business_id ([int]): the current business id
        page (int): the page to whose items are being returned
        items_per_page (int): the items to be returned page

    Returns:
        [type]: [description]
    """
    page = int(request.args["page"] if request.args["page"] else page)
    items_per_page = int(
        request.args["items_per_page"]
        if request.args["items_per_page"]
        else items_per_page
    )

    try:
        business_stock_lists = StockList.query.filter_by(business_id=business_id)
        business_stock_lists_json = [
            {
                "id": stock_list.id,
                "created_on": stock_list.created_on,
                "total_quantity": len(stock_list.stocks),
                "total_buying_price": str(
                    compute_total_buying_price(stock_list)["total_buying_price"]
                ),
            }
            for stock_list in business_stock_lists
        ]

        results = next_page_items(business_stock_lists_json, items_per_page, page)
        business_stock_lists_json = {
            "business": Business.query.filter_by(id=business_id).first().name,
            "business_stock_lists": results["page_items"],
            "business_sale_lists_pages": results["total_page_count"],
        }

        return jsonify(business_stock_lists_json), 200
    except:
        return jsonify({"message": "Could not process request"}), 400


@business.route("/<business_id>/stock_list", methods=["DELETE"])
@token_required
def business_delete_all_stock_list(current_user, business_id):
    try:
        StockList.query.filter_by(business_id=business_id).delete()
        return (
            jsonify(
                {
                    "message": f"All stocklist from {Business.query.filter_by(id=business_id).first().name} have been deleted"
                }
            ),
            200,
        )
    except:
        return jsonify({"message": "Could not process request"}), 400


@business.route("/<business_id>/customers", methods=["GET"],defaults={"page": 1, "items_per_page": 10})
@token_required
def business_get_all_customers(current_user, business_id, page, items_per_page):
    try:
        page = int(request.args["page"] if request.args["page"] else page)
        items_per_page = int(
            request.args["items_per_page"]
            if request.args["items_per_page"]
            else items_per_page
        )
    
    except:
        pass

    try:
        business_salelists = SaleList.query.filter_by(business_id=business_id)
        business_customer_json = list()
        for salelist in business_salelists:
            if salelist.customer_name == "None" or salelist.customer_contact == "None":
                pass
            else:
                business_customer_json.append(
                    {
                        "salelist_id": salelist.id,
                        "customer_name": salelist.customer_name,
                        "customer_contact": salelist.customer_contact,
                    }
                )

        results = next_page_items(business_customer_json, items_per_page, page)
        business_customer_json = {
            "business": Business.query.filter_by(id=business_id).first().name,
            "business_customers": results["page_items"],
            "business_customer_total_pages": results["total_page_count"]
        }

        return jsonify(business_customer_json), 200
    except:
        return jsonify({"message": "Could not proceess request"}), 400


@business.route("<business_id>/report")
@token_required
def business_get_report(current_user, business_id):
    business_summary = {}
    business_products = Product.query.filter_by(business_id=business_id)
    business_products_details = []
    for product in business_products:
        sales = report_compute_sales_for_product(product_id=product.id)
        stock = report_compute_stocks_for_product(product_id=product.id)
        business_products_details.append(
            {
                "product_name": f"{product.name}",
                "product_sales": str(sales["total_sales"]),
                "product_stock": str(stock["total_stock"]),
                "product_profit_loss": str(sales["total_sales"] - stock["total_stock"]),
                "products_total_sold": str(sales["total_quantity"]),
                "products_total_bought": str(stock["total_quantity"]),
                "products_total_remaining": str(
                    stock["total_quantity"] - sales["total_quantity"]
                ),
            }
        )

    business_overview = {
        "total_sales_made": 0,
        "total_stock_purchased": 0,
        "total_profit_or_loss": 0,
        "total_products_sold": 0,
        "total_products_bought": 0,
        "total_products_remaining": 0,
    }

    for product in business_products_details:
        business_overview["total_sales_made"] += float(product["product_sales"])
        business_overview["total_stock_purchased"] += float(product["product_stock"])
        business_overview["total_profit_or_loss"] += float(product["product_profit_loss"])
        business_overview["total_products_sold"] += int(product["products_total_sold"])
        business_overview["total_products_bought"] += int(product["products_total_bought"])
        business_overview["total_products_remaining"] += int(product["products_total_remaining"])

    business_overview["products_overview"] = business_products_details

    return business_overview, 200

@business.route("<business_id>/dashboard_info")
@token_required
def business_get_dashboard_info(current_user, business_id):
    #  TODO: Return {Top Customer, Top Selling Products, Products Low on Stock}
    top_selling_products = get_top_selling_products(business_id=business_id)
    products_low_on_stock = get_products_low_on_stock(business_id=business_id)
    print(top_selling_products)
    print(products_low_on_stock)
    dashboard_info = {
        "top_selling_products": top_selling_products,
        "product_low_on_stock": products_low_on_stock
    }

    return dashboard_info, 200