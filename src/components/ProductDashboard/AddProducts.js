import React from 'react'
import Input from '../Input'
import Button from '../Button'
import { logout } from '../../auth/index'
import { useState } from 'react'


const AddProducts = ({fetchData,toggle}) => {
    const [product,setProduct] = useState({'name':'','description':''})
    const token = JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH_KEY'))
    const business_id = localStorage.getItem('Business')

    const onHandleChange = (event) => {
        const {name,value} = event.target
        setProduct(prevProduct=>({
            ...prevProduct,[name]:value
        }))
    }
    const Submit = async () => {
        const newProduct = product
        const response = await fetch(`http://localhost:9000/business/${business_id}/product`,{
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
            body: JSON.stringify(newProduct)
        })
        if(response.status === 401){
            logout()
            alert('Session has expired')
        }
        else if(response.status === 201){
                fetchData()
        }
        else{
            alert('Could not create product. Try again')
        }
        
        toggle()
    }

    return (
        <div className="add">
             <p>Add new product</p>
            <Input label="Name" type="text" onChange={onHandleChange} required='required' name='name'/>
             <label>Description</label>
             <textarea onChange={onHandleChange} name='description' required></textarea>
             <div className="button-div"><Button name="Add" color="#6842ff" toggle={Submit}/><Button name="Cancel" color="red" toggle={toggle}/></div>

        </div>
    )
}

export default AddProducts
