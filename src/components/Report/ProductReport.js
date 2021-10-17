import React,{useState,useEffect} from "react";
import SummaryCard from "./SummaryCard";
import { Link } from "react-router-dom";
import SecureStorage from "../../auth/secure";
import { logout } from "../../auth";

const ProductReport = () => {
  const business_name = SecureStorage.get("business_name");
  const user = SecureStorage.get("User");
  const product_id = SecureStorage.get("product_id");
  const token = JSON.parse(localStorage.getItem("REACT_TOKEN_AUTH_KEY"));

  const [product_report_summary, setProductReportSummary] = useState({
     "product_name": "",
        "product_sales": "",
        "product_stock": "",
        "product_profit_loss": "",
        "product_total_sold": "",
        "product_total_bought": "",
        "product_total_remaining": ""
   });
  const date = new Date(Date.now()).toDateString();

    const fetchProductReport = async () => {
      const response = await fetch(
        `https://sima-backend.herokuapp.com/product/${product_id}/report`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const res = await response.json();
      if (response.status === 401) {
        alert("Session Expired");
        logout();
      } else if (response.status === 200) {
        setProductReportSummary(res);
      } else {
        alert("Could not fetch Report");
      }
    };

    useEffect(() => {
      fetchProductReport();
    }, []);
  return (
    <div className="main-report">
      <div className="report-business">
        <div className="business-report-header">
          <div className="business-report-head">
            <Link className="business-name" to="/business/report">
              {" "}
              {business_name}
            </Link>

            <div className="business-user">{user.name}</div>
          </div>
          <div className="date-generated">Date Generated: {date}</div>
        </div>
        <div className="business-report-summary">
          <div className="business-report-summary-header">
            Product Overview ({product_report_summary.product_name})
          </div>
          <div className="business-summary">
            <SummaryCard title="Total Sales Made" value={product_report_summary.product_total_sold} />
            <SummaryCard title="Total Stock Purchased" value={product_report_summary.product_total_bought} />
            <SummaryCard title="Profit/Loss" value={product_report_summary.product_profit_loss} />
            <SummaryCard title="Total Products Bought" value={product_report_summary.product_total_bought} />
            <SummaryCard title="Total Products Sold" value={product_report_summary.product_total_sold} />
            <SummaryCard title="Products Remaining" value={product_report_summary.product_total_remaining} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductReport;
