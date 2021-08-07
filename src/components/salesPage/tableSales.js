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
      <div  className="tableRow" key={eachRow.sale_id}> 
        <div  className="actual_data" key={eachRow.sale_id}> 

        <div className='sale_id'>{eachRow.sale_id}</div>
        <div className='qty'>{eachRow.qty}</div>
        <div className='total_pice'>{eachRow.total_price}</div>
         <div className='date'>{eachRow.date}</div>
         </div>
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