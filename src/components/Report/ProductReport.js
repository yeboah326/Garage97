import React from "react";
import SummaryCard from "./SummaryCard";
import { Link } from "react-router-dom";
import SecureStorage from "../../auth/secure";

const ProductReport = () => {
  const business_name = SecureStorage.get("business_name");
  const user = SecureStorage.get("User");
  const date = new Date(Date.now()).toDateString();
  return (
    <div className="report-business">
      <div className="business-report-header">
        <div className="business-report-head">
          <Link className="business-name" to="/business/overview">
            {" "}
            {business_name}
          </Link>

          <div className="business-user">{user.name}</div>
        </div>
        <div className="date-generated">Date Generated: {date}</div>
      </div>
      <div className="business-report-summary">
        <div className="business-report-summary-header">
          Product Overview (Kako Cube)
        </div>
        <div className="business-summary">
          <SummaryCard title="Total Sales Made" value="GHC 7900.21" />
          <SummaryCard title="Total Stock Purchased" value="GHC 5021.49" />
          <SummaryCard title="Profit/Loss" value="GHC 2878.72" />
          <SummaryCard title="Total Products Bought" value="760" />
          <SummaryCard title="Total Products Sold" value="654" />
          <SummaryCard title="Total Products Sold" value="106" />
        </div>
      </div>
    </div>
  );
};

export default ProductReport;
