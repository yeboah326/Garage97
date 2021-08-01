from sima_web_api.api.sale.models import Sale, SaleList
from sima_web_api.api.stock.models import Stock, StockList
from sima_web_api.api.product.models import Product
from sima_web_api.api.business.models import Business
from sima_web_api.api.users.models import User


def drop_all_table_data():
    Sale.query.delete()
    Stock.query.delete()
    SaleList.query.delete()
    StockList.query.delete()
    Product.query.delete()
    Business.query.delete()
    User.query.delete()


def login_user(app, client):
    drop_all_table_data()

    # Create a new user
    client.post(
        "/users",
        json={
            "name": "John Doe",
            "password": "123456",
            "date_of_birth": "2000-01-01",
            "email": "jodoe@gmail.com",
        },
    )

    # Send request to login user
    response = client.post(
        "/users/login", json={"email": "jodoe@gmail.com", "password": "123456"}
    )

    return response.json


def create_new_business(client, token):
    # Create new business
    client.post(
        "/business",
        json={"name": "Kako Inc"},
        headers={"Authorization": f"Bearer {token}"},
    )


def create_business_products(client, token, busisness_id):
    # Create three new products in a business
    response = None

    for num in range(2):
        response = client.post(
            f"/business/{busisness_id}/product",
            json={"name": f"Product {num}", "business_id": busisness_id},
            headers={"Authorization": f"Bearer {token}"},
        )

    return response


def create_business_salelist(client, token, product_id):
    # Create three new sales in a sale_list for a product
    respone = None

    # Data to create the sale and sale_list
    data = {
        "business_id": Product.query.filter_by(id=product_id).first().business_id,
        "customer_details": {"customer_name": "None", "customer_contact": "0543217725"},
        "sale_list": [
            {"quantity": 5, "selling_price": 15.0, "product_id": product_id},
            {"quantity": 6, "selling_price": 16.0, "product_id": product_id},
            {"quantity": 7, "selling_price": 17.0, "product_id": product_id},
        ],
    }

    # Request to create the sales and sale_list
    response = client.post(
        "sale/list",
        json=data,
        headers={"Authorization": f"Bearer {token}"},
    )

    return response

def create_business_stocklist(client, token, product_id):
    # Create three new stock and a stock_list for the product
    response = None

    # Data to create the stock and stock_list
    data = {
        "business_id": Product.query.filter_by(id=product_id).first().business_id,
        "stock_list": [
            {"quantity": 5, "buying_price": 15.0, "product_id": product_id},
            {"quantity": 5, "buying_price": 15.0, "product_id": product_id},
            {"quantity": 5, "buying_price": 15.0, "product_id": product_id},
            {"quantity": 5, "buying_price": 15.0, "product_id": product_id},
        ],
    }

    # Request to create the stock and stock_list
    response = client.post(
        "stock/list",
        json=data,
        headers={"Authorization": f"Bearer {token}"},
    )

    return response

