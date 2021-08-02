import pytest
import os
from sima_web_api.api import app as flask_app


@pytest.fixture
def app():
    flask_app.config[
        "SQLALCHEMY_DATABASE_URI"
    ] = f"mysql+mysqlconnector://{os.getenv('MYSQL_USERNAME')}:{os.environ.get('MYSQL_PASSWORD')}@{os.environ.get('MYSQL_SERVER')}/{os.environ.get('MYSQL_DATABASE_NAME')}"
    flask_app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    yield flask_app


@pytest.fixture
def client(app):
    yield app.test_client()
