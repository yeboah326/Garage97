import React, { useEffect, useState } from 'react'
import Business from './Business'
import AddButton from './AddButton'
import AddBusiness from './AddBusiness'
import DeleteBusiness from './DeleteBusiness'
import { logout } from '../../auth/index'



const Businesses = () => {
    const [addbusiness,setAddBusiness] = useState(false)
    const [deletebusiness,setDeleteBusiness] = useState(false)
    const [businesses,setBusinesses] = useState([])
    const [id,setID] = useState()
    const token = JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH_KEY'))

    const fetchData = async () => {
        const response = await fetch('http://localhost:9000/business',{
        method: 'GET',    
        headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            
            }
        })
        const res = await response.json()
        if (response.status === 401){
            logout()
            alert('Session has expired')
        }
        else{
            setBusinesses(res)
        }
    }

    useEffect(()=>{
    fetchData()
    },[])
    useEffect(()=>{
        console.log(businesses)
    },[businesses])

    const onAdd = () => {
        setAddBusiness(!addbusiness)
    }
    const onDelete = (id) => {
        setDeleteBusiness(!deletebusiness)
        setID(id)
    }
   


    const description = "Production and distribution of genetically modified Kako across the 16 regions of Ghana."
    return (
        
        <div className="business-section">
            {addbusiness ?
            <div className='popup'>
                <AddBusiness toggle={onAdd}/>
            </div> :
            null
            }
            {deletebusiness ? 
            <div className='popup'>
                <DeleteBusiness onClick={()=>{onDelete(id)}} id={id}/>
            </div> :
            null
            }
            <div className="businesses">
                {businesses.map(business => {
                    return(
                    <Business name={business.name} description={description} showDelete={()=>{onDelete(business.id)}} id={business.id}/>
                    )
                    })
                }
            </div>
            <div className="addButtonSection" onClick={onAdd}>
                <AddButton/>
            </div>

        </div>
        
    )
}

export default Businesses
