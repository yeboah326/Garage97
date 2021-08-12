import React,{useEffect, useState} from 'react'
import SvgMenu from '../../Assets/icons/Menu'
import SvgDone from '../../Assets/icons/Done'
import SvgAdd from '../../Assets/icons/Add'
import Input from '../Input'
import '../../css/addsales.css'
import SvgClose from '../../Assets/icons/Close'
import SideNavBar from '../ProductDashboard/SideNavBar'
import SideNavBar2 from '../ProductDashboard/SideNavBar2'
import { logout } from '../../auth'
import SalesHead from './SalesHead2'
import TableSales from './tableSales2'
import {Redirect} from 'react-router-dom'


const EditSaleList = () => {
    const [showsidenavbar,setShowSideNavBar] = useState(false)
    const [showfullsidenavbar,setShowFullSideNavBar] = useState(false)
    const [navwidth,setWidth] = useState(false)
    let width = navwidth ? '220px' : '100px'
    const [salelist,setSaleList] = useState([])
    const [newsalelist,setNewSaleList] = useState([])
    const [displayInput,setDisplayInput] = useState(false)
    const sale_list_id = localStorage.getItem('Sale_List_ID')
    const [updatedSale,setUpdatedSale] = useState({quantity:'',buying_price:''})
    const [sale,setSale] = useState({customer_name:'',customer_contact:'',product_id:'',quantity:'',selling_price:'',product:''})
    const [products,setProducts] = useState([])
    const [toggle,setToggle] = useState(false)
    const token = JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH_KEY'))
    const business_id = localStorage.getItem('Business')


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

    const handleUpdateChange = (event) => {
        const {name,value} = event.target
        setUpdatedSale(prevDetails => ({
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
        if(sale.customer_contact === '' || sale.customer_name === '' || sale.quantity === '' || sale.product === '' || sale.selling_price === ''){
            alert("Sale could not be added.Input is empty")
        }
        else{
            setSaleList([...salelist,sale])
            setNewSaleList([...newsalelist,sale])
        }
        
    }
    const onEditSale = () => {
        setDisplayInput(true)
    }
    const onClickMenu = () => {
        setShowSideNavBar(!showsidenavbar)
        console.log(salelist)
    }
    const onClickClose = () => {
        setShowSideNavBar(!showsidenavbar)
    }
    const onDelete = (event) => {
        const id = event.target.id
        const data = salelist[id]
        if (newsalelist.includes(data)){
            const data_id = newsalelist.indexOf(data)
            newsalelist.splice(data_id,1)
            setNewSaleList([...newsalelist])
            salelist.splice(id,1)
            setSaleList([...salelist])
            
        }
        else{
            const response = deleteSale(salelist[id].id)
            if (response === 1){
                salelist.splice(id,1)
                setSaleList([...salelist])
            }
            else{
                alert('Could not delete sale')
            }
        
    }
    }
    const deleteSaleList = async () => {
        const response = await fetch(`http://localhost:9000/sale/list/${sale_list_id}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            }
        })
        if (response.status === 401){
            logout()
            alert('Session has expired')
        }
        else if(response.status === 200){
            alert('SaleList deleted successfully')
            setToggle(!toggle)
        }
        else{
            alert('Could not delete stocklist')
        }
        
    }
    const updateStock = async (id,index) => {
        const response = await fetch(`http://localhost:9000/stock/${id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
            body: JSON.stringify(updatedSale)
        })
        if (response.status === 401){
            logout()
            alert('Session has expired')
        }
        else if(response.status === 200){
            salelist[index] = {...salelist[index],quantity:updatedSale.quantity,buying_price:updatedSale.buying_price} 
        }
        else{
            alert("Could not updated sale")
        }
        setDisplayInput(false)
    }
    const deleteSale = async (id) => {
        const response = await fetch(`http://localhost:9000/sale/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            }
        })
        if (response.status === 401){
            logout()
            alert('Session has expired')
        }
        else {
            return 1
        }
    }


    const fetchProducts = async () => {
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
        else if(response.status === 200){
            setProducts(res)
        }
        else{
            alert(res.message)
        }
    }
    const fetchSales = async () => {
        const response = await fetch(`http://localhost:9000/sale/sale_list/${sale_list_id}`,{
            method:'GET',
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
            setSaleList(res)
        }
        else{
            alert(res.message)
        }
    }

    const UpdateSaleList = async () =>{
        const data = {'sale_list':newsalelist,'business_id':`${business_id}`}
        const response = await fetch('http://localhost:9000/sale/new',{
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
        else if (response.status === 400){
            alert(res.message)
        }
        else{
            alert('Could not add new stock')
        }
        setToggle(!toggle)
    }
    
    useEffect(()=>{
        fetchSales()
        fetchProducts()
    },[])
    

    return (
        <>{ !toggle ?
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
                <div className='done' onClick={UpdateSaleList}><SvgDone fill='#6842ff' stroke='#6842ff'/></div>
                <div className='delete' onClick={deleteSaleList}><SvgClose fill='#E6B0B0' /></div>
            </header>
            <div className='desktop-side-nav-bar' style={{width:width}}>
             {!showfullsidenavbar? <SideNavBar2 onHover={onHover} navwidth='100px'/> : <SideNavBar onHover={onHover} navwidth='220px'/>}
            </div>
            <main>
                <div className='head'>
                    <span>Edit SaleList</span>
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
                        <Input label='Quantity' required='required' type='number' step='1' min='0' name='quantity'onChange={handleChange}/>
                        <Input label='Unit Price' required='required' type='number' min='0.00' step='0.1' name='selling_price'onChange={handleChange}/>
                        <div className='addbutton' onClick={onAdd}><SvgAdd fill='#9c89e7'/></div>
                    </div>
                    <div className='customer-input-form'>
                        <Input label='Customer Name' required='required' type='text' name='customer_name' onChange={handleChange}/>
                        <Input label='Customer Contact' required='required' type='tel' name='customer_contact' onChange={handleChange}/>
                        
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
                                        <div className='sale' onClick={onEditSale}>
                                            <span className='product'>{sale.product}</span>
                                            <span className='quantity'style={{display: !displayInput ? 'inline-block':'none'}}>{sale.quantity}</span>
                                            <input className='quantity' style={{display:displayInput ? 'inline-block' : 'none'}} defaultValue={sale.quantity} name='quantity' onChange={handleUpdateChange}/>
                                            <span className='price' style={{display: !displayInput ? 'inline-block':'none'}}>{sale.selling_price}</span>
                                            <input className='price' style={{display:displayInput ? 'inline-block' : 'none'}} defaultValue={sale.selling_price} name='buying_price' onChange={handleUpdateChange}/>
                                        </div>
                                        <div className='close' onClick={!displayInput ? onDelete : ()=>{updateStock(sale.id,salelist.indexOf(sale))}} id={salelist.indexOf(sale)}>{!displayInput ? <SvgClose fill='#E6B0B0' id={salelist.indexOf(sale)}/> : <SvgDone fill='#6842ff' stroke='#6842ff'/>}</div>
                                    </div>
                                
                                )
                            })
                        }
                    </div>
                    </div>

            </main>
            <div className='done desktop-done' onClick={UpdateSaleList}><SvgDone fill='#6842ff' stroke='#6842ff'/></div>
            <div className='done desktop-done' onClick={deleteSaleList}><SvgClose fill='#E6B0B0' /></div>
        </div>
    </div>:
    <Redirect to='/business/sales/salelist'/>
    }
    </>
    )
}
}
export default EditSaleList 
