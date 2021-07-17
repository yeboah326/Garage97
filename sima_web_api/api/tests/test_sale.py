import json

def test_sale_hello(app,client):
    response = client.get("/sale/hello")
    assert response.status_code == 200

def test_sale_get_all_by_sale_list_id(app,client):
    pass

def test_sale_get_by_id(app,client):
    pass

def test_sale_delete_by_id(app,client):
    pass

def test_sale_update_by_id(app,client):
    pass

def test_sale_list_get_by_id(app,client):
    pass

def test_sale_list_delete_by_id(app,client):
    pass

