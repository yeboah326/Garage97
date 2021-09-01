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
  const [navwidth,setWidth] = useState(false)
  let width = navwidth ? '220px' : '100px'
  const token = JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH_KEY'))
  const stock_list_id = localStorage.getItem('Stock_List_ID')
  const [page,setPage] = useState(1)
  const [stocklist_pages,setStockListPages] = useState()

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
    setWidth(!navwidth)
  };
    const fetchStockList = async () => {
    const response = await fetch(`http://localhost:9000/stock/stock_list/${stock_list_id}?items_per_page=9&page=${page}`,{
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
      setStockList(res.stocks_by_stock_list_id)
      setStockListPages(res.stocks_by_stock_list_id_pages)

    }
    else{
        alert(res.message)
    }
}

useEffect(()=>{
  fetchStockList()
},[page])

  return (
    <div className="stockListPage">
      {showsidenavbar ? (
        <div className="side-nav-page">
          <SideNavBar onClick={onClickClose} />
        </div>
      ) : null}
      <div className='stock-body'>
      <div className="header_grid">
        <div className="menu " onClick={onClickMenu}>
          <SvgMenu fill="#6842ff" />
        </div>
        <div className="divRight">
          <div className="edit_stockList " onClick={onClickEdit}>
          <Link to='/business/stocks/editstocklist'>
            <button>
              <SVGPencil fill="#6842ff" />
            </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="desktop-side-nav-bar" style={{width:width}}>
        {!showfullsidenavbar ? (
          <SideNavBar2 onHover={onHover} navwidth='100px'/>
        ) : (
          <SideNavBar onHover={onHover} navwidth='220px'/>
        )}
      </div>

      
      <div className='list'>
      <div className="mobile_stockList">
        <div className='stock-head'>Stock {stock_list_id}</div>
        <TableHead />
        <TableRow
          rowData={stocklist}
        />
        <Tfooter page={page} setPage={setPage} max_page={stocklist_pages}/>
      </div>
      </div>
      <div className="divdown">
      <div className="edit">
        <button>
          <Link to='/business/stocks/editstocklist'><SVGPencil fill="#6842ff" /></Link>
        </button>
      </div>
      </div>
      </div>
    </div>
  );
};

export default StockListPage;
