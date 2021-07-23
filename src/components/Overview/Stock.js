import React from 'react'

const Stock = ({name,remaining}) => {
    return (
        <div className='actual-low-stock'>
            <span className='low-stock-name'>{name}</span>
            <span className='low-stock-number'>{remaining}</span>
        </div>
    )
}

export default Stock
