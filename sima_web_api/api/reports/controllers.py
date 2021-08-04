from flask import Flask, Blueprint, render_template, url_for
from flask_weasyprint import HTML, render_pdf

from sima_web_api.api.users.utils import token_required
from sima_web_api.api.business.controllers import business

report = Blueprint(
    "report",
    __name__, 
    url_prefix="/report"
)

@report.route("/all_businesses", methods=["GET"])
def report_all_businesses():
    pdf = render_pdf(url_for('business.business_get_all'), download_filename='report_all_businesses.pdf')
    return pdf, 200


#Implement later
@report.route("/<business_id>", methods=["GET"])
def report_business_by_id(businesss_id):
    pass