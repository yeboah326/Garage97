import json
from sima_web_api.api.users.models import User
from sima_web_api.api.business.models import Business
from sima_web_api.api.product.models import Product
from sima_web_api.api.sale.models import Sale, SaleList
from sima_web_api.api.stock.models import Stock, StockList


def drop_all_table_data():
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


def test_business_hello(app, client):
    response = client.get("/business/hello")
    assert response.status_code == 200


def test_business_create_new(app, client):
    login = login_user(app, client)

    response = client.post(
        "/business",
        json={"name": "Kako Inc"},
        headers={"Authorization": f"Bearer {login['token']}"},
    )

    created_business = Business.query.filter_by(name="Kako Inc")

    assert response.status_code == 201
    assert response.json["message"] == "New business successfully created"


def test_business_get_all(app, client):
    login = login_user(app, client)

    create_new_business(client, login["token"])

    # Get all products
    response = client.get(
        "/business", headers={"Authorization": f"Bearer {login['token']}"}
    )

    current_user = User.query.filter_by(public_id=login["public_id"]).first()

    assert response.status_code == 200
    assert len(response.json) == 1


def test_business_get_by_id(app, client):
    login = login_user(app, client)

    create_new_business(client, login["token"])

    new_business = Business.query.filter_by(name="Kako Inc").first()

    response = client.get(
        f"/business/{new_business.id}",
        headers={"Authorization": f"Bearer {login['token']}"},
    )

    assert response.status_code == 200
    assert response.json == {"description": None, "name": "Kako Inc"}


def test_business_update_by_id(app, client):
    login = login_user(app, client)

    create_new_business(client, login["token"])

    new_business = Business.query.filter_by(name="Kako Inc").first()
    id = new_business.id

    # Update the business
    response = client.put(
        f"/business/{new_business.id}",
        json={"name": "Kako Inc II"},
        headers={"Authorization": f"Bearer {login['token']}"},
    )

    new_business_updated = Business.query.filter_by(id=id).first()

    assert response.status_code == 200
    assert response.json == {"message": "User info updated successfully"}
    assert new_business_updated.name == "Kako Inc II"


def test_business_delete_all(app, client):
    login = login_user(app, client)

    create_new_business(client, login["token"])

    # Delete all user businesses
    response = client.delete(
        "/business", headers={"Authorization": f"Bearer {login['token']}"}
    )

    assert response.status_code == 200
    assert response.json == {"message": "Businesses deleted successfully"}


def test_business_delete_by_id(app, client):
    login = login_user(app, client)

    create_new_business(client, login["token"])

    new_business = Business.query.filter_by(name="Kako Inc").first()
    id = new_business.id

    # Delete business by id
    response = client.delete(
        f"/business/{new_business.id}",
        json={"name": "Kako Inc II"},
        headers={"Authorization": f"Bearer {login['token']}"},
    )

    assert response.status_code == 200
    assert response.json == {"message": "Business deleted"}
    assert Business.query.filter_by(id=id).first() == None


def test_business_create_new_product(app, client):
    login = login_user(app, client)

    create_new_business(client, login["token"])

    new_business = Business.query.filter_by(name="Kako Inc").first()
    id = new_business.id

    response = client.post(
        f"/business/{id}/product",
        json={"name": "Product 1", "business_id": id},
        headers={"Authorization": f"Bearer {login['token']}"},
    )

    assert response.status_code == 201
    assert response.json == {"message": "Product created successfully"}


def test_business_get_all_product(app, client):
    login = login_user(app, client)

    create_new_business(client, login["token"])

    new_business = Business.query.filter_by(name="Kako Inc").first()
    id = new_business.id

    create_business_products(client, login["token"], id)

    response = client.get(
        f"business/{id}/product", headers={"Authorization": f"Bearer {login['token']}"}
    )

    assert response.status_code == 200
    assert len(response.json) == 2


# TODO: Add when adding sale tests
def test_business_get_all_sale_list(app, client):
    login = login_user(app, client)

    create_new_business(client, login["token"])

    new_business = Business.query.filter_by(name="Kako Inc").first()
    id = new_business.id

    create_business_products(client, login["token"], id)


# TODO: Add when adding stock tests
def test_business_get_all_stock_list(app, client):
    login = login_user(app, client)

    create_new_business(client, login["token"])

    new_business = Business.query.filter_by(name="Kako Inc").first()
    id = new_business.id

    create_business_products(client, login["token"], id)
