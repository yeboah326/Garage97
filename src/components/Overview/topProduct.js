import React from 'react'

const TopProduct =({name,units_bought,amount}) =>{
    return (
        <div className='actual-selling-product'>
            <span className="top-product-name">{name}</span>
            <div className='NUMBERS'>
            <span className="top-product-units">{units_bought}units</span>
            <span className="top-product-amount">GHC {amount}</span>
            </div>

        </div>
    )
}
export default TopProduct
