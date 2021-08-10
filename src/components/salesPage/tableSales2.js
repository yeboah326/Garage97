import React from 'react'
import SVGclose from '../../Assets/icons/cancel';
import {useState} from 'react'
import DeleteSaleList from './deleteSaleList';

function TableSales (props){
  const [deleteSaleList,setDeleteSaleList] = useState(false)
 
 
  const onDelete = () => {
    setDeleteSaleList(!deleteSaleList)
}
   const {rowData} =props;
   const displayRow = rowData.map(eachRow=>{
    return (
      <div  className="tableRow_2" key={eachRow.product_id}> 
        <div  className="actual_data_2" key={eachRow.product_id}> 

        <div className='sale_id'>{eachRow.product}</div>
        <div className='qty'>{eachRow.quantity}</div>
        <div className='total_pice'>{eachRow.selling_price}</div>
         </div>
        { props.showEdit ?
         <div className='close' onClick={onDelete} ><SVGclose fill='red'/> 
         {deleteSaleList ? 
            <div className='pop'>
                <DeleteSaleList onClick={onDelete}  id={eachRow.product_id}/>
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

export default TableSales;