import React, { useState, useEffect } from "react";
import SvgMenu from "../../Assets/icons/Menu";
import SvgDone from "../../Assets/icons/Done";
import SvgAdd from "../../Assets/icons/Add";
import Input from "../Input";
import "../../css/addsales.css";
import SvgClose from "../../Assets/icons/Close";
import SideNavBar from "../ProductDashboard/SideNavBar";
import SideNavBar2 from "../ProductDashboard/SideNavBar2";
import { logout } from "../../auth";
import { Redirect } from "react-router-dom";
import SecureStorage from "../../auth/secure";

const AddStocks = () => {
  const [showsidenavbar, setShowSideNavBar] = useState(false);
  const [showfullsidenavbar, setShowFullSideNavBar] = useState(false);
  const [navwidth, setWidth] = useState(false);
  const [products, setProducts] = useState([]);
  const [stocklist, setStockList] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [stock, setStock] = useState({
    product_id: "",
    quantity: "",
    buying_price: "",
    product: "",
  });
  const token = JSON.parse(localStorage.getItem("REACT_TOKEN_AUTH_KEY"));
  const business_id = SecureStorage.get("Business");

  let width = navwidth ? "220px" : "100px";

  const onHover = () => {
    setShowFullSideNavBar(!showfullsidenavbar);
    setWidth(!navwidth);
  };

  const onClickMenu = () => {
    setShowSideNavBar(!showsidenavbar);
    console.log(stocklist);
  };
  const onClickClose = () => {
    setShowSideNavBar(!showsidenavbar);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setStock((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  const getProductId = () => {
    let val = document.getElementById("product_id").value;
    for (let x = 0; x < products.length; x++) {
      if (val === products[x].name) {
        setStock((prevDetails) => ({
          ...prevDetails,
          product_id: products[x].product_id,
          product: val,
        }));
      }
    }
  };
  const onAdd = () => {
    if (
      stock.quantity === "" ||
      stock.product === "" ||
      stock.buying_price === ""
    ) {
      alert("Stock could not be added.Input is empty");
    } else {
      setStockList([...stocklist, stock]);
    }
  };
  const onDelete = (event) => {
    let id = event.target.id;
    stocklist.splice(id, 1);
    setStockList([...stocklist]);
  };

  const fetchProducts = async () => {
    const response = await fetch(
      `http://localhost:9000/business/${business_id}/product`,
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
    } else if (response.status === 200) {
      setProducts(res);
    } else {
      alert(res.message);
    }
  };

  const postStockList = async () => {
    const data = { stock_list: stocklist, business_id: `${business_id}` };
    const response = await fetch("http://localhost:9000/stock/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    if (stocklist.length === 0) {
      alert("Could not add empty stock");
    } else if (response.status === 201) {
      alert(res.message);
    } else if (response.status === 400) {
      alert(res.message);
    } else {
      alert("Could not add new stock");
    }
    setToggle(!toggle);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      {!toggle ? (
        <div className="add-sale-container">
          {showsidenavbar ? (
            <div className="side-nav-page">
              <SideNavBar onClick={onClickClose} />
            </div>
          ) : null}
          <div className="add-sale">
            <header>
              <div className="menu" onClick={onClickMenu}>
                <SvgMenu fill="#6842ff" />
              </div>
              <div className="done" onClick={postStockList}>
                <SvgDone fill="#6842ff" stroke="#6842ff" />
              </div>
            </header>
            <div className="desktop-side-nav-bar" style={{ width: width }}>
              {!showfullsidenavbar ? (
                <SideNavBar2 onHover={onHover} />
              ) : (
                <SideNavBar onHover={onHover} />
              )}
            </div>
            <main>
              <div className="head">
                <span>Add new stock</span>
                <div className="addbutton" onClick={onAdd}>
                  <SvgAdd fill="#9c89e7" />
                </div>
              </div>
              <div className="stock-form">
                <div>
                  <label for="product">Product</label>
                  <input
                    type="list"
                    id="product_id"
                    name="product_id"
                    list="product"
                    onChange={() => {
                      getProductId();
                    }}
                  ></input>
                  <datalist id="product">
                    {products.map((product) => {
                      return (
                        <option value={product.name}>{product.name}</option>
                      );
                    })}
                  </datalist>
                </div>
                <Input
                  label="Quantity"
                  required="required"
                  type="number"
                  step="1"
                  min="0"
                  onChange={handleChange}
                  name="quantity"
                />
                <Input
                  label="Unit Price"
                  required="required"
                  type="number"
                  min="0.00"
                  step="0.1"
                  onChange={handleChange}
                  name="buying_price"
                />
                <div className="addbutton" onClick={onAdd}>
                  <SvgAdd fill="#9c89e7" />
                </div>
              </div>
              <div className="stock-product-list">
                <div className="table-head">
                  <span className="product">Product</span>
                  <span className="quantity">Quantity</span>
                  <span className="price">Unit Price</span>
                </div>
                <div className="table-body">
                  {stocklist.map((stock) => {
                    return (
                      <div className="sale-list-item">
                        <div className="sale">
                          <span className="product">{stock.product}</span>
                          <span className="quantity">{stock.quantity}</span>
                          <span className="price">{stock.buying_price}</span>
                        </div>
                        <div
                          className="close"
                          onClick={onDelete}
                          id={stocklist.indexOf(stock)}
                        >
                          <SvgClose
                            fill="#E6B0B0"
                            id={stocklist.indexOf(stock)}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </main>
            <div className="done desktop-done" onClick={postStockList}>
              <SvgDone fill="#6842ff" stroke="#6842ff" />
            </div>
          </div>
        </div>
      ) : (
        <Redirect to="/business/stocks" />
      )}
    </>
  );
};

export default AddStocks;
