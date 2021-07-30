import React, { useEffect, useState } from 'react'
import Business from './Business'
import AddButton from './AddButton'
import AddBusiness from './AddBusiness'
import DeleteBusiness from './DeleteBusiness'
import { logout } from '../../auth/index'
import {Redirect} from 'react-router-dom'





const Businesses = () => {
    const [addbusiness,setAddBusiness] = useState(false)
    const [deletebusiness,setDeleteBusiness] = useState(false)
    const [businesses,setBusinesses] = useState([])
    const [business_select,setBusinessSelect] = useState(false)
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
        return ;
    },[businesses])
    

    const onAdd = () => {
        setAddBusiness(!addbusiness)
    }
    const onDelete = (id) => {
        setDeleteBusiness(!deletebusiness)
        setID(id)
    }
    const selectBusiness = (id) => {
        setBusinessSelect(true)
        localStorage.setItem("business_id",id)
    }



    // const description = "Production and distribution of genetically modified Kako across the 16 regions of Ghana."
    return (
        !business_select ?
        <div className="business-section">
            {addbusiness ?
            <div className='popup'>
                <AddBusiness toggle={onAdd} businesses={businesses} onClick={fetchData}/>
            </div> :
            null
            }
            {deletebusiness ? 
            <div className='popup'>
                <DeleteBusiness onClick={()=>{onDelete(id)}} id={id} fetchData={fetchData}/>
            </div> :
            null
            }
            {businesses.length === 0 ? 
                <div className="no-business" onClick={onAdd}>
                    <p>No businesses added yet? Click to add business</p>
                </div> :
                <div className="businesses">
                    {businesses.map(business => {
                        return(
                        <Business name={business.name} description={business.description} showDelete={()=>{onDelete(business.id)}} id={business.id} onClick={()=>{selectBusiness(business.id)}}/>
                        )
                        })
            }
            </div>
            }

            <div className="addButtonSection" onClick={onAdd}>
                <AddButton/>
            </div>
            

        </div> :
        <Redirect to='/overview'/>
        
        
    )
}

export default Businesses
