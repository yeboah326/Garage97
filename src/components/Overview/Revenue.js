import React from "react";

const Revenue = ({ revenue, date, percentage, increase }) => {
  return (
    <div className="revenue">
      <span>{date}'s revenue</span>
      <div className="revenue-amount">
       <div className="currency">GHC</div>
            {revenue}
      </div>
      <div className={increase}>{percentage}
      <span>percental change on sales</span>
      </div>
    </div>
  );
};

export default Revenue;
