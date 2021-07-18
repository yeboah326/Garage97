import json

def test_product_hello(app,client):
    response = client.get("/product/hello")
    assert response.status_code == 200

def test_product_get_by_id(app,client):
    pass

def test_product_delete_by_id(app,client):
    pass

def test_product_update_by_id(app,client):
    pass

def test_product_create_new_sale_list(app,client):
    pass

def test_product_get_all_sale_list(app,client):
    pass

def test_prodcuct_create_new_stock_list(app,client):
    pass

def test_product_get_all_stock_list(app,client):
    pass

def test_product_delete_all_stock_list(app,client):
    pass