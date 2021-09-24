import React from "react";
import SvgClose from "../../Assets/icons/Close";

const DeleteButton = ({ onClick }) => {
  return (
    <span className="delete-button" onClick={onClick}>
      <SvgClose />
    </span>
  );
};

export default DeleteButton;
