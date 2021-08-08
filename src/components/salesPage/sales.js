import React, { useState, useEffect } from "react";
import SvgMenu from "../../Assets/icons/Menu";
import "../../css/business.css";
import { logout } from "../../auth/index";
import { business_id } from "../BusinessesDashboard/Businesses";
import SVGpencil from "../../Assets/icons/pencil";
import SalesHead from "./SalesHead";
import SideNavBar from "../ProductDashboard/SideNavBar";
import TableSales from "./tableSales";
import AddButton from "../ProductDashboard/AddButton";
import Addsales from "./AddSales";
import SideNavBar2 from "../ProductDashboard/SideNavBar2";
import SvgDone from "../../Assets/icons/Done";
import { Link } from "react-router-dom";
import Tfooter from "../StocksPage/tfooter";

const SalesListPage = () => {
  const [showsidenavbar, setShowSideNavBar] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [addsalesList, setAddSalesList] = useState(false);
  // const [stocklist, setStockList] = useState([]);
  const [showfullsidenavbar, setShowFullSideNavBar] = useState(false);

  const onClickMenu = () => {
    setShowSideNavBar(!showsidenavbar);
  };
  const onClickClose = () => {
    setShowSideNavBar(!showsidenavbar);
  };
  const onClickEdit = () => {
    setShowEdit(!showEdit);
  };
  const onClickAdd = () => {
    setAddSalesList(!addsalesList);
  };
  const onHover = () => {
    setShowFullSideNavBar(!showfullsidenavbar);
  };

  return (
    <div className="stockListPage stock-body">
      {showsidenavbar ? (
        <div className="side-nav-page">
          <SideNavBar onClick={onClickClose} />
        </div>
      ) : null}
      <div className="header_grid">
        <div className="menu " onClick={onClickMenu}>
          <SvgMenu fill="#6842ff" />
        </div>
        <div className="divRight">
          <div className="edit_stockList " onClick={onClickEdit}>
            <button>
              {showEdit ? (
                <SvgDone fill="#6842ff" />
              ) : (
                <SVGpencil fill="#6842ff" />
              )}
            </button>
          </div>
          {showEdit ? (
            <div className="ad" onClick={onClickAdd}>
              <Link to="/addsales">
                <AddButton />
              </Link>
            </div>
          ) : null}
        </div>{" "}
      </div>

      {/* <div className="divdown"> */}
      <div className="edit" onClick={onClickEdit}>
        <button>
          {showEdit ? <SvgDone fill="#6842ff" /> : <SVGpencil fill="#6842ff" />}
        </button>
        {showEdit ? (
          <div className="ad" onClick={onClickAdd}>
            <Link to="/addsales">
              <AddButton />
            </Link>
          </div>
        ) : null}
      </div>
      {/* </div> */}
      <div className="mobile_stockList table-div  ">
        <SalesHead />
        <TableSales
          rowData={[
            { sale_id: 23342, qty: 24, total_price: 43, date: "21-09-2020" },
            { sale_id: 2332, qty: 24, total_price: 43, date: "21-09-2020" },
          ]}
          showEdit={showEdit}
        />
        <Tfooter />
      </div>
      <div className="desktop-side-nav-bar">
        {!showfullsidenavbar ? (
          <SideNavBar2 onHover={onHover} />
        ) : (
          <SideNavBar onHover={onHover} />
        )}
      </div>
    </div>
  );
};

export default SalesListPage;
