import React from "react";
import SVGclose from "../../Assets/icons/cancel"; // eslint-disable-next-line
import { useState } from "react";
import DeleteSaleList from "./deleteSaleList"; // eslint-disable-next-line

function TableSales(props) {
  const [deleteSaleList, setDeleteSaleList] = useState(false);

  const onDelete = () => {
    setDeleteSaleList(!deleteSaleList);
  }; // eslint-disable-next-line
  const { rowData } = props;
  const displayRow = rowData.map((eachRow) => {
    return (
      <div className="tableRow_2" key={eachRow.product_id}>
        <div className="actual_data_2" key={eachRow.product_id}>
          <div className="stock_id">{eachRow.product}</div>
          <div className="qty">{eachRow.quantity}</div>
          <div className="price">{eachRow.selling_price}</div>
        </div>
      </div>
    );
  });

  return <div className="table_2">{displayRow}</div>;
}

export default TableSales;
