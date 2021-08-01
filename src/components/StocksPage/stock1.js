import React,{useEffect, useState} from 'react'
import AddButton from '../ProductDashboard/AddButton'
import SideNavBar from '../ProductDashboard/SideNavBar'
import AddStocks from './addStocks'
import TableHead from './tableHead'
import TableRow from './tableRow'
import Tfooter from "./tfooter"
// import  {useRef } from 'react'

function Stocks1() {
const [addstock,setAddStock] = useState(false)
const [stocklist,setStockList] = useState([])
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
    setStockList(res.business_stock_lists)
    console.log(stocklist)
  }

  useEffect(()=>{
      fetchStockList()
  },[])
    




    return (
        <div className="stocks-body">
        <div className="sidebar"> <SideNavBar/> </div>

        <div className="table-div"   > 
        <h1>Stocks</h1>
        < TableHead />
        <TableRow rows={stocklist}/>
        <Tfooter/>
        </div>
        <div  className='adder'  onClick={()=>setAddStock(!addstock)} > 
        <AddButton />
         
        </div>
        
        <AddStocks trigger={addstock} setAddSale={setAddStock} />

        

</div>

)

    
}

export default Stocks1
