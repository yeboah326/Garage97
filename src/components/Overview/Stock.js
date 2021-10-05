import React from "react";

const Stock = ({ name, remaining }) => {
  return (
    <div className="actual-low-stock">
      <span className="low-stock-name">{name}</span>

      <div className="NUMBERS">
        <span className="low-stock-number">{remaining} units</span>
        <progress value={remaining} max="100" className="progress"></progress>
      </div>
    </div>
  );
};

export default Stock;
