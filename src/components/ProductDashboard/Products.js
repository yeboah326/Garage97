import React,{useEffect} from 'react'
import Product from './Product'




const Products = ({products,fetchData,onDelete,onAdd,getId}) => {




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
                <div className="no-business" onClick={onAdd}>
                    <p>No products added yet? Click to add product</p>
                </div> :
                <div className="businesses">
                    {products.map(product => {
                        return(
                        <Product name={product.name} description={product.description} showDelete={()=>{showDelete(product.id)}} id={product.id}/>
                        )
                        })
            }
            </div>
            }
        </div> 
        
        
    )
} 


export default Products
