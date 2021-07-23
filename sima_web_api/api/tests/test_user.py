from sima_web_api.api import db
from sima_web_api.api.users.models import User
from sima_web_api.api.business.models import Business
from sima_web_api.api.product.models import Product
import json


def drop_all_table_data():
    Product.query.delete()
    Business.query.delete()
    User.query.delete()


def test_user_hello(app, client):
    """
    Test: GET request to check if user blueprint is working
    """
    response = client.get("/users/hello")
    assert response.status_code == 200


def test_user_login(app, client):
    """
    Test: POST request to test user login
    """

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

    # Retrieve created user
    user = User.query.filter_by(email="jodoe@gmail.com").first()

    # Login the user
    response = client.post(
        "/users/login", json={"email": "jodoe@gmail.com", "password": "123456"}
    )

    assert response.status_code == 200
    assert response.json["public_id"] == user.public_id
    assert "token" in response.json


def test_user_get_all(app, client):
    """
    Test: GET request to retrieve all users
    """

    drop_all_table_data()

    # Create two new users
    client.post(
        "/users",
        json={
            "name": "John Doe",
            "password": "123456",
            "date_of_birth": "2000-01-01",
            "email": "jodoe@gmail.com",
        },
    )

    client.post(
        "/users",
        json={
            "name": "Jane Doe",
            "password": "123456",
            "date_of_birth": "2000-01-01",
            "email": "jadoe@gmail.com",
        },
    )

    # Make request to get all users
    response = client.get("/users")

    assert response.status_code == 200
    assert len(response.json) == 2
    assert response.json[0]["name"] == "John Doe"
    assert response.json[1]["name"] == "Jane Doe"


def test_user_get_by_id(app, client):
    """
    Test: GET request to retrieve a single user by id
    """

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

    # Retrieve created user
    user = User.query.filter_by(email="jodoe@gmail.com").first()

    # Make request to get the user
    response = client.get(f"/users/{user.public_id}")

    assert response.status_code == 200
    assert response.json["public_id"] == user.public_id


def test_user_create_new(app, client):
    """
    Test: POST request for the creation of a new user
    """

    drop_all_table_data()

    # Make request to create a new user
    response = client.post(
        "/users",
        json={
            "name": "John Doe",
            "password": "123456",
            "date_of_birth": "2000-01-01",
            "email": "jdoe@gmail.com",
        },
    )

    assert response.status_code == 201
    assert response.json == {"message": "New user created"}


def test_user_update_info(app, client):
    """
    TEST: PUT request to update user info
    """

    drop_all_table_data()

    # Create a new user
    response = client.post(
        "/users",
        json={
            "name": "John Doe",
            "password": "123456",
            "date_of_birth": "2000-01-01",
            "email": "jodoe@gmail.com",
        },
    )

    # Retrieve created user with query
    user = User.query.filter_by(email="jodoe@gmail.com").first()

    # Retrieve created user from the get request
    response = client.get(f"users/{user.public_id}")

    # Compare details of user from query with user from get request
    assert response.status_code == 200
    assert response.json["email"] == "jodoe@gmail.com"

    # Update user details
    response = client.put(f"users/{user.public_id}", json={"email": "jjodoe@gmail.com"})

    # Retrieve created user from the get request
    response = client.get(f"users/{user.public_id}")

    # Compare the email field
    assert not (response.json["email"] == "jodoe@gmail.com")
    assert response.json["email"] == "jjodoe@gmail.com"


def test_user_delete_all(app, client):
    """
    Test: DELETE request to delete all users
    """

    drop_all_table_data()

    # Create two new users
    client.post(
        "/users",
        json={
            "name": "John Doe",
            "password": "123456",
            "date_of_birth": "2000-01-01",
            "email": "jodoe@gmail.com",
        },
    )

    client.post(
        "/users",
        json={
            "name": "Jane Doe",
            "password": "123456",
            "date_of_birth": "2000-01-01",
            "email": "jadoe@gmail.com",
        },
    )

    # Make request to get all users
    response = client.get("/users")

    assert response.status_code == 200
    assert len(response.json) == 2
    assert response.json[0]["name"] == "John Doe"
    assert response.json[1]["name"] == "Jane Doe"

    # Make request to get all users
    response = client.delete("/users")

    assert response.status_code == 200
    assert response.json == {"message": "All users deleted successfully"}


def test_user_delete_by_id(app, client):
    """
    Test: DELETE request to delete a single user by id
    """

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

    # Retrieve created user
    user = User.query.filter_by(email="jodoe@gmail.com").first()

    # Delete created user with a delete request
    response = client.delete(f"/users/{user.public_id}")

    assert response.status_code == 200
    assert response.json == {"message": "User deleted successfully"}
