import React,{useEffect, useState} from 'react'
import AddButton from '../ProductDashboard/AddButton'
import SideNavBar from '../ProductDashboard/SideNavBar'
import Tfooter from '../StocksPage/tfooter'
import AddSale from './addSales'
import TableSales from './tableSales'
import SalesHead from './SalesHead'


function Sale() {
const [addsale,setAddSale] = useState(false)
const [salelist,setSaleList] = useState([])
const token = JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH_KEY'))
const business_id = JSON.parse(localStorage.getItem('business_id'))



const fetchStockList = async() => {
    const response = await fetch(`http://localhost:9000/business/${business_id}/stock_list`,{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`
      }
    })
    const res = await response.json
    setSaleList(res.business_stock_lists)
    console.log(salelist)
  }

  useEffect(()=>{
      fetchStockList()
  },[])
    




    return (
        <div className="stocks-body">
        <div className="sidebar"> <SideNavBar/> </div>

        <div className="table-div"   > 
        <h1>Stocks</h1>
        <SalesHead />
        <TableSales rows={salelist}/>
        <Tfooter/>
        </div>
        <div  className='adder'  onClick={()=>setAddSale(!addsale)} > 
        <AddButton />
         
        </div>
        
        <AddSale trigger={addsale} setAddSale={setAddSale} />

        

</div>

)

    
}

export default Sale
