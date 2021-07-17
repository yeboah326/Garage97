import React from 'react'
import { logout } from '../../auth'
import Button from '../Button'

const DeleteBusiness = ({onClick,id,businesses}) => {
    const token = JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH_KEY'))

    const deletebusiness = async () => {
        const response = await fetch(`http://localhost:9000/business/${id}`,{
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
            for(var a = 0; a <businesses.length;a++){
                if(businesses[a].id === id){
                    businesses.splice(a,1)
                }
            }
            
        }
        else{
            alert(res.message)
        }
        onClick()
    }

    return (
        <div className="delete-product">
            <p>Delete business</p>
            <span>Are you sure you want to delete Kako Inc?</span>
            <div><Button name="Cancel" color="#243475" toggle={onClick}/><Button name="Delete"color="red" toggle={deletebusiness}/></div>
        </div>
    )
}

export default DeleteBusiness
