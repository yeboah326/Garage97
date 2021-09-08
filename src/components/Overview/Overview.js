import React from 'react'
import SideNavBar from '../ProductDashboard/SideNavBar'
import SideNavBar2 from '../ProductDashboard/SideNavBar2'
import OverviewPage from './OverviewPage'
import { useState } from 'react'
import SvgMenu from '../../Assets/icons/Menu'



const Overview = () => {
    const [showsidenavbar,setShowSideNavBar] = useState(false)
    const [showfullsidenavbar,setShowFullSideNavBar] = useState(false)
    const onClickMenu = () => {
        setShowSideNavBar(!showsidenavbar)
    }
    const onClickClose = () => {
        setShowSideNavBar(!showsidenavbar)
    }
    const onHover = () => {
        setShowFullSideNavBar(!showfullsidenavbar)
    }

    return (
        <div className="overview-page">
            {showsidenavbar ?
            <div className='side-nav-page'>
                <SideNavBar onClick={onClickClose}/>
            </div> :
            null
            }
           <div className='desktop-side-nav-bar'>
             {!showfullsidenavbar? <SideNavBar2 onHover={onHover}/> : <SideNavBar onHover={onHover}/>}
            </div>
          <OverviewPage/>

   </div>
    )
}

export default Overview
