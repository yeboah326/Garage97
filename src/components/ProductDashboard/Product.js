import React from 'react'
import DeleteButton from './DeleteButton'

const Product = ({name,description,showDelete,id}) => {
    return (
        <div className="business">
            <span onClick={()=>console.log(id)}>{name} <DeleteButton onClick={showDelete}/></span>
            <p>{description}</p>
        </div>
    )
}

export default Product
