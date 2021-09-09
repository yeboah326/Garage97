import React from 'react'
import TopProduct from './topProduct'

const TopSelling = () => {
    return (
        <div className='top-selling'>
            <p className='top-selling-header'>Top Selling Products</p>
             <p className='selling-products'>
            <TopProduct name='kako moses'  units_bought='34' amount='500'/>
             <TopProduct name='kako moses' amount='500' units_bought='34'/>
             <TopProduct name='kako moses' amount='500' units_bought='34'/>
             <TopProduct name='kako moses' amount='500' units_bought='34'/>
             </p>

        </div>
    )
}

export default TopSelling
