import React, { useState, useEffect } from "react";
import SvgMenu from "../../Assets/icons/Menu";
import "../../css/business.css";
import { logout } from "../../auth/index";
import SVGPencil from "../../Assets/icons/Pencil";
import TableHead from "./tableHead2";
import SideNavBar from "../ProductDashboard/SideNavBar";
import TableRow from "./tableRow2";
import SideNavBar2 from "../ProductDashboard/SideNavBar2";
import { Link } from "react-router-dom";
import Tfooter from '../StocksPage/tfooter'

const StockListPage = () => {
  const [showsidenavbar, setShowSideNavBar] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [addstockList, setAddStockList] = useState(false);
  const [stocklist, setStockList] = useState([]);
  const [showfullsidenavbar, setShowFullSideNavBar] = useState(false);
  const token = JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH_KEY'))
  const stock_list_id = localStorage.getItem('Stock_List_ID')

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
    setAddStockList(!addstockList);
  };
  const onHover = () => {
    setShowFullSideNavBar(!showfullsidenavbar);
  };
    const fetchStockList = async () => {
    const response = await fetch(`http://localhost:9000/stock/stock_list/${stock_list_id}`,{
        method: 'GET',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        }
    })
    const res = await response.json()
    if (response.status === 401){
        logout()
        alert('Session has expired')
    }
    else if(response.status === 200){
      console.log(res)
      setStockList(res)
    }
    else{
        alert(res.message)
    }
}

useEffect(()=>{
  fetchStockList()
},[])

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
          <Link to='/business/stocks/editstocklist'>
            <button>
              {showEdit ? (
              <SVGPencil fill="#6842ff" />
              ):null}
            </button>
            </Link>
          </div>
        </div>{" "}
      </div>

      {/* <div className="divdown"> */}
      <div className="edit">
        <button>
          <Link to='/business/stocks/editstocklist'><SVGPencil fill="#6842ff" /></Link>
        </button>
      </div>
      {/* </div> */}
      
      <div className="mobile_stockList table-div  ">
      <div className='list'>
        <TableHead />
        <TableRow
          rowData={stocklist}
          showEdit={showEdit}
        />
        <Tfooter/>
      </div>
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

export default StockListPage;
