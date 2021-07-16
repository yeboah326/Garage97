import React, { useState } from 'react'
import Business from './Business'
import AddButton from './AddButton'
import AddBusiness from './AddBusiness'
import { logout } from '../../auth/index'



const Businesses = () => {
    const [addbusiness,setAddBusiness] = useState(false)
    const [business,setBusiness] = useState()
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
        setBusiness(res)
        console.log(business)
        if (response.status === 401){
            logout()
            alert('Session has expired')
        }
    }



    const description = "Production and distribution of genetically modified Kako across the 16 regions of Ghana."
    return (
        addbusiness ? <AddBusiness/> :
        <div className="business-section">
            <div className="businesses">
                <Business name="Kako Inc" description={description}/>
                <Business name="Kako Inc" description={description}/>
                <Business name="Kako Inc" description={description}/>
                <Business name="Kako Inc" description={description}/>
                <Business name="Kako Inc" description={description}/>
                <Business name="Kako Inc" description={description}/>
                <Business name="Kako Inc" description={description}/>
                <Business name="Kako Inc" description={description}/>
                <Business name="Kako Inc" description={description}/>
                <Business name="Kako Inc" description={description}/>
            </div>
            <div className="addButtonSection" onClick={fetchData}>
                <AddButton/>
            </div>
        </div>
        
    )
}

export default Businesses
