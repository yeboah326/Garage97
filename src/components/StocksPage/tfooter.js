import React, { Component } from "react";

function Tfooter({ page, max_page, setPage }) {
  const greater = "<";
  const lesser = ">";
  let max_color = page === max_page ? true : false;
  let min_color = page === 1 ? true : false;

  const Increment = () => {
    if (page < max_page) {
      setPage(++page);
    }
  };

  const Decrement = () => {
    if (page !== 1) {
      setPage(--page);
    }
  };
  return (
    <div className="Tfooter">
      <span
        className="greater"
        onClick={Decrement}
        style={{ color: min_color ? "#c0c0c0" : "#968ce6" }}
      >
        {" "}
        {greater}{" "}
      </span>
      <span className="page_id"> {page} </span>
      <span
        className="lesser"
        onClick={Increment}
        style={{ color: max_color ? "#c0c0c0" : "#968ce6" }}
      >
        {" "}
        {lesser}{" "}
      </span>
    </div>
  );
}

export default Tfooter;
