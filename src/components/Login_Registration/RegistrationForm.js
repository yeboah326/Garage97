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
       
<div id='main'>
  <div className="splitscreen">
    <div className="left">
      <div className="right_info">
        <h1>Have Control Over Your business from anywhere with <em>SIMA</em></h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
    </div>
    <div className="right">
      <form>
        <div className="info">
          <h1>Create An Account</h1>
          <p>Make it easier to manage your business. Ready? Sign Up</p>
        </div>
        <section id="inputs">
          <div className="input">
            <label className="label">Name</label><br/>
            <input type="text" name="name"/>
          </div>
          <div className="input">
            <label className="label">Email</label><br/>
            <input type="email" name="email" value="" placeholder="example@gmail.com"/>
          </div>
          <div className="input">
            <label className="label">Password</label><br/>
            <input type="password" name="password" value="" placeholder="********"/>
          </div>
          <div className="input">
            <label className="label">Confrim Password</label><br/>
            <input type="password" name="" value="" placeholder="********"/>
          </div>
          <div className="buttonAndLink">
            <button className="btn btn-dark btn-lg" type="button" name="button">Sign Up</button><br/>
            <a href="#">Already Have an Account?</a>
          </div>
        </section>
      </form>
    </div>
  </div>
  </div>
    )

}

export default RegistrationForm
