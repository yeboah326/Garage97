import React from 'react'
import { useState,useEffect } from 'react'
import {logout} from '../../auth/index'



const CustomerList = () => {
    const [customers,setCustomers] = useState([])
    const business_id = localStorage.getItem('Business')
    const token = JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH_KEY'))
    const lesser = '<'
    const greater = '>'

    const fetchCustomers = async () => {
        const response = await fetch(`http://localhost:9000/business/${business_id}/customers`,{
            method:'GET',
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })

        const res = await response.json()
        if(response.status === 401){
            alert('Session Expired')
            logout()
        }
        else if(response.status === 200){
            setCustomers(res)
        }
        else{
            alert('Could not fetch Customers')
        }
    }

    useEffect(()=>{
        fetchCustomers()
    },[])

    return (
        <div className='customer-list'>
            {customers.length !== 0 ?
            <>
            <div className='customer-head'>Customers</div>
            <div className='customer-body'>
                <div className='customer-details'>
                    <div>Name</div>
                    <div>Contact</div>
                </div>
                {customers.map(customer => {
                    return(
                <div className='customer'>
                    <div className='customer-name'>{customer.customer_name}</div>
                    <div className='customer-contact'>{customer.customer_contact}</div>
                </div>)
                })}
            </div>
            <div className='customer-footer'>
                <span>{lesser}</span>
                <span>1</span>
                <span>{greater}</span>
            </div>
            </> : <div className='no-customers'>No customers exist</div>}
        </div>
        
    )
}

export default CustomerList
