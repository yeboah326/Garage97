import React from 'react'
import Product from './Product'
import AddButton from './AddButton'
import DeleteProduct from './DeleteProduct'
import AddProducts from './AddProducts'
import { useState,useEffect } from 'react'
import { logout } from '../../auth/index'
import {business_id} from '../BusinessesDashboard/Businesses'


const Products = () => {
    const [addproduct,setAddProduct] = useState(false)
    const [deleteproduct,setDeleteProduct] = useState(false)
    const [products,setProducts] = useState([])
    const [id,setID] = useState()
    const token = JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH_KEY'))

    const fetchData = async () => {
        console.log(business_id)
        const response = await fetch(`http://localhost:9000/business/${business_id}/product`,{
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
            setProducts(res)
        }
    }

    useEffect(()=>{
    fetchData()
    },[])
    useEffect(()=>{
        return ;
    },[products])
    

    const onAdd = () => {
        setAddProduct(!addproduct)
    }
    const onDelete = (id) => {
        setDeleteProduct(!deleteproduct)
        setID(id)
        console.log(id)
    }


 
    const description = "Production and distribution of genetically modified Kako across the 16 regions of Ghana."
    return (
        <div className="business-section">
            {addproduct ?
            <div className='popup'>
                <AddProducts toggle={onAdd} products={products} onClick={fetchData}/>
            </div> :
            null
            }
            {deleteproduct ? 
            <div className='popup'>
                <DeleteProduct onClick={()=>{onDelete(id)}} id={id} products={products}/>
            </div> :
            null
            }
            {products.length === 0 ? 
                <div className="no-business" onClick={onAdd}>
                    <p>No products added yet? Click to add product</p>
                </div> :
                <div className="businesses">
                    {products.map(product => {
                        return(
                        <Product name={product.name} description={description} showDelete={()=>{onDelete(product.id)}} id={product.id} />
                        )
                        })
                    }
            
            </div>
            }

            <div className="addButtonSection" onClick={onAdd}>
                <AddButton/>
            </div>
            

        </div> 
    )
}

export default Products
