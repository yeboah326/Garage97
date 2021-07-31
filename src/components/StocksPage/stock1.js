import React,{useState} from 'react'
import AddButton from '../ProductDashboard/AddButton'
import SideNavBar from '../ProductDashboard/SideNavBar'
import AddStocks from './addStocks'
import TableHead from './tableHead'
import TableRow from './tableRow'
import Tfooter from "./tfooter"
// import  {useRef } from 'react'

function Stocks1() {
const [rows,addRows] = useState([])
const [addstock,setAddStock] = useState(false)

const stockList=(Rows)=>{ 
    addRows([...rows, Rows])
}

    




    return (
        <div className="stocks-body">
        <div className="sidebar"> <SideNavBar/> </div>

        <div className="table-div"   > 
        <h1>Stocks</h1>
        < TableHead />
        <TableRow rows={rows}/>
        <Tfooter/>
        </div>
        <div  className='adder'  onClick={()=>setAddStock(!addstock)} > 
        <AddButton />
         
        </div>
        
        <AddStocks trigger={addstock} setAddStock={setAddStock} />

        

</div>

)

    
}

export default Stocks1
