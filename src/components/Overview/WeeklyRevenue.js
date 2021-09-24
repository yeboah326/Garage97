import React from "react";
import Revenue from "./Revenue";

const WeeklyRevenue = () => {
  return (
    <div className="t-revenue">
      <p className="revenue-head">Weekly Revenue Comparison</p>
      <p className="actual-revenue">
        <Revenue revenue="5,032" date="This Week" />
        <Revenue revenue="3,890" date="Last Week" />
      </p>
    </div>
  );
};

export default WeeklyRevenue;
