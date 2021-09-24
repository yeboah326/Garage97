import React from "react";
import TotalRevenue from "./TotalRevenue";
import LowStock from "./LowStock";
import TopSelling from "./TopSelling";
import CustomerTable from "./customerTable";

const OverviewPage = () => {
  return (
    <div className="overview-overview">
      <div className="black_white">
        <TotalRevenue />
        <LowStock />
      </div>
      <div className="black_white">
        <TopSelling />
        <CustomerTable />
      </div>
    </div>
  );
};

export default OverviewPage;
