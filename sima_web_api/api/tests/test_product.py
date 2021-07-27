import json
from sima_web_api.api.users.models import User
from sima_web_api.api.business.models import Business
from sima_web_api.api.product.models import Product
from sima_web_api.api.sale.models import Sale, SaleList
from sima_web_api.api.stock.models import Stock, StockList


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


def create_product_salelist(client, token, product_id):
    # Create three new sales for a product
    respone = None

    data = {
        "business_id": Product.query.filter_by(id=product_id).first().business_id,
        "customer_details": {"customer_name": "None", "customer_contact": "0543217725"},
        "sale_list": [
            {"quantity": 5, "selling_price": 15.0, "product_id": product_id},
            {"quantity": 6, "selling_price": 16.0, "product_id": product_id},
            {"quantity": 7, "selling_price": 17.0, "product_id": product_id},
        ],
    }

    response = client.post(
        "sale/list",
        json=data,
        headers={"Authorization": f"Bearer {token}"},
    )

    return response


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
    assert response.json == {"name": "Product 1"}


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

def test_product_create_new_sale_list(app, client):
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

    # Send request to create new salelist
    response = create_product_salelist(client,login["token"],product_id)

    assert response.status_code == 201
    assert response.json == {"message":"Sale created successfully"}
    assert SaleList.query.filter_by(business_id=business_id)

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
    create_product_salelist(client, login["token"], product_id)

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


def test_product_get_all_sale_list(app, client):
    pass


def test_prodcuct_create_new_stock_list(app, client):
    pass


def test_product_get_all_stock_list(app, client):
    pass


def test_product_delete_all_stock_list(app, client):
    pass
