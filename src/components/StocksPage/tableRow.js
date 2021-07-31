import React from 'react'

function TableRow (rows){
 

   const displayRow = ()=>rows.map(eachRow=>{
    return (
      <div  className="tableRow" key={eachRow.stocks_id}> 
        <div className='stock_id'>{eachRow.stock_id}</div>
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

export default TableRow;