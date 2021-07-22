import React from 'react'

const Revenue = ({revenue,date,percentage,increase}) => {
    return (
        <div className='revenue'>
            <div className='revenue-amount'>
                <span>{revenue}</span>
                <span className='currency'>GHC</span>
            </div>
            
            <span>{date}</span>
            <span className={increase}>{percentage}</span>
        </div>
    )
}

export default Revenue
