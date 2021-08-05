import React from 'react'
import Button from '../Button'
import { logout } from '../../auth'


const DeleteStockList = ({onClick,id,fetchData}) => {
    const token = JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH_KEY'))

    const deleteproduct = async () => {
        const response = await fetch(`http://localhost:9000/product/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            }
        })
        const res = await response.json
        if(response.status === 401){
            logout()
            alert('Session has expired')
        }
        if(response.status === 200){
          fetchData()   
        }
        else{
            alert(res.message)
        }
        onClick()
    }

    return (
        <div className="pop">
            <p>Delete product</p>
            <span>Are you sure you want to delete?</span>
            <div><Button name="Cancel" color="#243475" toggle={onClick}/><Button name="Delete"color="red" toggle={deleteproduct}/></div>
        </div>
    )
}

export default DeleteStockList