import React, { useState, useEffect } from "react";
import { logout } from "../../auth";
import Button from "../Button";
import SecureStorage from "../../auth/secure";

const DeleteProduct = ({ onClick, id, fetchData }) => {
  const token = JSON.parse(localStorage.getItem("REACT_TOKEN_AUTH_KEY"));
  const [product_name, setProductName] = useState("");

  const fetchProduct = async () => {
    const response = await fetch(
      `https://sima-backend.herokuapp.com/product/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const res = await response.json();
    if (response.status === 401) {
      logout();
      alert("Session has expired");
    }
    if (response.status === 200) {
      setProductName(res.name);
    } else {
      alert(res.message);
    }
  };
  const deleteproduct = async () => {
    const response = await fetch(
      `https://sima-backend.herokuapp.com/product/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const res = await response.json;
    if (response.status === 401) {
      logout();
      alert("Session has expired");
    }
    if (response.status === 200) {
      fetchData();
    } else {
      alert("Could not process request");
    }
    onClick();
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <div className="delete-product">
      <p>Delete product</p>
      <span>Are you sure you want to delete {product_name}?</span>
      <div>
        <Button name="Cancel" color="#6842ff" toggle={onClick} />
        <Button name="Delete" color="red" toggle={deleteproduct} />
      </div>
    </div>
  );
};

export default DeleteProduct;
