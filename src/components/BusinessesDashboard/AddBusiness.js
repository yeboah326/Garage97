import React, { useState } from 'react'
import Input from '../Input'
import Button from '../Button'
import { logout} from '../../auth'

const AddBusiness = ({toggle,onClick}) => {
    const [business,setBusiness] = useState({'name':'','description':''})
    const token = JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH_KEY'))

    const onHandleChange = (event) => {
        const {name,value} = event.target
        setBusiness(prevBusiness=>({
            ...prevBusiness,[name]:value
        }))
    }
    const Submit = async () => {
        const newBusiness = business
        const response = await fetch('http://localhost:9000/business',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
            body: JSON.stringify(newBusiness)
        })
        if(response.status === 401){
            logout()
            alert('Session has expired')
        }
        else if(response.status === 201){
                onClick()
        }
        else{
            alert('Could not create business. Try again')
        }
        
        toggle()
    }
    return (
        <div className="add">
            <p>Add Business</p>
            <Input label="Name" name='name' required='required' type="text" onChange={onHandleChange}/>
             <label>Description</label>
             <textarea name='description' onChange={onHandleChange} required></textarea>
             <div className="button-div"><Button name="Add" color="#6842ff" toggle={Submit}/><Button name="Cancel" color="red" toggle={toggle}/></div>
        </div>
    )
}

export default AddBusiness
