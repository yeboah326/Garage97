import React from 'react'

function TableRow (props){
 

   const {rowData} =props;
   const displayRow = rowData.map(eachRow=>{
    return (
      <div  className="tableRow" key={eachRow.stocks_id}> 
        <div className='stock_id'>{eachRow.stock_id}</div>
        <div className='stock'>{eachRow.stock}</div>
        <div className='qty'>{eachRow.qty}</div>
        <div className='date'>{eachRow.date}</div>

      </div>
    )
   })

   return (
     <div className="table">{displayRow}</div>
   )

   
}

export default TableRow;