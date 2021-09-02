from flask import Flask, Blueprint, render_template, url_for
from flask_weasyprint import HTML, render_pdf

from sima_web_api.api.users.utils import token_required


report = Blueprint(
    "report",
    __name__, 
    url_prefix="/report"
)
#To Do: Implement later
# retrieve js files for all businesses to this endpoint
@report.route("/get_all_businesses", methods=["GET"])
def get_all_businesses_template():
    print("========== Retrieved template for all businesses ======")
    return  "Businesses template retrieved!"

@report.route("/all_businesses", methods=["GET"])
def report_all_businesses():
    pdf = render_pdf(url_for('report.get_all_businesses_template'), download_filename='report_all_businesses.pdf')
    return pdf, 200

#To Do: Implement later
# retrieve js files for all products to this endpoint
@report.route("/get_all_products", methods=["GET"])
def get_all_products_template():
    print("========== Retrieved template for all products ======")
    return  "Products template retrieved!"

@report.route("/all_products", methods=["GET"])
def report_all_products():
    pdf = render_pdf(url_for('report.get_all_products_template'))
    return pdf, 200