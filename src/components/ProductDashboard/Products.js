import React,{useEffect} from 'react'
import Product from './Product'





const Products = ({products,fetchData,onAdd,onClick,getId,onDelete}) => {
    
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




    // const description = "Production and distribution of genetically modified Kako across the 16 regions of Ghana."
    return (
        <div className="business-section">
            {products.length === 0 ? 
                <div className="no-business">
                    <div onClick={onAdd} className='no-business-p'>No products added yet? Click to add product</div>
                </div> :
                <div className="businesses">
                    {products.map(product => {
                        return(
                        <Product name={product.name} description={product.description}  id={product.product_id} 
                        onClick={onClick} fetchData={fetchData} showDelete={()=>{showDelete(product.product_id)}}/>
                        )
                        })
                }
                </div>
            }
        </div> 
        
        
    )
} 


export default Products
