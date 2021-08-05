import React,{useEffect, useState} from 'react'
import SvgMenu from '../../Assets/icons/Menu'
import SvgDone from '../../Assets/icons/Done'
import SvgAdd from '../../Assets/icons/Add'
import Input from '../Input'
import '../../css/addsales.css'
import SvgClose from '../../Assets/icons/Close'
import SideNavBar from '../ProductDashboard/SideNavBar'
import SideNavBar2 from '../ProductDashboard/SideNavBar2'
import { business_id } from '../BusinessesDashboard/Businesses'
import { logout } from '../../auth'


const AddSales = () => {
    const [showsidenavbar,setShowSideNavBar] = useState(false)
    const [showfullsidenavbar,setShowFullSideNavBar] = useState(false)
    const [navwidth,setWidth] = useState(false)
    let width = navwidth ? '220px' : '100px'
    const [salelist,setSaleList] = useState([])
    const [sale,setSale] = useState({customer_name:'',customer_contact:'',product_id:'',quantity:'',selling_price:'',product:''})
    const [products,setProducts] = useState([])
    const token = JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH_KEY'))

    const onHover = () => {
        setShowFullSideNavBar(!showfullsidenavbar)
        setWidth(!navwidth)
    }

    const handleChange = (event) => {
        const {name,value} = event.target
        setSale(prevDetails => ({
            ...prevDetails,[name]:value
        }))
    }

    const getProductId = () => {
        let val = document.getElementById('product_id').value
        for(let x=0 ; x<products.length;x++){
            if(val === products[x].name){
                setSale(prevDetails => ({
                    ...prevDetails,'product_id':products[x].product_id,'product':val
                }))
            }
        }
    }
    const onAdd = () => {
        setSaleList([...salelist,sale])
    }
    const onClickMenu = () => {
        setShowSideNavBar(!showsidenavbar)
        console.log(salelist)
    }
    const onClickClose = () => {
        setShowSideNavBar(!showsidenavbar)
    }
    const onDelete = (event) => {
        let id = event.target.id
        for(let x = 0;x<salelist.length;x++){
            if(salelist[x].product_id === id){
                salelist.splice(x,1)
            }
        }
    }
    const fetchProducts = async () => {
        const response = await fetch(`http://localhost:9000/business/5/product`,{
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
        else if(response.status === 200){
            setProducts(res)
            console.log(res)
        }
        else{
            alert(res.message)
        }
    }

    const postSaleList = async () =>{
        const data = {'sale_list':salelist,'customer_details':{'customer_name':salelist[0].customer_name,'customer_contact':salelist[0].customer_contact},'business_id':'5'}
        const response = await fetch('http://localhost:9000/sale/list',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
            body:JSON.stringify(data)
        })
        const res = await response.json()
        if(response.status === 201){
            alert(res.message)
        }
        else{
            alert('Could not add new sale')
        }
    }

    useEffect(()=>{
        fetchProducts()
    },[])

    return (
    <div className='add-sale-container'>
        {showsidenavbar ?
            <div className='side-nav-page'>
                <SideNavBar onClick={onClickClose}/>
            </div> :
            null
        }
        <div className='add-sale'>
            <header>
                <div className='menu' onClick={onClickMenu}><SvgMenu fill='#6842ff'/></div>
                <div className='done' onClick={postSaleList}><SvgDone fill='#6842ff' stroke='#6842ff'/></div>
            </header>
            <div className='desktop-side-nav-bar' style={{width:width}}>
             {!showfullsidenavbar? <SideNavBar2 onHover={onHover} navwidth='100px'/> : <SideNavBar onHover={onHover} navwidth='220px'/>}
            </div>
            <main>
                <div className='head'>
                    <span>Add new sale</span>
                    <div className='addbutton' onClick={onAdd}><SvgAdd fill='#9c89e7'/></div>
                    
                </div>
                <div className='stock-input-form'>
                    <div className='stock-form'>
                        <div>
                            <label for='product'>Product</label>
                            <input type='list' id='product_id' name='product_id' list='product' onChange={()=>{getProductId()}}></input>
                            <datalist id='product'>
                                {products.map(product=>{
                                    return(
                                        <option value={product.name}>{product.name}</option>
                                    )
                                })}
                            </datalist>
                        </div>
                        <Input label='Quantity' required='required' type='text' name='quantity'onChange={handleChange}/>
                        <Input label='Unit Price' required='required' type='text' name='selling_price'onChange={handleChange}/>
                        <div className='addbutton' onClick={onAdd}><SvgAdd fill='#9c89e7'/></div>
                    </div>
                    <div className='customer-input-form'>
                        <Input label='Customer Name' type='text' name='customer_name'onChange={handleChange}/>
                        <Input label='Customer Contact' type='text' name='customer_contact'onChange={handleChange}/>
                    </div>
                </div>
                <div className='stock-product-list'>
                    <div className='table-head'>
                        <span className='product'>Product</span>
                        <span className='quantity'>Quantity</span>
                        <span className='price'>Unit Price</span>
                    </div>
                    <div className='table-body'>
                        {
                            salelist.map(sale=>{
                                return(
                                    <div className='sale-list-item'>
                                        <div className='sale'>
                                            <span className='product'>{sale.product}</span>
                                            <span className='quantity'>{sale.quantity}</span>
                                            <span className='price'>{sale.selling_price}</span>
                                        </div>
                                        <div className='close' onClick={onDelete} id={sale.product_id}><SvgClose fill='#E6B0B0'/></div>
                                    </div>
                                
                                )
                            })
                        }
                    </div>

                </div>
            </main>
            <div className='done desktop-done' onClick={postSaleList}><SvgDone fill='#6842ff' stroke='#6842ff'/></div>
        </div>
    </div>
    )
}

export default AddSales 
