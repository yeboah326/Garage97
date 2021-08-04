from flask import Flask, Blueprint, render_template, url_for
from flask_weasyprint import HTML, render_pdf

from sima_web_api.api.users.utils import token_required
from sima_web_api.api.business.controllers import business_get_all

report_business = Blueprint(
    "report_business",
    __name__, 
    url_prefix="/report_business"
)

@report_business.route("", methods=["GET"])
def report_all_businesses():
    pdf = render_pdf(url_for('business_get_all'), download_filename='report_all_businesses.pdf')
    return pdf


#Implement later
@report_business.route("/<business_id>", methods=["GET"])
def report_business_by_id(businesss_id):
    pass