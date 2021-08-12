import React from 'react'
import SVGclose from '../../Assets/icons/cancel';
import {useState} from 'react'
import DeleteSaleList from './deleteSaleList';
import {NavLink} from 'react-router-dom'

function TableSales (props){
  const [deleteSaleList,setDeleteSaleList] = useState(false)
 
 
  const onDelete = () => {
    setDeleteSaleList(!deleteSaleList)
}
   const {rowData} =props;
   const displayRow = rowData.map(eachRow=>{
    return (
      <div  className="tableRow" key={eachRow.id}> 
      <NavLink to="/business/sales/salelist"  style={{textDecoration:"none"}}>
        <div  className="actual_data" key={eachRow.id} onClick={()=>localStorage.setItem('Sale_List_ID',eachRow.id)}> 

        <div className='sale_id'>{eachRow.id}</div>
        <div className='qty'>{eachRow.quantity}</div>
        <div className='total_pice'>{eachRow.total_selling_price}</div>
         <div className='date'>{eachRow.date}</div>
         </div>
         </NavLink>
        { props.showEdit ?
         <div className='close' onClick={onDelete} ><SVGclose fill='red'/> 
         {deleteSaleList ? 
            <div className='pop'>
                <DeleteSaleList onClick={onDelete}  id={eachRow.sale_id}/>
            </div> :
            null
            } 
            </div> : null
        }


      </div>
      
    )
   })

   return (
     <div className="table">{displayRow}</div>
   )

   
}

export default TableSales;