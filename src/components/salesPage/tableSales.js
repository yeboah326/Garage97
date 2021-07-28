import React from 'react'

function TableSales (props){
 

   const {rowData} =props;
   const displayRow = rowData.map(eachRow=>{
    return (
      <div  className="tableRow" key={eachRow.sale_id}> 
        <div className='sale_id'>{eachRow.sale_id}</div>
        <div className='sale'>{eachRow.sale}</div>
        <div className='qty'>{eachRow.qty}</div>
        <div className='date'>{eachRow.date}</div>

      </div>
      
    )
   })

   return (
     <div className="table">{displayRow}</div>
   )

   
}

export default TableSales;