import json
from sima_web_api.api.users.models import User
from sima_web_api.api.business.models import Business
from sima_web_api.api.product.models import Product
from sima_web_api.api.sale.models import Sale, SaleList
from sima_web_api.api.stock.models import Stock, StockList
from sima_web_api.api.tests.test_utils import (
    create_business_products,
    create_new_business,
    create_business_salelist,
    create_business_stocklist,
    login_user,
)


def test_stock_hello(app, client):
    response = client.get("/stock/hello")
    assert response.status_code == 200
    assert response.json == {"message": "Stock blueprint working"}


def test_stock_get_all_by_stock_list_id(app, client):
    # Login the user
    login = login_user(app, client)

    # Create a new buiness
    create_new_business(client, login["token"])

    # Retrieve the new business created
    new_business = Business.query.filter_by(name="Kako Inc").first()
    business_id = new_business.id

    # Create products for business
    create_business_products(client, login["token"], business_id)

    # Retrive created product
    new_product = Product.query.filter_by(name="Product 1").first()
    product_id = new_product.id

    # Create business sale_list
    create_business_stocklist(client, login["token"], product_id)

    # Retrieve salelist id for created salelist
    stocklist_id = StockList.query.filter_by(business_id=business_id).first().id

    response = client.get(
        f"stock/stock_list/{stocklist_id}",
        headers={"Authorization": f"Bearer {login['token']}"},
    )

    assert response.status_code == 200
    assert len(response.json) == 4


def test_stock_get_by_id(app, client):
    # Login the user
    login = login_user(app, client)

    # Create a new buiness
    create_new_business(client, login["token"])

    # Retrieve the new business created
    new_business = Business.query.filter_by(name="Kako Inc").first()
    business_id = new_business.id

    # Create products for business
    create_business_products(client, login["token"], business_id)

    # Retrive created product
    new_product = Product.query.filter_by(name="Product 1").first()
    product_id = new_product.id

    # Create business sale_list
    create_business_stocklist(client, login["token"], product_id)

    # Retrieve salelist id for created salelist
    stocklist_id = StockList.query.filter_by(business_id=business_id).first().id
    stock_id = Stock.query.filter_by(stock_list_id=stocklist_id).first().id

    response = client.get(
        f"stock/{stock_id}",
        headers={"Authorization": f"Bearer {login['token']}"},
    )

    assert response.status_code == 200
    assert len(response.json) == 5
    assert "buying_price" in response.json


def test_stock_delete_by_id(app, client):
    # Login the user
    login = login_user(app, client)

    # Create a new buiness
    create_new_business(client, login["token"])

    # Retrieve the new business created
    new_business = Business.query.filter_by(name="Kako Inc").first()
    business_id = new_business.id

    # Create products for business
    create_business_products(client, login["token"], business_id)

    # Retrive created product
    new_product = Product.query.filter_by(name="Product 1").first()
    product_id = new_product.id

    # Create business sale_list
    create_business_stocklist(client, login["token"], product_id)

    # Retrieve salelist id for created salelist
    stocklist_id = StockList.query.filter_by(business_id=business_id).first().id
    stock_id = Stock.query.filter_by(stock_list_id=stocklist_id).first().id

    response = client.delete(
        f"stock/{stock_id}",
        headers={"Authorization": f"Bearer {login['token']}"},
    )
    assert response.json == {"message": "Stock deleted successfully"}
    assert response.status_code == 200


def test_stock_update_by_id(app, client):
    # Login the user
    login = login_user(app, client)

    # Create a new buiness
    create_new_business(client, login["token"])

    # Retrieve the new business created
    new_business = Business.query.filter_by(name="Kako Inc").first()
    business_id = new_business.id

    # Create products for business
    create_business_products(client, login["token"], business_id)

    # Retrive created product
    new_product = Product.query.filter_by(name="Product 1").first()
    product_id = new_product.id

    # Create business sale_list
    create_business_stocklist(client, login["token"], product_id)

    # Retrieve salelist id for created salelist
    stocklist_id = StockList.query.filter_by(business_id=business_id).first().id
    stock_id = Stock.query.filter_by(stock_list_id=stocklist_id).first().id

    response = client.put(
        f"stock/{stock_id}",
        headers={"Authorization": f"Bearer {login['token']}"},
        json={"quantity": "7"},
    )

    assert response.status_code == 200
    assert response.json == {"message": "Stock updated successfully"}


def test_stock_list_create_new(app, client):
    # Login the user
    login = login_user(app, client)

    # Create a new buiness
    create_new_business(client, login["token"])

    # Retrieve the new business created
    new_business = Business.query.filter_by(name="Kako Inc").first()
    business_id = new_business.id

    # Create products for business
    create_business_products(client, login["token"], business_id)

    # Retrive created product
    new_product = Product.query.filter_by(name="Product 1").first()
    product_id = new_product.id

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
        headers={"Authorization": f"Bearer {login['token']}"},
    )

    assert response.status_code == 201
    assert response.json == {"message": "Stocks created successfully"}


def test_stock_list_get_by_id(app, client):
    # Login the user
    login = login_user(app, client)

    # Create a new buiness
    create_new_business(client, login["token"])

    # Retrieve the new business created
    new_business = Business.query.filter_by(name="Kako Inc").first()
    business_id = new_business.id
    # Create products for business
    create_business_products(client, login["token"], business_id)

    # Retrive created product
    new_product = Product.query.filter_by(name="Product 1").first()
    product_id = new_product.id

    # Create business sale_list
    create_business_stocklist(client, login["token"], product_id)

    # Retrieve salelist id for created salelist
    stocklist_id = StockList.query.filter_by(business_id=business_id).first().id

    response = client.get(
        f"stock/list/{stocklist_id}",
        headers={"Authorization": f"Bearer {login['token']}"},
    )

    assert response.status_code == 200
    assert "total_buying_price" in response.json
    assert len(response.json) == 4


def test_stock_list_delete_by_id(app, client):
    # Login the user
    login = login_user(app, client)

    # Create a new buiness
    create_new_business(client, login["token"])

    # Retrieve the new business created
    new_business = Business.query.filter_by(name="Kako Inc").first()
    business_id = new_business.id
    # Create products for business
    create_business_products(client, login["token"], business_id)

    # Retrive created product
    new_product = Product.query.filter_by(name="Product 1").first()
    product_id = new_product.id

    # Create business sale_list
    create_business_stocklist(client, login["token"], product_id)

    # Retrieve salelist id for created salelist
    stocklist_id = StockList.query.filter_by(business_id=business_id).first().id

    response = client.delete(
        f"stock/list/{stocklist_id}",
        headers={"Authorization": f"Bearer {login['token']}"},
    )

    assert response.status_code == 200
    assert response.json == {"message": "Stock list deleted successfully"}


def test_stock_list_update_by_id(app, client):
    # Login the user
    login = login_user(app, client)

    # Create a new buiness
    create_new_business(client, login["token"])

    # Retrieve the new business created
    new_business = Business.query.filter_by(name="Kako Inc").first()
    business_id = new_business.id
    # Create products for business
    create_business_products(client, login["token"], business_id)

    # Retrive created product
    new_product = Product.query.filter_by(name="Product 1").first()
    product_id = new_product.id

    # Create business sale_list
    create_business_stocklist(client, login["token"], product_id)

    # Retrieve salelist id for created salelist
    stocklist_id = StockList.query.filter_by(business_id=business_id).first().id

    response = client.put(
        f"stock/list/{stocklist_id}",
        headers={"Authorization": f"Bearer {login['token']}"},
        json={"customer_name": "Ama"},
    )

    assert response.status_code == 200
    assert response.json == {"message": "Sale list updated sucessfully"}
