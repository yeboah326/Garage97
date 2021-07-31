import React, { useEffect } from 'react'
import Input from '../Input'
import Button from '../Button'
import { useState } from 'react'
import { logout } from '../../auth'

const AddStocks = (props) => {
    const [products,setProducts] = useState([])
    const [stockList,setStockList] = useState([])
    const [stock,setStock] = useState({quantity:null,buying_price:null,product_id:null})
    const token = JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH_KEY'))
    const business_id = JSON.parse(localStorage.getItem('business_id'))

    const onHandleChange = (event) => {
        const {name,value} = event.target
        setStock(prevStock=>({
            ...prevStock,[name]:value
        }))
        
        
    }

    
    

    const onAdd = () => {
        const Stock = stock 
        setStockList([...stockList,Stock])

        setStock({product_name:null, qty:null,buying_price:null})
        alert("Stock added")
       
    }

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
            console.log(res)
        }
    }

    const postStockList = async () => {
        const response = await fetch('http://localhost:9000/stock/list',{
            method: 'POST',
            headers:{
                'Authorization':`Bearer ${token}`,
                'Content-Type':'application/json'
            },
            body:JSON.stringify({"business_id":business_id,"stock_list":stockList})
        })

        const res = await response.json
        if(response.status === 201){
            alert(res.message)
        }
        else{
            alert("Stocks could not be created.Try again")
        }
    }
//    const randomNumber=Math.floor(Math.random()*9000)
  
//    const allStocksBuyingPrices = stockList.map(stock=>{return stock.buying_price} )  //adding up buying prices for total prices
//    const totalPrice = allStocksBuyingPrices.reduce(
//        function(sum,buying_price){return sum + Number(buying_price)},0)

//  const allStocksQuantities = stockList.map(stock=>{return stock.quantity} )   //adding up quantities for stocklist quantity
//  const totalQty = allStocksQuantities.reduce(
//     function(pum,quantity){return pum + Number(quantity)},0)

    const onDone = () => {
        console.log(stockList)
        alert("Done")



        // const time = Date.now()
        // const Rows = {stock_id:randomNumber,qty:totalQty,total_price:totalPrice,date:time}
            //  console.log(Rows)
     // //  toggle()
 
        postStockList()
    }

    useEffect(()=>{
        fetchData()
    },[])
    // const Submit = async () => {
    //     const newProduct = product
    //     const response = await fetch(`http://localhost:9000/business/${business_id}/product`,{
    //         method: 'POST',
    //         headers: {
    //             'Content-Type':'application/json',
    //             'Authorization':`Bearer ${token}`
    //         },
    //         body: JSON.stringify(newProduct)
    //     })
    //     if(response.status === 401){
    //         logout()
    //         alert('Session has expired')
    //     }
    //     else if(response.status === 201){
    //             products.push(newProduct)
    //             onClick()
    //     }
    //     else{
    //         alert('Could not create product. Try again')
    //     }
        
    //     toggle()
    // }


    return (props.trigger) ?
        (
        <div className=" pop form">
        <p>Add new Stock</p>
        <label for='product'>Product</label>
        <select id='product' name='product_id' onChange={onHandleChange} >
            <option selected></option>
            {products.map(product => {
               return (<option value={product.product_id} >{product.name}</option>)
            })}
        </select>
        <Input label='Unit Cost Price (GHC)' required='true' name='buying_price' type='number' onChange={onHandleChange}/>
        <Input label='Quantity' type='number' required='true' name='quantity' onChange={onHandleChange}/>
        <div className="button-div" > <Button name="Add" color="red" toggle={onAdd}/> </div>   
        <div className="button-div" onClick={()=>props.setAddStock(false)}><Button name="Done" color="#273475" toggle={onDone}  /></div>


   </div>):"";
    
    
    
}

export default AddStocks
