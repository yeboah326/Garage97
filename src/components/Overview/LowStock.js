import React from "react";
import Stock from "./Stock";

const LowStock = () => {
  return (
    <div className="low-stock">
      <p className="low-stock-header">Low On Stock</p>
      <p className="low-stocks">
        <Stock name="Kako Papa" remaining="20" />
        <Stock name="Kako Mini" remaining="11" />
        <Stock name="Kako Cube" remaining="9" />
        <Stock name="Kako Bingi" remaining="7" />
      </p>
    </div>
  );
};

export default LowStock;
