import json

def test_user_hello(app, client):
    response = client.get("/users/hello")
    assert response.status_code == 200

def test_user_login(app,client):
    pass

def test_user_get_all(app,client):
    response = client.get("/users")
    assert response.status_code == 200

def test_user_get_by_id(app,client):
    pass

def test_user_create_new(app,client):
    pass

def test_user_update_info(app,client):
    pass

def test_user_delete_all(app,client):
    pass

def test_user_delete_by_id(app,client):
    pass