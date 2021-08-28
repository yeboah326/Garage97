import React from 'react'
import Input from '../Input'
import {Link,Redirect} from 'react-router-dom'
import {useState} from 'react'
import {login,useAuth} from '../../auth/index'
import Button from '../Button'
import SvgBack from '../../Assets/icons/Back'



const LoginForm = () => {
    const [details,setDetails] = useState({'email':'','password':''})
    const [logged] = useAuth() 
    
    
    const fetchUser = async (user_id)=> {
        const response = await fetch(`http://localhost:9000/users/${user_id}`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        })
        const res = await response.json()
        console.log(res)
        localStorage.setItem('User',JSON.stringify(res))
        console.log(localStorage.getItem('User'))
    }
    const onSubmitClick = async (e) => {
        e.preventDefault()
        const data = {
            "email":details['email'],
            "password":details['password']
        }
        const response = await fetch('http://localhost:9000/users/login',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(data)
        })
        const res = await response.json()
        if(res.token){
           fetchUser(res.public_id)
           login(res.token)
        }
        // if(response.status === 200){
        //     alert('User successfully Logged in')
        // }
        else{
            alert(res.message)
        }
        
    }
    const handleChange = (event) => {
        const {name,value} = event.target
        setDetails(prevDetails => ({
            ...prevDetails,[name]:value
        }))
    }
    
    return (
        !logged ?
        <section className="Form">
        <div className="container">
    
          <div className="row ">
    
            <div className="col-lg-5 slider">
              <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel" data-interval="1000">
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <h2>Control Your Business from anywhere </h2>
                    <img className="car-images" src="../images/phone.png" alt=""/>
                  </div>
                  <div className="carousel-item">
                    <h2 >Manage Your Stock And Products Easily</h2>
                    <img className="car-images" src="../images/stock.png" alt=""/>
                  </div>
                  <div className="carousel-item">
                    <h2>Free to Use. No Payments Required!!!</h2>
                    <img className="car-images" src="../images/free.png" alt=""/>
                  </div>
                </div>
              </div>
              <p className="car-header">SIMA is here for you</p>
            </div>
    
    
    
            <div className="col-lg-7 fillings">
              <h1 className="form-row">Login</h1>
              <h4 className="form-row">Welcome back! Login into your account</h4>
              <form className="" action="index.html" method="post">
                <div className="form-row">
                  <div className="col-lg-7">
                    <input type="email" placeholder="example@gmail.com" className="form-control"/>
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-lg-7">
                    <input type="password" placeholder="********" className="form-control"/>
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-lg-7">
                    <button type="button" className="btn btn-dark btn-lg button">Login</button>
                  </div>
                </div>
                <a className="form-row link" href="#">Forgot Password?</a>
                <p className="form-row ">Don't have an accound ? <a className="link" href="#">Sign Up Here!</a></p>
              </form>
            </div>
          </div>
        </div>
      </section>
    
        : <Redirect to='/businesses'/>
    )
}

export default LoginForm
