import React from 'react'
import SVGclose from '../../Assets/icons/cancel';
import {useState} from 'react'
import DeleteSaleList from './deleteSaleList';
import {NavLink} from 'react-router-dom'
import SecureStorage from '../../auth/secure';

function TableSales (props){
   const {rowData} =props
   const months = {
    'Jan':'01','Feb':'02','Mar':'03','Apr':'04','May':'05','Jun':'06',
    "Jul":'07','Aug':'08','Sep':'09','Oct':'10','Nov':'11','Dec':'12'
   }
   const date = (date_input) => {
       const day = date_input.slice(5,7)
       const month = months[date_input.slice(8,11)]
       const year = date_input.slice(11,16)
       return `${day}/${month}/${year}`
   } 
   const displayRow = rowData.map(eachRow=>{
    return (
      <div  className="tableRow" key={eachRow.id}> 
      <NavLink to="/business/sales/salelist"  style={{textDecoration:"none"}}>
        <div  className="actual_data" key={eachRow.id} onClick={()=>SecureStorage.set('Sale_List_ID',eachRow.id)}> 

        <div className='stock_id'>{eachRow.id}</div>
        <div className='qty'>{eachRow.total_quantity}</div>
        <div className='stock'>{eachRow.total_price}</div>
         <div className='date'>{date(eachRow.created_on)}</div>
         </div>
         </NavLink>
      </div>
      
    )
   })

   return (
     <div className="table">{displayRow}</div>
   )

   
}

export default TableSales;