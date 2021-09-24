import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../../auth";
import SecureStorage from "../../auth/secure";

const ReportList = () => {
  const business_name = SecureStorage.get("business_name");
  const token = JSON.parse(localStorage.getItem("REACT_TOKEN_AUTH_KEY"));
  const business = SecureStorage.get("Business");
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const response = await fetch(
      `http://localhost:9000/business/${business}/product`,
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
    } else {
      setProducts(res);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="report-list">
      <div className="header">Reports</div>
      <div className="business-report">
        <div className="business-report-head">Business</div>
        <NavLink to="/business/businessreport">
          <div className="business-report-name">{business_name}</div>
        </NavLink>
      </div>
      <div className="product-reports">
        <div className="product-reports-head">Products</div>
        <div className="product-reports-list">
          {products.map((product) => {
            return (
              <NavLink
                to="/business/product/productreport"
                className="product-report"
              >
                <div>{product.name}</div>
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ReportList;
