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
import DeleteStockList from "./deleteStockList";
import SecureStorage from "../../auth/secure";

const EditStockList = () => {
  const [showsidenavbar, setShowSideNavBar] = useState(false);
  const [showfullsidenavbar, setShowFullSideNavBar] = useState(false);
  const [navwidth, setWidth] = useState(false);
  const [products, setProducts] = useState([]);
  const [stocklist, setStockList] = useState([]);
  const [newstocklist, setNewStockList] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [displayInput, setDisplayInput] = useState(false);
  const [deletestocklist, setDeleteStockList] = useState(false);
  const [showstocks, setShowStocks] = useState(false);
  const stock_list_id = SecureStorage.get("Stock_List_ID");
  const [stock, setStock] = useState({
    product_id: "",
    quantity: "",
    buying_price: "",
    product: "",
    stock_list_id: `${stock_list_id}`,
  });
  const [updatedStock, setUpdatedStock] = useState({
    quantity: "",
    buying_price: "",
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

  const handleUpdateChange = (event) => {
    const { name, value } = event.target;
    setUpdatedStock((prevDetails) => ({
      ...prevDetails,
      [name]: value.length !== 0 ? value : event.target.defaultValue,
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
      setNewStockList([...newstocklist, stock]);
    }
  };

  const onEditStock = () => {
    setDisplayInput(true);
  };
  const onDelete = (event) => {
    const id = event.target.id;
    const data = stocklist[id];
    if (newstocklist.includes(data)) {
      const data_id = newstocklist.indexOf(data);
      newstocklist.splice(data_id, 1);
      setNewStockList([...newstocklist]);
      stocklist.splice(id, 1);
      setStockList([...stocklist]);
    } else {
      deleteStock(stocklist[id].id);
    }
  };
  const onDeleteStockList = () => {
    setDeleteStockList(!deletestocklist);
  };
  const deleteStockList = async () => {
    const response = await fetch(
      `http://localhost:9000/stock/list/${stock_list_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 401) {
      logout();
      alert("Session has expired");
    } else if (response.status === 200) {
      alert("StockList deleted successfully");
      setShowStocks(!showstocks);
    } else {
      alert("Could not delete stocklist");
    }
  };

  const updateStock = async (id, index) => {
    const response = await fetch(`http://localhost:9000/stock/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedStock),
    });
    if (response.status === 401) {
      logout();
      alert("Session has expired");
    } else if (response.status === 200) {
      stocklist[index] = {
        ...stocklist[index],
        quantity: updatedStock.quantity,
        buying_price: updatedStock.buying_price,
      };
    } else {
      alert("Could not updated stock");
    }
    setDisplayInput(false);
  };
  const deleteStock = async (id) => {
    const response = await fetch(`http://localhost:9000/stock/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 401) {
      logout();
      alert("Session has expired");
    } else if (response.status === 400) {
      alert("Could not process request");
    } else {
      fetchStocks();
    }
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

  const fetchStocks = async () => {
    const response = await fetch(
      `http://localhost:9000/stock/stock_list/${stock_list_id}`,
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
      setStockList(res.stocks_by_stock_list_id);
    } else {
      alert(res.message);
    }
  };

  const UpdateStockList = async () => {
    if (newstocklist.length !== 0) {
      const data = { stocks: newstocklist };
      const response = await fetch(
        `http://localhost:9000/stock/add/${stock_list_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );
      const res = await response.json();
      if (response.status === 201) {
        alert(res.message);
      } else if (response.status === 400) {
        alert(res.message);
      } else {
        alert("Could not add new stock");
      }
    }
    setToggle(!toggle);
  };

  useEffect(() => {
    fetchStocks();
    fetchProducts();
  }, []);

  return (
    <>
      {!showstocks ? (
        <>
          {!toggle ? (
            <div className="add-sale-container">
              {showsidenavbar ? (
                <div className="side-nav-page">
                  <SideNavBar onClick={onClickClose} />
                </div>
              ) : null}
              {deletestocklist ? (
                <div className="popup">
                  <DeleteStockList
                    onClick={onDeleteStockList}
                    deletestocklist={deleteStockList}
                    id={stock_list_id}
                  />
                </div>
              ) : null}
              <div className="add-sale">
                <header>
                  <div className="menu" onClick={onClickMenu}>
                    <SvgMenu fill="#6842ff" />
                  </div>
                  <div className="done" onClick={UpdateStockList}>
                    <SvgDone fill="#6842ff" stroke="#6842ff" />
                  </div>
                  <div className="delete" onClick={deleteStockList}>
                    <SvgClose fill="#E6B0B0" />
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
                    <span>Edit StockList</span>
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
                            <div className="sale" onClick={onEditStock}>
                              <span className="product">{stock.product}</span>
                              {/* <input className='product' style={{display:displayInput ? 'inline-block' : 'none'}} defaultValue={stock.product} name='product' onChange={handleChange}/> */}
                              <span
                                className="quantity"
                                style={{
                                  display: !displayInput
                                    ? "inline-block"
                                    : "none",
                                }}
                              >
                                {stock.quantity}
                              </span>
                              <input
                                className="quantity"
                                style={{
                                  display: displayInput
                                    ? "inline-block"
                                    : "none",
                                }}
                                defaultValue={stock.quantity}
                                name="quantity"
                                onChange={handleUpdateChange}
                              />
                              <span
                                className="price"
                                style={{
                                  display: !displayInput
                                    ? "inline-block"
                                    : "none",
                                }}
                              >
                                {stock.buying_price}
                              </span>
                              <input
                                className="price"
                                style={{
                                  display: displayInput
                                    ? "inline-block"
                                    : "none",
                                }}
                                defaultValue={stock.buying_price}
                                name="buying_price"
                                onChange={handleUpdateChange}
                              />
                            </div>
                            <div
                              className="close"
                              onClick={
                                !displayInput
                                  ? onDelete
                                  : () => {
                                      updateStock(
                                        stock.id,
                                        stocklist.indexOf(stock)
                                      );
                                    }
                              }
                              id={stocklist.indexOf(stock)}
                            >
                              {!displayInput ? (
                                <SvgClose
                                  fill="#E6B0B0"
                                  id={stocklist.indexOf(stock)}
                                />
                              ) : (
                                <SvgDone fill="#6842ff" stroke="#6842ff" />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </main>
                <div className="done desktop-done" onClick={UpdateStockList}>
                  <SvgDone fill="#6842ff" stroke="#6842ff" />
                </div>
                <div className="done desktop-done" onClick={onDeleteStockList}>
                  <SvgClose fill="#E6B0B0" />
                </div>
              </div>
            </div>
          ) : (
            <Redirect to="/business/stocks/stocklist" />
          )}
        </>
      ) : (
        <Redirect to="/business/stocks" />
      )}
    </>
  );
};

export default EditStockList;
