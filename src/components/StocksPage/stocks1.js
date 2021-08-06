import React, { useState,useEffect } from 'react'
import SvgMenu from '../../Assets/icons/Menu'
import '../../css/business.css'
import {logout} from '../../auth/index'
import { business_id } from '../BusinessesDashboard/Businesses'
import SVGpencil from '../../Assets/icons/pencil'
import TableHead from './tableHead'
import SideNavBar from '../ProductDashboard/SideNavBar'
import TableRow from './tableRow'
import AddButton from '../ProductDashboard/AddButton'
import AddStocks from './AddStocks'



const StockListPage = () => {
    const [showsidenavbar,setShowSideNavBar] = useState(false)
    const [showEdit,setShowEdit] = useState(false)
    const [addstockList,setAddStockList] = useState(false)
    const [stocklist,setStockList] = useState([])
   


   
   
 

    
   
    const onClickMenu = () => {
        setShowSideNavBar(!showsidenavbar)
    }
    const onClickClose = () => {
        setShowSideNavBar(!showsidenavbar)
    }
    const onClickEdit = () => {
        setShowEdit(!showEdit)
    }
    const onClickAdd = ()=>{
        setAddStockList(!addstockList)
    }
   

    return (
        <div className='stockListPage'>
         {showsidenavbar ?
            <div className='side-nav-page'>
                <SideNavBar onClick={onClickClose}/>
            </div> :
            null
            }
           <div className='left-stuck' onClick={onClickMenu}><SvgMenu fill='#6842ff'/></div>  
           <div className='edit_stockList' onClick={onClickEdit}><button ><SVGpencil fill="#6842ff"/></button></div>  
               {showEdit ? 
               <div className='adderForMobStocks' onClick={onClickAdd}  >
                   <AddButton /> 
                   {addstockList ?
                      <AddStocks trigger={addstockList} setAddStockList={()=>{setAddStockList(!addstockList)}}/>   : null
                }
                   </div>
                 : null}
           <div className="mobile_stockList"> 
             <TableHead/>
             <TableRow rowData={[{stock_id:23342,qty:24,total_price:43,date:'21-09-2020'},
             {stock_id:2332,qty:24,total_price:43,date:'21-09-2020'}]}  showEdit={showEdit}/>
           </div>


          
            
        
        </div>
        
    )
}

export default StockListPage
