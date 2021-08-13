import json
import datetime
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
    drop_all_table_data,
    login_user,
)


def test_product_hello(app, client):
    response = client.get("/product/hello")
    assert response.status_code == 200


def test_product_get_by_id(app, client):
    # Login user
    login = login_user(app, client)

    # Create a new business
    create_new_business(client, login["token"])

    # Retrive created business
    new_business = Business.query.filter_by(name="Kako Inc").first()
    business_id = new_business.id

    # Create products for the business
    create_business_products(client, login["token"], business_id)

    # Retrive created product
    new_product = Product.query.filter_by(name="Product 1").first()
    product_id = new_product.id

    # Send request to get product by id
    response = client.get(
        f"/product/{product_id}", headers={"Authorization": f"Bearer {login['token']}"}
    )

    # Assertions
    assert response.status_code == 200
    assert response.json == {
        "description": "Product description 1",
        "name": "Product 1",
    }


def test_product_delete_by_id(app, client):
    # Login user
    login = login_user(app, client)

    # Create a new business
    create_new_business(client, login["token"])

    # Retrive created business
    new_business = Business.query.filter_by(name="Kako Inc").first()
    business_id = new_business.id

    # Create products for the business
    create_business_products(client, login["token"], business_id)

    # Retrive created product
    new_product = Product.query.filter_by(name="Product 1").first()
    product_id = new_product.id

    # Send request to delete product by id
    response = client.delete(
        f"/product/{product_id}", headers={"Authorization": f"Bearer {login['token']}"}
    )

    # Assertions
    assert response.status_code == 200
    assert response.json == {"message": "Product deleted successfully"}


def test_product_update_by_id(app, client):
    # Login user
    login = login_user(app, client)

    # Create a new business
    create_new_business(client, login["token"])

    # Retrive created business
    new_business = Business.query.filter_by(name="Kako Inc").first()
    business_id = new_business.id

    # Create products for the business
    create_business_products(client, login["token"], business_id)

    # Retrive created product
    new_product = Product.query.filter_by(name="Product 1").first()
    product_id = new_product.id

    # New value to update existing entry
    new_product_name = "Product 400"

    # Send request to update product by id
    response = client.put(
        f"/product/{product_id}",
        json={"name": new_product_name},
        headers={"Authorization": f"Bearer {login['token']}"},
    )

    # Assertions
    assert response.status_code == 200
    assert response.json == {"message": "Product info updated successfully"}
    assert Product.query.filter_by(id=product_id).first().name == "Product 400"


def test_product_get_all_sale(app, client):
    # Login user
    login = login_user(app, client)

    # Create a new business
    create_new_business(client, login["token"])

    # Retrive created business
    new_business = Business.query.filter_by(name="Kako Inc").first()
    business_id = new_business.id

    # Create products for the business
    create_business_products(client, login["token"], business_id)

    # Retrive created product
    new_product = Product.query.filter_by(name="Product 1").first()
    product_id = new_product.id

    # Create sales and a sale list for the created product
    create_business_salelist(client, login["token"], product_id)

    # Send request to get all sales related to a business
    response = client.get(
        f"product/{product_id}/sale",
        headers={"Authorization": f"Bearer {login['token']}"},
    )

    # Assertions
    assert response.status_code == 200
    assert len(response.json["product_sales"]) == 3
    assert response.json["product_sales"][0]["quantity"] == 5
    assert response.json["product_sales"][0]["selling_price"] == "15.00"


def test_product_get_all_stock(app, client):
    # Login user
    login = login_user(app, client)

    # Create a new business
    create_new_business(client, login["token"])

    # Retrive created business
    new_business = Business.query.filter_by(name="Kako Inc").first()
    business_id = new_business.id

    # Create products for the business
    create_business_products(client, login["token"], business_id)

    # Retrive created product
    new_product = Product.query.filter_by(name="Product 1").first()
    product_id = new_product.id

    # Create stocks and a stock list for the created product
    create_business_stocklist(client, login["token"], product_id)

    # Send request to get all sales related to a business
    response = client.get(
        f"product/{product_id}/stock",
        headers={"Authorization": f"Bearer {login['token']}"},
    )

    # Assertions
    assert response.status_code == 200
    assert len(response.json["product_stocks"]) == 4
    assert response.json["product_stocks"][0]["quantity"] == 5
    assert response.json["product_stocks"][0]["buying_price"] == "15.00"


def test_product_delete_all_sale(app, client):
    # Login user
    login = login_user(app, client)

    # Create a new business
    create_new_business(client, login["token"])

    # Retrive created business
    new_business = Business.query.filter_by(name="Kako Inc").first()
    business_id = new_business.id

    # Create products for the business
    create_business_products(client, login["token"], business_id)

    # Retrive created product
    new_product = Product.query.filter_by(name="Product 1").first()
    product_id = new_product.id

    # Create stocks and a stock list for the created product
    create_business_salelist(client, login["token"], product_id)

    response = client.delete(
        f"product/{product_id}/sale",
        headers={"Authorization": f"Bearer {login['token']}"},
    )

    assert response.status_code == 200
    assert response.json == {"message": "Sales deleted successfully"}
