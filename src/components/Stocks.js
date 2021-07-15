import React from 'react'
import AddButton from './ProductDashboard/AddButton'
import SideNavBar from './BusinessesDashboard/SideNavBar'



const Stocks = () => {
    return (
        <div className="stocks-body">
            <div className="sidebar"> <SideNavBar/> </div>
             <div className="table-div"  >
                 <h1>Stocks</h1>
                 <table className="table" >
           
                    
                 <thead><tr>
                 <th>stocks</th>
                    <th>stocks id</th>
                     <th>Qty</th>
                     <th>Date</th>
                 </tr>
                   
                 </thead>
                 <tbody>
                     <tr >
                     <td>stocks</td>
                     <td>stocks id</td>
                     <td>Qty</td>
                     <td>Date</td>
                     </tr>
                     <tr>
                     <td>stocks</td>
                     <td>stocks id</td>
                     <td>Qty</td>
                     <td>Date</td>
                     </tr>
                     <tr>
                     <td>stocks</td>
                     <td>stocks id</td>
                     <td>Qty</td>
                     <td>Date</td>
                     </tr>
                     <tr>
                     <td>stocks</td>
                     <td>stocks id</td>
                     <td>Qty</td>
                     <td>Date</td>
                     </tr>
                     <tr>
                     <td>stocks</td>
                     <td>stocks id</td>
                     <td>Qty</td>
                     <td>Date</td>
                     </tr>
                     <tr>
                     <td>stocks</td>
                     <td>stocks id</td>
                     <td>Qty</td>
                     <td>Date</td>
                     </tr>
                     <tr>
                     <td>stocks</td>
                     <td>stocks id</td>
                     <td>Qty</td>
                     <td>Date</td>
                     </tr>
                     <tr>
                     <td>stocks</td>
                     <td>stocks id</td>
                     <td>Qty</td>
                     <td>Date</td>
                     </tr>
                     <tr>
                     <td>stocks</td>
                     <td>stocks id</td>
                     <td>Qty</td>
                     <td>Date</td>
                     </tr>
                     <tr>
                     <td>stocks</td>
                     <td>stocks id</td>
                     <td>Qty</td>
                     <td>Date</td>
                     </tr>


                 </tbody>
             </table>
             </div>
             <div className="adder"><AddButton/></div>
        </div>
    )
}

export default Stocks
