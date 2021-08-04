from flask import Flask, Blueprint, render_template, url_for
from sima_web_api.api.users.utils import token_required


report = Blueprint(
    "report",
    __name__, 
    url_prefix="/report"
)

@report.route('/')
def report_all_businesses():
    pass