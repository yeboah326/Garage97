import React from 'react'
import SVGclose from '../../Assets/icons/cancel';

function TableRow (props){
 

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
         <div className='close'><SVGclose fill='red'/> </div>


      </div>
      
    )
   })

   return (
     <div className="table">{displayRow}</div>
   )

   
}

export default TableRow;