from flask import Flask, Blueprint, render_template, url_for
from flask_weasyprint import HTML, render_pdf

from sima_web_api.api.users.utils import token_required


report_business = Blueprint(
    "report_business",
    __name__, 
    url_prefix="/report_business"
)

@report.route("", methods=["GET"])
def report_all_businesses():
    pdf = render_pdf(url_for(), download_filename='report_all_businesses.pdf')
    return pdf