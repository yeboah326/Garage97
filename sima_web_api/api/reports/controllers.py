from flask import Flask, Blueprint, render_template, url_for
from flask_weasyprint import HTML, render_pdf

from sima_web_api.api.users.utils import token_required
from sima_web_api.api.business.controllers import business
from sima_web_api.api.product.controllers import product

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
    return  "Template retrieved!"

@report.route("/all_businesses", methods=["GET"])
def report_all_businesses():
    pdf = render_pdf(url_for('report.get_all_businesses_template'), download_filename='report_all_businesses.pdf')
    return pdf, 200
# report = business.business_get_all
# business/businessreport
# business/product/productreport

#Implement later
@report.route("/<business_id>", methods=["GET"])
def report_business_by_id(businesss_id):
    pass


@report.route("/all_products", methods=["GET"])
def report_all_products():
    pdf = render_pdf(url_for('product.product_get_all'))
    return pdf, 200