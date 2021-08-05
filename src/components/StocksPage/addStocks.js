import React,{useState,useEffect} from 'react'
import SvgMenu from '../../Assets/icons/Menu'
import SvgDone from '../../Assets/icons/Done'
import SvgAdd from '../../Assets/icons/Add'
import Input from '../Input'
import '../../css/addsales.css'
import SvgClose from '../../Assets/icons/Close'
import SideNavBar from '../ProductDashboard/SideNavBar'
import SideNavBar2 from '../ProductDashboard/SideNavBar2'
import { logout } from '../../auth'
import { business_id } from '../BusinessesDashboard/Businesses'



const AddStocks = () => {
    const [showsidenavbar,setShowSideNavBar] = useState(false)
    const [showfullsidenavbar,setShowFullSideNavBar] = useState(false)
    const [navwidth,setWidth] = useState(false)
    const [products,setProducts] = useState([])
    const [stocklist,setStockList] = useState([])
    const [stock,setStock] = useState({product_id:'',quantity:'',buying_price:'',product:''})
    const token = JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH_KEY'))

    let width = navwidth ? '220px' : '100px'

    const onHover = () => {
        setShowFullSideNavBar(!showfullsidenavbar)
        setWidth(!navwidth)
    }

    const onClickMenu = () => {
        setShowSideNavBar(!showsidenavbar)
        console.log(stocklist)
    }
    const onClickClose = () => {
        setShowSideNavBar(!showsidenavbar)
    }

    const handleChange = (event) => {
        const {name,value} = event.target
        setStock(prevDetails => ({
            ...prevDetails,[name]:value
        }))
    }
    const getProductId = () => {
        let val = document.getElementById('product_id').value
        for(let x=0 ; x<products.length;x++){
            if(val === products[x].name){
                setStock(prevDetails => ({
                    ...prevDetails,'product_id':products[x].product_id,'product':val
                }))
            }
        }
    }
    const onAdd = () => {
        setStockList([...stocklist,stock])
    }
    const onDelete = (event) => {
        let id = event.target.id
        for(let x = 0;x<stocklist.length;x++){
            if(Number.parseInt(id) === stocklist[x].products_id){
                stocklist.splice(x,1)
                console.log(stocklist + ' done')
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

    const postStockList = async () =>{
        const data = {'stock_list':stocklist,'business_id':'5'}
        const response = await fetch('http://localhost:9000/stock/list',{
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
                <div className='done' onClick={postStockList}><SvgDone fill='#6842ff' stroke='#6842ff'/></div>
            </header>
            <div className='desktop-side-nav-bar'style={{width:width}}>
             {!showfullsidenavbar? <SideNavBar2 onHover={onHover}/> : <SideNavBar onHover={onHover}/>}
            </div>
            <main>
                <div className='head'>
                    <span>Add new stock</span>
                    <div className='addbutton' onClick={onAdd}><SvgAdd fill='#9c89e7'/></div>
                    
                </div>
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
                    <Input label='Quantity' required='required' type='text' onChange={handleChange} name='quantity'/>
                    <Input label='Unit Price' required='required' type='text' onChange={handleChange} name='buying_price'/>
                    <div className='addbutton' onClick={onAdd}><SvgAdd fill='#9c89e7'/></div>
                </div>
                <div className='stock-product-list'>
                    <div className='table-head'>
                        <span className='product'>Product</span>
                        <span className='quantity'>Quantity</span>
                        <span className='price'>Unit Price</span>
                    </div>
                    <div className='table-body'>
                        {
                            stocklist.map(stock=>{
                                return(
                                    <div className='sale-list-item'>
                                        <div className='sale'>
                                            <span className='product'>{stock.product}</span>
                                            <span className='quantity'>{stock.quantity}</span>
                                            <span className='price'>{stock.buying_price}</span>
                                        </div>
                                        <div className='close' onClick={onDelete} id={stock.product_id}><SvgClose fill='#E6B0B0' id={stock.product_id}/></div>
                                    </div>
                                
                                )
                            })
                        }
                    </div>

                </div>
            </main>
            <div className='done desktop-done' onClick={postStockList}><SvgDone fill='#6842ff' stroke='#6842ff'/></div>
        </div>
    </div>
    )
}

export default AddStocks 
