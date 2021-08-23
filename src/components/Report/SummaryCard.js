import React from 'react'

const SummaryCard = ({title,value}) => {
    return (
        <div className='summary-card'>
            <div className='summary-card-title'>{title}</div>
            <div className='summary-card-value'>{value}</div>
        </div>
    )
}

export default SummaryCard
