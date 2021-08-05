import React from 'react'
import SVGclose from '../../Assets/icons/cancel';
import {useState} from 'react'
import DeleteStockList from './deleteStockList';

function TableRow (props){
  const [deleteStockList,setDeleteStockList] = useState(false)
 
 
  const onDelete = () => {
    setDeleteStockList(!deleteStockList)
}
   const {rowData} =props;
   const displayRow = rowData.map(eachRow=>{
    return (
      <div  className="tableRow" key={eachRow.stocks_id}> 
        <div  className="actual_data" key={eachRow.stocks_id}> 

        <div className='stock_id'>{eachRow.stock_id}</div>
        <div className='qty'>{eachRow.qty}</div>
        <div className='stock'>{eachRow.total_price}</div>
         <div className='date'>{eachRow.date}</div>
         </div>
        { props.showEdit ?
         <div className='close' onClick={onDelete} ><SVGclose fill='red'/> 
         {deleteStockList ? 
            <div className='popup'>
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