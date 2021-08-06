import React from 'react'
import Button from '../Button'



const DeleteProduct = ({onClick,deleteproduct}) => {
    

    
    return (
        <div className="delete-product">
            <p>Delete product</p>
            <span>Are you sure you want to delete Kako Gragraw?</span>
            <div><Button name="Cancel" color="#243475" toggle={onClick}/><Button name="Delete"color="red" toggle={deleteproduct}/></div>
        </div>
    )
}

export default DeleteProduct
