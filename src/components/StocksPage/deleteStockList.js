import React from 'react'
import { Redirect } from 'react-router-dom'
import Button from '../Button'



const DeleteStockList = ({onClick,deletestocklist,id}) => {

    return (
        <div className='delete-product'>
            <p>Delete StockList</p>
            <span>Are you sure you want to delete stocklist {id}?</span>
            <div><Button name="Cancel" color="#243475" toggle={onClick}/><Button name="Delete"color="red" toggle={deletestocklist}/></div>
        </div>
    )
}

export default DeleteStockList