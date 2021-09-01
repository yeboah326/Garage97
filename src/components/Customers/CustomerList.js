import React from 'react'
import { useState,useEffect } from 'react'
import {logout} from '../../auth/index'



const CustomerList = () => {
    const [customers,setCustomers] = useState([])
    const [page,setPage] = useState(1)
    const [customer_pages,setCustomerPages] = useState()
    const business_id = localStorage.getItem('Business')
    const token = JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH_KEY'))
    const lesser = '<'
    const greater = '>'

    const fetchCustomers = async () => {
        const response = await fetch(`http://localhost:9000/business/${business_id}/customers?items_per_page=9&page=${page}`,{
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
            setCustomers(res.business_customers)
            setCustomerPages(res.business_customer_total_pages)
        }
        else{
            alert('Could not fetch Customers')
        }
    }

    const Increment = () => {
        if(page < customer_pages){
            setPage(page + 1)
        }
    }

    const Decrement = () => {
        if(page !== 1){
            setPage(page - 1)
        }
    }

    useEffect(()=>{
        fetchCustomers()
    },[page])

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
                <span onClick={Decrement} className='lesser'>{lesser}</span>
                <span>{page}</span>
                <span onClick={Increment} className='greater'>{greater}</span>
            </div>
            </> : <div className='no-customers'>No customers exist</div>}
        </div>
        
    )
}

export default CustomerList
