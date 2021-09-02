import React, { useEffect, useState } from 'react'
import { logout } from '../../auth'
import Button from '../Button'

const DeleteBusiness = ({onClick,id,fetchData}) => {
    const token = JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH_KEY'))
    const [business_name,setBusinessName] = useState('') 
    
    const fetchBusiness = async () => {
        const response = await fetch(`http://localhost:9000/business/${id}`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            }
        })

        const res = await response.json()
        if(response.status === 401){
            logout()
            alert('Session has expired')
        }
        if(response.status === 200){
            setBusinessName(res.name)
            
        }
        else{
            alert(res.message)
        }
    }

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
            fetchData()
            
        }
        else{
            alert(res.message)
        }
        onClick()
    }
    useEffect(()=>{
        fetchBusiness()
    },[])

    return (
        <div className="delete-product">
            <p>Delete business</p>
            <span>Are you sure you want to delete {business_name}?</span>
            <div><Button name="Cancel" color="#6842ff" toggle={onClick}/><Button name="Delete"color="red" toggle={deletebusiness}/></div>
        </div>
    )
}

export default DeleteBusiness
