import React from 'react'
import TotalRevenue from './TotalRevenue'
import LowStock from './LowStock'
import WeeklyRevenue from './WeeklyRevenue'
import TopSelling from './TopSelling'

const OverviewPage = () => {
    return (
        <div className='overview'>
            <div className='top-section'>
                <TotalRevenue/>
                <LowStock/>
            </div>
            <div className='middle-section'>
                <WeeklyRevenue/>
            </div>
            <div className='bottom-section'>
                <TopSelling/>
            </div>
            
        </div>
    )
}

export default OverviewPage
