import Input from '../Input'
import { login, useAuth } from '../../auth'
import {useState} from 'react'
import {Link,Redirect} from 'react-router-dom'
import Button from '../Button'
import SvgBack from '../../Assets/icons/Back'


const RegistrationForm = () => {
    const [user,setUser] = useState({"name":"","email":"","password":"","confirm-password":""})
    const [userCreated,setUserCreated] = useState(false)
    const [logged] = useAuth()

    const handleChange = (event) => {
        const {name,value} = event.target
        setUser(prevUser => ({
            ...prevUser, [name]:value
        }))
    }

    const fetchUser = async (user_id)=> {
        const response = await fetch(`http://localhost:9000/users/${user_id}`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        })
        const res = await response.json()
        localStorage.setItem('User',JSON.stringify(res))
    }

    const Login = async () => {
        const details = {
            'email': user['email'],
            'password': user['password']
        }
        const response = await fetch('http://localhost:9000/users/login',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(details)
        })
        const res = await response.json()
        if (res.token){
            fetchUser(res.public_id)
            login(res.token)
        }
        setUser({'name':'','email':'','password':'',"confirm-password":''})
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            if(user['password'] === user['confirm-password']){
            await createUser()
            Login()
            setUserCreated(true)
            alert('Your registration was successfully submitted!')
            
            
        }
            else{
            alert('Passwords do not match')
        }}
        catch(e){
            alert(`Registration failed! ${e.message}`)
        }
        
    }

    const createUser = async () => {
        const data = {
                "name": user.name,
                "email": user.email,
                "password": user.password
            }
        const response = await fetch('http://localhost:9000/users',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        })
        
        if(response.status !== 201){
            throw new Error(`Request failed:${response.status}`)
        }
    }
            
      
    return (
        userCreated && logged ? <Redirect to='/businesses'/>:
       
        <section id="main" >
    <div className="container " >
      <div className="row">
        <div className="col-lg-7 details">
          <h1>Sign Up</h1>
          <p>Sign into your account</p>
          <form className="" action="index.html" method="post">
            <div className="form row filling">
              <div className="col-lg-7">
                <input type="email" placeholder="Email" className="form-control"/>
              </div>
            </div>
            <div className="form row filling">
              <div className="col-lg-7">
                <input type="password" placeholder="********" className="form-control"/>
              </div>
            </div>
            <div className="form row filling">
              <div className="col-lg-7">
                <button type="button" className="btn btn-dark btn-lg loginbutton">sign up</button>
              </div>
            </div>
             <a className="forgot" href="#">Forgot password</a> 
            <p className="end">Already have an account? <a href="#">Login</a></p>
          </form>

        </div>
        <div className="col-lg-5 image">
          <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel" data-interval="1000">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <h2 className="car-header">Control Your Business from anywhere </h2>
                <img className="car-images" src="../images/phone.png" alt=""/>
              </div>
              <div className="carousel-item">
                <h2 className="car-header">Manage Your Stock And Products Easily</h2>
                <img className="car-images" src="../images/stock.png" alt=""/>
              </div>
              <div className="carousel-item">
                <h2 className="car-header">Free to Use. No Payments Required!!!</h2>
                <img className="car-images" src="../images/free.png" alt=""/>
              </div>
            </div>
          </div>
          <p className="car-header">SIMA is here for you</p>
        </div>
      </div>
    </div>
  </section>
    )

}

export default RegistrationForm
