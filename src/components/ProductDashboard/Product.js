import React from 'react'
import DeleteButton from './DeleteButton'

const Product = ({name,description,showDelete}) => {
    return (
        <div className="business" >
        <p className='header'><span >{name}</span><DeleteButton onClick={showDelete}/></p>
        <p >{description}</p>
    </div>
    )
}

export default Product
