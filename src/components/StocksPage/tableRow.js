import React from 'react'
import SVGclose from '../../Assets/icons/cancel';
import {useState} from 'react'
import DeleteStockList from './deleteStockList';
import {NavLink} from 'react-router-dom'

function TableRow (props){
  const [deleteStockList,setDeleteStockList] = useState(false)
 
 
  const onDelete = () => {
    setDeleteStockList(!deleteStockList)
}
   const {rowData} =props;
   const displayRow = rowData.map(eachRow=>{
    return (
     <div  className="tableRow"  key={eachRow.stocks_id} > 
       <NavLink to="/business/stocks/stocklist"  style={{textDecoration:"none"}}>  <div  className="actual_data" key={eachRow.id} onClick={()=>{localStorage.setItem('Stock_List_ID',eachRow.id)}}> 

        <div className='stock_id'>{eachRow.id}</div>
        <div className='qty'>{eachRow.total_quantity}</div>
        <div className='stock'>{eachRow.total_buying_price}</div>
         <div className='date'>{eachRow.created_on}</div>
         </div></NavLink>
        { props.showEdit ?
         <div className='close' onClick={onDelete} ><SVGclose fill='red'/> 
         {deleteStockList ? 
            <div className='pop'>
                <DeleteStockList onClick={onDelete}  id={eachRow.stocks_id}/>
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

export default TableRow;