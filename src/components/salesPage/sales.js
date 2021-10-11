import React, { useState, useEffect } from "react";
import SvgMenu from "../../Assets/icons/Menu";
import "../../css/business.css";
import { logout } from "../../auth/index";
import SalesHead from "./SalesHead";
import SideNavBar from "../ProductDashboard/SideNavBar";
import TableSales from "./tableSales";
import AddButton from "../ProductDashboard/AddButton";
import SideNavBar2 from "../ProductDashboard/SideNavBar2";
import { Link } from "react-router-dom";
import Tfooter from "../StocksPage/tfooter";
import SecureStorage from "../../auth/secure";

const SalesPage = () => {
  const [showsidenavbar, setShowSideNavBar] = useState(false);
  const [addsaleList, setAddSaleList] = useState(false);
  const [salelists, setSaleLists] = useState([]);
  const [showfullsidenavbar, setShowFullSideNavBar] = useState(false);
  const [navwidth, setWidth] = useState(false);
  let width = navwidth ? "220px" : "100px";
  const token = JSON.parse(localStorage.getItem("REACT_TOKEN_AUTH_KEY"));
  const business_id = SecureStorage.get("Business");
  const [page, setPage] = useState(1);
  const [salelist_pages, setSaleListPages] = useState();
  const items_per_page_mobile = Math.floor((0.6 * window.innerHeight) / 55);
  const items_per_page_desktop = Math.floor((0.7 * window.innerHeight) / 55);
  let items_per_page =
    window.innerWidth < 700 ? items_per_page_mobile : items_per_page_desktop;

  const fetchSaleLists = async () => {
    const response = await fetch(
      `https://sima-backend.herokuapp.com/business/${business_id}/sale_list?items_per_page=${items_per_page}&page=${page}`,
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
      setSaleLists(res.business_sale_lists);
      setSaleListPages(res.business_sale_lists_pages);
    } else {
      alert(res.message);
    }
  };

  useEffect(() => {
    fetchSaleLists();
    console.log(items_per_page);
  }, [page]);

  const onClickMenu = () => {
    setShowSideNavBar(!showsidenavbar);
  };
  const onClickClose = () => {
    setShowSideNavBar(!showsidenavbar);
  };

  const onClickAdd = () => {
    setAddSaleList(!addsaleList);
  };
  const onHover = () => {
    setShowFullSideNavBar(!showfullsidenavbar);
    setWidth(!navwidth);
  };

  return (
    <div className="stockListPage">
      {showsidenavbar ? (
        <div className="side-nav-page">
          <SideNavBar onClick={onClickClose} />
        </div>
      ) : null}
      <div className="stock-body">
        <div className="header_grid">
          <div className="menu " onClick={onClickMenu}>
            <SvgMenu fill="#6842ff" />
          </div>
          <div className="divRight">
            <div className="ad" onClick={onClickAdd}>
              <Link to="/business/sales/addsales">
                <AddButton />
              </Link>
            </div>
          </div>
        </div>
        <div className="desktop-side-nav-bar" style={{ width: width }}>
          {!showfullsidenavbar ? (
            <SideNavBar2 onHover={onHover} navwidth="100px" />
          ) : (
            <SideNavBar onHover={onHover} navwidth="220px" />
          )}
        </div>

        <div className="list">
          <div className="mobile_stockList">
            <div className="stock-head">Sales</div>
            <SalesHead />
            <TableSales rowData={salelists} />
            <Tfooter page={page} setPage={setPage} max_page={salelist_pages} />
          </div>
        </div>
        <div className="divdown">
          <div className="ad" onClick={onClickAdd}>
            <Link to="/business/sales/addsales">
              <AddButton />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesPage;
