import React, { useState, useEffect } from "react";
import SvgMenu from "../../Assets/icons/Menu";
import "../../css/business.css";
import { logout } from "../../auth/index";
import SVGPencil from "../../Assets/icons/Pencil";
import SalesHead from "./SalesHead2";
import SideNavBar from "../ProductDashboard/SideNavBar";
import TableSales from "./tableSales2";
import AddButton from "../ProductDashboard/AddButton";
import SideNavBar2 from "../ProductDashboard/SideNavBar2";
import { Link } from "react-router-dom";
import Tfooter from '../StocksPage/tfooter'

const SalesListPage = () => {
  const [showsidenavbar, setShowSideNavBar] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [addsaleList, setAddSaleList] = useState(false);
  const [salelist, setSaleList] = useState([]);
  const [showfullsidenavbar, setShowFullSideNavBar] = useState(false);
  const token = JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH_KEY'))
  const sale_list_id = localStorage.getItem('Sale_List_ID')

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
    setAddSaleList(!addsaleList)
  };
  const onHover = () => {
    setShowFullSideNavBar(!showfullsidenavbar);
  };
    const fetchSaleList = async () => {
    const response = await fetch(`http://localhost:9000/sale/sale_list/${sale_list_id}`,{
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
      setSaleList(res)
      localStorage.setItem('Customer',JSON.stringify({'customer_name':res.customer_name,'customer_contact':res.customer_contact}))
      console.log(JSON.parse(localStorage.getItem('Customer')))
    }
    else{
        alert(res.message)
    }
}

useEffect(()=>{
  fetchSaleList()
},[])

  return (
    <div className="salesListPage stock-body">
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
            <Link to='/business/sales/editsalelist'>
            <button>
                <SVGPencil fill="#6842ff" />
            </button>
            </Link>
          </div>
        </div>
      </div>

      {/* <div className="divdown"> */}
      <div className="edit" onClick={onClickEdit}>
        <Link to='/business/sales/editsalelist'>
        <button>
          <SVGPencil fill="#6842ff" />
        </button>
        </Link>
      </div>
      {/* </div> */}
      <div className='list'>
      <div className="mobile_stockList table-div  ">
         <SalesHead />
        <TableSales
          rowData={salelist}
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

export default SalesListPage;
