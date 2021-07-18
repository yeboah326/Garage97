import pytest

from sima_web_api.api import app as flask_app


@pytest.fixture
def app():
    yield flask_app


@pytest.fixture
def client(app):
    yield app.test_client()
