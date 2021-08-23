import React, { useState, useEffect } from "react";
import SvgMenu from "../../Assets/icons/Menu";
import "../../css/business.css";
import { logout } from "../../auth/index";
import { business_id } from "../BusinessesDashboard/Businesses";
import TableHead from "./tableHead";
import SideNavBar from "../ProductDashboard/SideNavBar";
import TableRow from "./tableRow";
import AddButton from "../ProductDashboard/AddButton";
import SideNavBar2 from "../ProductDashboard/SideNavBar2";
import { Link } from "react-router-dom";
import Tfooter from '../StocksPage/tfooter'

const StockPage = () => {
  const [showsidenavbar, setShowSideNavBar] = useState(false);
  const [addstockList, setAddStockList] = useState(false);
  const [stocklists, setStockLists] = useState([]);
  const [showfullsidenavbar, setShowFullSideNavBar] = useState(false);
  const [navwidth,setWidth] = useState(false)
  let width = navwidth ? '220px' : '100px'
  const token = JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH_KEY'))
  const business_id = localStorage.getItem('Business')

  const fetchStockLists = async () => {
        const response = await fetch(`http://localhost:9000/business/${business_id}/stock_list`,{
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
          console.log(res.business_stock_lists)
            setStockLists(res.business_stock_lists)

        }
        else{
            alert(res.message)
        }
  }


  useEffect(()=>{
      fetchStockLists()
},[])

  const onClickMenu = () => {
    setShowSideNavBar(!showsidenavbar);
  };
  const onClickClose = () => {
    setShowSideNavBar(!showsidenavbar);
  };

  
  const onClickAdd = () => {
    setAddStockList(!addstockList);
  };
  const onHover = () => {
    setShowFullSideNavBar(!showfullsidenavbar);
    setWidth(!navwidth)
  };

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
                <div className="ad" onClick={onClickAdd}>
                  <Link to="/business/stocks/addstocks">
                    <AddButton />
                  </Link>
                </div>
            </div>
        </div>
        <div className="desktop-side-nav-bar" style={{width:width}}>
          {!showfullsidenavbar ? (
            <SideNavBar2 onHover={onHover}  navwidth='100px'/>
          ) : (
            <SideNavBar onHover={onHover} navwidth='220px'/>
          )}
        </div>

        
        <div className='list'>
          <div className="mobile_stockList">
            <div className='stock-head'>Stocks</div>
            <TableHead />
            <TableRow
              rowData={stocklists}
              
            />
            <Tfooter/>
          </div>
        </div>
        <div className="divdown">
      
          
            <div className="ad" onClick={onClickAdd}>
              <Link to="/business/stocks/addstocks">
                <AddButton />
              </Link>
            </div>
        </div>
        
      </div>
    </div>
  );
};

export default StockPage;
