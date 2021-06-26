import React from 'react'
import SideNavBar from './SideNavBar'
import Businesses from './Businesses'

const BusinessesDashboard = () => {
    return (
        <div className="business-dashboard">
             <SideNavBar/>
             <Businesses/>
        </div>
    )
}

export default BusinessesDashboard
