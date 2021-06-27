import React from 'react'
import Button from './Button'

const DeleteProduct = () => {
    return (
        <div className="delete-product">
            <p>Delete business</p>
            <span>Are you sure you want to delete Kako Inc?</span>
            <div><Button name="Cancel" color="#243475"/><Button name="Delete"color="red"/></div>
        </div>
    )
}

export default DeleteProduct
