import React from 'react'

function TableSales (rows){
 

   const displayRow = ()=>rows.map(eachRow=>{
    return (
      <div  className="tableRow" key={eachRow.sale_id}> 
        <div className='stock_id'>{eachRow.sale_id}</div>
        <div className='qty'>{eachRow.qty}</div>
        <div className='total_price'>{eachRow.total_price}</div>
        <div className='date'>{eachRow.date}</div>

      </div>
      
    )
   })

   return (
     <div className="table">{displayRow}</div>
   )

   
}

export default TableSales;