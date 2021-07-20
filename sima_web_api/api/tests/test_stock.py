import json


def test_stock_hello(app, client):
    response = client.get("/stock/hello")
    assert response.status_code == 200


def test_stock_get_all_by_stock_list_id(app, client):
    pass


def test_stock_get_by_id(app, client):
    pass


def test_stock_delete_by_id(app, client):
    pass


def test_stock_update_by_id(app, client):
    pass


def test_stock_list_get_by_id(app, client):
    pass


def test_stock_list_delete_by_id(app, client):
    pass
