from flask import Blueprint, jsonify, request
from sima_web_api.api.users.utils import token_required
from sima_web_api.api.sale.models import Sale, SaleList
from sima_web_api.api.product.models import Product
from sima_web_api.api import db
import datetime
from sima_web_api.api.business.utils import (
    compute_total_quantity_salelist,
    compute_total_selling_price,
)

sale = Blueprint(
    "sale",
    __name__,
    url_prefix="/sale",
)


@sale.route("/hello")
def hello():
    try:
        return jsonify({"message": "Sale blueprint working"}), 200
    except:
        return jsonify({"message": "Could not process requesst"}), 400


# ----- Sale -----


@sale.route("/sale_list/<sale_list_id>", methods=["GET"], defaults={"page": 1, "items_per_page": 10})
@token_required
def sales_get_all_by_sale_list_id(current_user, sale_list_id, page, items_per_page):
    """
    sales_get_all_by_sale_list_id(current_user, sale_list_id)

    HTTP Methods - GET

    For getting all the sales from the sales list id
    """
    page = int(request.args["page"] if request.args["page"] else page)
    items_per_page = int(
        request.args["items_per_page"]
        if request.args["items_per_page"]
        else items_per_page
    )
    try:
        sales_by_sale_list_id = Sale.query.filter_by(sale_list_id=sale_list_id)

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

        # Computing number of pages
        total_sales = len(sales_by_sale_list_id_json)
        num_pages = (
            (total_sales // items_per_page)
            if total_sales % items_per_page == 0
            else (total_sales // items_per_page) + 1
        )

        # Filtering for the page sales_lists
        if (total_sales - (page * items_per_page)) > 0:
            sales_by_sale_list_id_json = sales_by_sale_list_id_json[
                page * items_per_page - 1 : ((page * items_per_page) + items_per_page)
            ]
        else:
            sales_by_sale_list_id_json = sales_by_sale_list_id_json[page * items_per_page :]

        return jsonify(sales_by_sale_list_id_json), 200
    except:
        return jsonify({"mesage": "Could not process request"}), 400


@sale.route("/<sale_id>", methods=["GET"])
@token_required
def sale_get_by_id(current_user, sale_id):
    """
    sale_get_by_id(current_user, sale_id)

    HTTP Methods - GET

    For getting the sales by the user id
    """
    try:
        sale = Sale.query.filter_by(id=sale_id).first()

        sale_json = {
            "id": sale.id,
            "product": Product.query.filter_by(id=sale.product_id).first().name,
            "quantity": sale.quantity,
            "selling_price": str(sale.selling_price),
            "created_on": sale.created_on,
        }
        return jsonify(sale_json), 200
    except:
        return jsonify({"mesage": "Could not process request"}), 400


@sale.route("/<sale_id>", methods=["DELETE"])
@token_required
def sale_delete_by_id(current_user, sale_id):
    """
    sale_delete_by_id(current_user, sale_id)

    HTTP Methods - DELETE

    For deleting the sales made by id
    """
    try:
        sale = Sale.query.filter_by(id=sale_id).first()
        db.session.delete(sale)
        db.session.commit()
        return jsonify({"message": "Sale deleted successfully"}), 200
    except:
        return jsonify({"mesage": "Could not process request"}), 400


@sale.route("/<sale_id>", methods=["PUT"])
@token_required
def sale_update_by_id(current_user, sale_id):
    """
    sale_update_by_id(current_user, sale_id)

    HTTP Methods - PUT

    For updating the sales made by id
    """
    try:
        sale = Sale.query.filter_by(id=sale_id).first()
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
    except:
        return jsonify({"message": "Could not process request"}), 400


@sale.route("/add/<sale_list_id>", methods=["POST"])
@token_required
def sale_add_new_sale_to_salelist(current_user, sale_list_id):
    """
    stock_add_new_stock_to_stocklist(current_user,stock_list_id)

    HTTP Methods - POST

    Adds new stocks to an already existing stock_list
    """
    # try:
    data = request.get_json()

    sale_list = SaleList.query.filter_by(id=sale_list_id)

    if data["sales"]:
        for sale in data["sales"]:
            new_sale = Sale(
                quantity=sale["quantity"],
                selling_price=sale["selling_price"],
                created_on=str(datetime.date.today()),
                product_id=sale["product_id"],
                sale_list_id=sale_list_id,
            )
            db.session.add(new_sale)
            db.session.commit()
        return jsonify({"message": "New sale added successfully"}), 201
    else:
        return jsonify({"message": "No data passed"}), 400
    # except:
    return jsonify({"message": "Could not process request"}), 400


# ----- SaleList -----
@sale.route("/list", methods=["POST"])
@token_required
def sale_list_create_new(current_user):
    """
    sale_list_create_new(current_user)

    HTTP Methods - POST

    For creating a new a new sale list
    """
    try:
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
    except:
        return jsonify({"message": "Could not proceeess request"}), 400


@sale.route("/list/<sale_list_id>", methods=["GET"])
@token_required
def sale_list_get_by_id(current_user, sale_list_id):
    """
    sale_list_get_by_id(current_user, sale_list_id)

    HTTP Methods - GET

    For getting the sale listusing the customers id
    """

    try:
        sale_list = SaleList.query.filter_by(id=sale_list_id).first()

        sale_list_json = {
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
        return jsonify(sale_list_json), 200
    except:
        return jsonify({"message": "Could not process request"}), 400


@sale.route("/list/<sale_list_id>", methods=["DELETE"])
@token_required
def sale_list_delete_by_id(current_user, sale_list_id):
    """
    sale_list_delete_by_id(current_user, sale_list_id)

    HTTP Methods - DELETE

    For deleting the sale list
    """
    try:
        sale_list = SaleList.query.filter_by(id=sale_list_id).first()
        db.session.delete(sale_list)
        db.session.commit()
        return jsonify({"message": "Sale list deleted successfully"}), 200
    except:
        return jsonify({"message": "Could not process request"}), 400


@sale.route("/list/<sale_list_id>", methods=["PUT"])
@token_required
def sale_list_update_by_id(current_user, sale_list_id):
    """
    sale_list_update_by_id(current_user,sale_list_id)

    HTTP Methods - PUT

    For updating the sale list
    """
    try:
        sale_list = SaleList.query.filter_by(id=sale_list_id).first()
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
    except:
        return jsonify({"message": "Could not process request"}), 400
