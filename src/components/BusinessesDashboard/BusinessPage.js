import React from 'react'
import SideNavBar from './SideNavBar'
import Businesses from './Businesses'

const BusinessPage = () => {
    return (
        <div className='container-businesses'>
            <SideNavBar/>
            <Businesses/>
        </div>
    )
}

export default BusinessPage
