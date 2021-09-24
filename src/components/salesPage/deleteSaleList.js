import React from "react";
import Button from "../Button";
import { logout } from "../../auth";

const DeleteSaleList = ({ onClick, deletesalelist, id }) => {
  return (
    <div className="delete-product">
      <p>Delete SaleList</p>
      <span>Are you sure you want to delete salelist {id}?</span>
      <div>
        <Button name="Cancel" color="#243475" toggle={onClick} />
        <Button name="Delete" color="red" toggle={deletesalelist} />
      </div>
    </div>
  );
};

export default DeleteSaleList;
