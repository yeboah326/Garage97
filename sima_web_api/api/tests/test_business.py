import json


def test_business_hello(app, client):
    response = client.get("/business/hello")
    assert response.status_code == 200


def test_business_create_new(app, client):
    pass


def test_business_get_all(app, client):
    pass


def test_business_get_by_id(app, client):
    pass


def test_business_update_by_id(app, client):
    pass


def test_business_delete_all(app, client):
    pass


def test_business_delete_by_id(app, client):
    pass


def test_business_get_all_products(app, client):
    pass


def test_business_create_new_product(app, client):
    pass
