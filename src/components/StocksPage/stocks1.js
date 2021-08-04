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



const StockListPage = () => {
    const [showsidenavbar,setShowSideNavBar] = useState(false)
    const [showEdit,setShowEdit] = useState(false)
    
   
   
 

    

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
               <div className='adderForMobStocks' onClick={onClickAdd}><AddButton/> </div>
                 : null}
           <div className="mobile_stockList"> 
             <TableHead/>
             <TableRow rowData={[{stock_id:23342,qty:24,total_price:43,date:'21-09-2020'}]}/>
           </div>


          
            
        
        </div>
        
    )
}

export default StockListPage
