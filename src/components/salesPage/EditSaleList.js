import React, { useEffect, useState } from "react";
import SvgMenu from "../../Assets/icons/Menu";
import SvgDone from "../../Assets/icons/Done";
import SvgAdd from "../../Assets/icons/Add";
import Input from "../Input";
import "../../css/addsales.css";
import SvgClose from "../../Assets/icons/Close";
import SideNavBar from "../ProductDashboard/SideNavBar";
import SideNavBar2 from "../ProductDashboard/SideNavBar2";
import DeleteSaleList from "./deleteSaleList";
import { logout } from "../../auth";
import { Redirect } from "react-router-dom";
import SecureStorage from "../../auth/secure";

const EditSaleList = () => {
  const [showsidenavbar, setShowSideNavBar] = useState(false);
  const [showfullsidenavbar, setShowFullSideNavBar] = useState(false);
  const [navwidth, setWidth] = useState(false);
  let width = navwidth ? "220px" : "100px";
  const [salelist, setSaleList] = useState([]);
  const [newsalelist, setNewSaleList] = useState([]);
  const [displayInput, setDisplayInput] = useState(false);
  const [deletesalelist, setDeleteSaleList] = useState(false);
  const [showsales, setShowSales] = useState(false);
  const sale_list_id = SecureStorage.get("Sale_List_ID");
  const [updatedSale, setUpdatedSale] = useState({
    quantity: "",
    selling_price: "",
  });
  const [sale, setSale] = useState({
    product_id: "",
    quantity: "",
    selling_price: "",
    product: "",
  });
  const [customer, setCustomer] = useState({
    customer_name: "",
    customer_contact: "",
  });
  const [products, setProducts] = useState([]);
  const [toggle, setToggle] = useState(false);
  const token = SecureStorage.get("REACT_TOKEN_AUTH_KEY");
  const business_id = SecureStorage.get("Business");
  const [salelistinfo, setSaleListInfo] = useState({});

  const onHover = () => {
    setShowFullSideNavBar(!showfullsidenavbar);
    setWidth(!navwidth);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSale((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleUpdateChange = (event) => {
    const { name, value } = event.target;
    setUpdatedSale((prevDetails) => ({
      ...prevDetails,
      [name]: value.length !== 0 ? value : event.target.defaultValue,
    }));
  };

  const handleCustomerChange = (event) => {
    const { name, value } = event.target;
    setCustomer((prevDetails) => ({
      ...prevDetails,
      [name]: value.length !== 0 ? value : event.target.defaultValue,
    }));
  };

  const getProductId = () => {
    let val = document.getElementById("product_id").value;
    for (let x = 0; x < products.length; x++) {
      if (val === products[x].name) {
        setSale((prevDetails) => ({
          ...prevDetails,
          product_id: products[x].product_id,
          product: val,
        }));
      }
    }
  };
  const onAdd = () => {
    if (
      sale.customer_contact === "" ||
      sale.customer_name === "" ||
      sale.quantity === "" ||
      sale.product === "" ||
      sale.selling_price === ""
    ) {
      alert("Sale could not be added.Input is empty");
    } else {
      setSaleList([...salelist, sale]);
      setNewSaleList([...newsalelist, sale]);
    }
  };
  const onEditSale = () => {
    setDisplayInput(true);
  };
  const onClickMenu = () => {
    setShowSideNavBar(!showsidenavbar);
    console.log(salelist);
  };
  const onClickClose = () => {
    setShowSideNavBar(!showsidenavbar);
  };
  const onDelete = (event) => {
    const id = event.target.id;
    const data = salelist[id];
    if (newsalelist.includes(data)) {
      const data_id = newsalelist.indexOf(data);
      newsalelist.splice(data_id, 1);
      setNewSaleList([...newsalelist]);
      salelist.splice(id, 1);
      setSaleList([...salelist]);
    } else {
      deleteSale(salelist[id].id);
    }
  };
  const onDeleteSaleList = () => {
    setDeleteSaleList(!deletesalelist);
  };
  const deleteSaleList = async () => {
    const response = await fetch(
      `https://sima-backend.herokuapp.com/sale/list/${sale_list_id}`,
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
      alert("SaleList deleted successfully");
      setShowSales(!showsales);
    } else {
      alert("Could not delete stocklist");
    }
  };
  const updateSale = async (id, index) => {
    const response = await fetch(
      `https://sima-backend.herokuapp.com/sale/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedSale),
      }
    );
    if (response.status === 401) {
      logout();
      alert("Session has expired");
    } else if (response.status === 200) {
      salelist[index] = {
        ...salelist[index],
        quantity: updatedSale.quantity,
        selling_price: updatedSale.selling_price,
      };
    } else {
      alert("Could not updated sale");
    }
    setDisplayInput(false);
  };

  const deleteSale = async (id) => {
    const response = await fetch(
      `https://sima-backend.herokuapp.com/sale/${id}`,
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
    } else {
      fetchSales();
    }
  };

  const fetchProducts = async () => {
    const response = await fetch(
      `https://sima-backend.herokuapp.com/business/${business_id}/product`,
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
  const fetchSales = async () => {
    const response = await fetch(
      `https://sima-backend.herokuapp.com/sale/sale_list/${sale_list_id}`,
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
      setSaleList(res.sales_by_sale_list_id);
    } else {
      alert(res.message);
    }
  };

  const fetchSaleList = async () => {
    const response = await fetch(
      `https://sima-backend.herokuapp.com/sale/list/${sale_list_id}`,
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
      setSaleListInfo(res);
    } else {
      alert(res.message);
    }
  };

  const UpdateSaleList = async () => {
    const data = { sales: newsalelist };
    const response = await fetch(
      `https://sima-backend.herokuapp.com/sale/add/${sale_list_id}`,
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
    if (response.status === 401) {
      logout();
      alert("Session expired");
    } else if (response.status === 201) {
      updateCustomer();
    } else if (response.status === 400) {
      alert(res.message);
    } else {
      alert("Could not add new stock");
    }
    setToggle(!toggle);
  };

  const updateCustomer = async () => {
    const response = await fetch(
      `https://sima-backend.herokuapp.com/sale/list/${sale_list_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(customer),
      }
    );
    if (response.status === 200) {
      alert("Update Successful");
    }
  };

  useEffect(() => {
    fetchSales();
    fetchProducts();
    fetchSaleList();
  }, []);

  return (
    <>
      {!showsales ? (
        <>
          {!toggle ? (
            <div className="add-sale-container">
              {showsidenavbar ? (
                <div className="side-nav-page">
                  <SideNavBar onClick={onClickClose} />
                </div>
              ) : null}
              {deletesalelist ? (
                <div className="popup">
                  <DeleteSaleList
                    onClick={onDeleteSaleList}
                    deletesalelist={deleteSaleList}
                    id={sale_list_id}
                  />
                </div>
              ) : null}
              <div className="add-sale">
                <header>
                  <div className="menu" onClick={onClickMenu}>
                    <SvgMenu fill="#6842ff" />
                  </div>
                  <div className="done" onClick={UpdateSaleList}>
                    <SvgDone fill="#6842ff" stroke="#6842ff" />
                  </div>
                  <div className="delete" onClick={deleteSaleList}>
                    <SvgClose fill="#E6B0B0" />
                  </div>
                </header>
                <div className="desktop-side-nav-bar" style={{ width: width }}>
                  {!showfullsidenavbar ? (
                    <SideNavBar2 onHover={onHover} navwidth="100px" />
                  ) : (
                    <SideNavBar onHover={onHover} navwidth="220px" />
                  )}
                </div>
                <main>
                  <div className="head">
                    <span>Edit SaleList</span>
                    <div className="addbutton" onClick={onAdd}>
                      <SvgAdd fill="#9c89e7" />
                    </div>
                  </div>
                  <div className="stock-input-form">
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
                              <option value={product.name}>
                                {product.name}
                              </option>
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
                        name="quantity"
                        onChange={handleChange}
                      />
                      <Input
                        label="Unit Price"
                        required="required"
                        type="number"
                        min="0.00"
                        step="0.1"
                        name="selling_price"
                        onChange={handleChange}
                      />
                      <div className="addbutton" onClick={onAdd}>
                        <SvgAdd fill="#9c89e7" />
                      </div>
                    </div>
                    <div className="customer-input-form">
                      <Input
                        label="Customer Name"
                        required="required"
                        type="text"
                        name="customer_name"
                        onChange={handleCustomerChange}
                        defaultValue={salelistinfo.customer_name}
                      />
                      <Input
                        label="Customer Contact"
                        required="required"
                        type="tel"
                        name="customer_contact"
                        onChange={handleCustomerChange}
                        defaultValue={salelistinfo.customer_contact}
                      />
                    </div>
                  </div>
                  <div className="stock-product-list">
                    <div className="table-head">
                      <span className="product">Product</span>
                      <span className="quantity">Quantity</span>
                      <span className="price">Unit Price</span>
                    </div>
                    <div className="table-body">
                      {salelist.map((sale) => {
                        return (
                          <div className="sale-list-item">
                            <div className="sale" onClick={onEditSale}>
                              <span className="product">{sale.product}</span>
                              <span
                                className="quantity"
                                style={{
                                  display: !displayInput
                                    ? "inline-block"
                                    : "none",
                                }}
                              >
                                {sale.quantity}
                              </span>
                              <input
                                className="quantity"
                                style={{
                                  display: displayInput
                                    ? "inline-block"
                                    : "none",
                                }}
                                defaultValue={sale.quantity}
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
                                {sale.selling_price}
                              </span>
                              <input
                                className="price"
                                style={{
                                  display: displayInput
                                    ? "inline-block"
                                    : "none",
                                }}
                                defaultValue={sale.selling_price}
                                name="selling_price"
                                onChange={handleUpdateChange}
                              />
                            </div>
                            <div
                              className="close"
                              onClick={
                                !displayInput
                                  ? onDelete
                                  : () => {
                                      updateSale(
                                        sale.id,
                                        salelist.indexOf(sale)
                                      );
                                    }
                              }
                              id={salelist.indexOf(sale)}
                            >
                              {!displayInput ? (
                                <SvgClose
                                  fill="#E6B0B0"
                                  id={salelist.indexOf(sale)}
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
                <div className="done desktop-done" onClick={UpdateSaleList}>
                  <SvgDone fill="#6842ff" stroke="#6842ff" />
                </div>
                <div className="done desktop-done" onClick={onDeleteSaleList}>
                  <SvgClose fill="#E6B0B0" />
                </div>
              </div>
            </div>
          ) : (
            <Redirect to="/business/sales/salelist" />
          )}
        </>
      ) : (
        <Redirect to="/business/sales" />
      )}
    </>
  );
};
export default EditSaleList;
