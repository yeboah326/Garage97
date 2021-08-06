import React from 'react'
import DeleteButton from './DeleteButton'
import { logout } from '../../auth'

const Product = ({name,description,showDelete,id}) => {

    return (
        <div className="business" >
        <p className='header'><span >{name}</span><DeleteButton onClick={showDelete} id={id}/></p>
        <p >{description}</p>
    </div>
    )
}

export default Product
