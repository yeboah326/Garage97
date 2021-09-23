import React, { useState,useEffect } from 'react'
import SideNavBar from './SideNavBar'
import SideNavBar2 from './SideNavBar2'
import Products from './Products'
import SvgMenu from '../../Assets/icons/Menu'
import AddButton from './AddButton'
import AddProducts from './AddProducts'
import '../../css/business.css'
import {logout} from '../../auth/index'
import DeleteProduct from './DeleteProduct'
import SecureStorage from '../../auth/secure'



const ProductsPage = () => {
    const [showsidenavbar,setShowSideNavBar] = useState(false)
    const [showAdd,setShowAdd] = useState(false)
    const [products,setProducts] = useState([])
    const token = JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH_KEY'))
    const [deleteproduct,setDeleteProduct] = useState(false)
    const [showfullsidenavbar,setShowFullSideNavBar] = useState(false)
    const [id,setId ] = useState('')
    const business = SecureStorage.get('Business')

    const fetchData = async () => {
        const response = await fetch(`http://localhost:9000/business/${business}/product`,{
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

    

    const onClickMenu = () => {
        setShowSideNavBar(!showsidenavbar)
    }
    const onClickClose = () => {
        setShowSideNavBar(!showsidenavbar)
    }
    const onClickAdd = () => {
        setShowAdd(!showAdd)
    }

    const onDelete = () => {
        setDeleteProduct(!deleteproduct)
    } 

    const getId = (id)=>{
        setId(id)
        console.log(id)
    }

    const onHover = () => {
        setShowFullSideNavBar(!showfullsidenavbar)
    }

    return (
        <div className='business-page'>
            {showsidenavbar ?
            <div className='side-nav-page'>
                <SideNavBar onClick={onClickClose}/>
            </div> :
            null
            }
            {deleteproduct ? 
            <div className='popup'>
                <DeleteProduct onClick={onDelete} fetchData={fetchData} id={id}/>
            </div> :
            null
            }
            {
                showAdd ? 
                <div className='popup'>
                    <AddProducts toggle={onClickAdd} fetchData={fetchData}/>
                </div>
                :
                null
            }
            <div className='container-businesses'>
            <header>
                <div className='menu' onClick={onClickMenu}><SvgMenu fill='#6842ff'/></div>
                <div className='mobile-add'><AddButton toggle={onClickAdd}/></div>
               
            </header>
            <div className='desktop-side-nav-bar'>
             {!showfullsidenavbar? <SideNavBar2 onHover={onHover}/> : <SideNavBar onHover={onHover}/>}
            </div>
            <div className='businesses-grid'>
            <Products onAdd={onClickAdd} products={products} fetchData={fetchData} 
            getId={getId} onDelete={onDelete}/>
            <div className='desktop-add'><AddButton toggle={onClickAdd}/></div>
            </div>
            
        </div>
        </div>
        
    )
}

export default ProductsPage
