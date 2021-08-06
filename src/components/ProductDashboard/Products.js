import React,{useEffect, useState} from 'react'
import Product from './Product'
import DeleteProduct from './DeleteProduct'
import { logout } from '../../auth'




const Products = ({products,fetchData,onAdd,onClick}) => {
    const [deletebusiness,setDeleteBusiness] = useState(false)
    const token = JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH_KEY'))
    const [id,setId] = useState()

    const onDelete = () => {
        setDeleteBusiness(!deletebusiness)
    }

    const deleteproduct = async () => {
        const response = await fetch(`http://localhost:9000/product/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            }
        })
        const res = await response.json
        if(response.status === 401){
            logout()
            alert('Session has expired')
        }
        if(response.status === 200){
          fetchData()   
        }
        else{
            alert(res.message)
        }
        // fetchData()
    }

    useEffect(()=>{
    fetchData()
    },[])
    // useEffect(()=>{
    //     return ;
    // },[businesses])




    // const description = "Production and distribution of genetically modified Kako across the 16 regions of Ghana."
    return (
        <div className="business-section">
            {deletebusiness ? 
            <div className='popup'>
                <DeleteProduct onClick={onDelete} deleteproduct={deleteproduct} />
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
                        <Product name={product.name} description={product.description} showDelete={onDelete} id={product.id} 
                        onClick={onClick} fetchData={fetchData}/>
                        )
                        })
            }
            </div>
            }
        </div> 
        
        
    )
} 


export default Products
