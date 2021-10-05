import React from "react";
import Revenue from "./Revenue";

const TotalRevenue = () => {
  return (
    <div className="t-revenue">
      <p className="actual-revenue">
        <Revenue
          revenue="21,753"
          date="This month"
          percentage="12.8%"
          increase="percent-increase"
        />
        <Revenue
          revenue="12,824"
          date="Last month"
          percentage="4.3%"
          increase="percent-decrease"
        />
      </p>
    </div>
  );
};

export default TotalRevenue;
