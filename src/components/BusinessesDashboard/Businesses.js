import React, { useEffect, useState } from 'react'
import Business from './Business'
import {Redirect} from 'react-router-dom'
import SecureStorage from '../../auth/secure'



const Businesses = ({businesses,fetchData,setBusinessSelect,business_select,onDelete,onAdd,getId}) => {




    const showDelete = (id) =>{
        onDelete()
        getId(id)
    }
    useEffect(()=>{
    fetchData()
    },[])
    // useEffect(()=>{
    //     return ;
    // },[businesses])

    const selectBusiness = (id,name) => {
        setBusinessSelect(true)
        SecureStorage.set('Business',id)
        SecureStorage.set('business_name',name)
    }



    // const description = "Production and distribution of genetically modified Kako across the 16 regions of Ghana."
    return (
        !business_select ?
        <div className="business-section">
            
            {businesses.length === 0 ? 
                <div className="no-business" >
                    <div className='no-business-p' onClick={onAdd}>No businesses added yet? Click to add business</div>
                </div> :
                <div className="businesses">
                    {businesses.map(business => {
                        return(
                        <Business name={business.name} description={business.description} showDelete={()=>{showDelete(business.id)}} id={business.id} onClick={()=>{selectBusiness(business.id,business.name)}}/>
                        )
                        })
                    }
            </div>
            }
        </div> :
        <Redirect to='/business/overview'/>
        
        
    )
}

export default Businesses
