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
      <div  className="tableRow_2" key={eachRow.product_id}> 
        <div  className="actual_data_2" key={eachRow.product_id}> 

        <div className='sale_id'>{eachRow.product}</div>
        <div className='qty'>{eachRow.quantity}</div>
        <div className='total_pice'>{eachRow.buying_price}</div>
         </div>
        { props.showEdit ?
         <div className='close' onClick={onDelete} ><SVGclose fill='red'/> 
         {deleteStockList ? 
            <div className='pop'>
                <DeleteStockList onClick={onDelete}  id={eachRow.product_id}/>
            </div> :
            null
            } 
            </div> : null
        }


      </div>
      
    )
   })

   return (
     <div className="table_2">{displayRow}</div>
   )

   
}

export default TableRow;