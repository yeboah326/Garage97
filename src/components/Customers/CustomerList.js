import React from 'react'
import { useState,useEffect } from 'react'
import {logout} from '../../auth/index'
import SecureStorage from '../../auth/secure'



const CustomerList = () => {
    const [customers,setCustomers] = useState([])
    const [page,setPage] = useState(1)
    const [customer_pages,setCustomerPages] = useState()
    const business_id = SecureStorage.get('Business')
    const token = JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH_KEY'))
    const lesser = '<'
    const greater = '>'
    let max_color = (page === customer_pages ? true : false)
    let min_color = (page === 1 ? true : false)
    const items_per_page = Math.floor((0.5 * window.innerHeight) / 35) 

    const fetchCustomers = async () => {
        const response = await fetch(`http://localhost:9000/business/${business_id}/customers?items_per_page=${items_per_page}&page=${page}`,{
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
        console.log(items_per_page)
        console.log(window.innerHeight)
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
                <span onClick={Decrement} className='lesser' style={{color:min_color?'#c0c0c0':'#968ce6'}}>{lesser}</span>
                <span>{page}</span>
                <span onClick={Increment} className='greater' style={{color:max_color?'#c0c0c0':'#968ce6'}}>{greater}</span>
            </div>
            </> : <div className='no-customers'>No customers exist</div>}
        </div>
        
    )
}

export default CustomerList
