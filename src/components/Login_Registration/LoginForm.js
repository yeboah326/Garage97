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
        <div className='container-log-reg'>
            <div className='left-section'>
            <div className='button-desktop'><Link to='/'><SvgBack stroke='white' fill='white'/></Link></div>
                <div className='left-section-image'></div>
            </div>
            <div className="d-flex login-form">
            <form onSubmit={onSubmitClick}>
            <div className='button-mobile'><Link to='/'><SvgBack stroke='white' fill='white'/></Link></div>
            <span className='logreg-header'>Login</span>
                <Input type="email" name='email' required="true" onChange={handleChange} label="Email"/>
                <Input type="password" name='password'required="true" onChange={handleChange} label="Password"/>
                <p  className="forgot-pass"><Link className="forgot-pass-link">Forgot password?</Link></p>
                <div className='log-reg-btns'>
                    <input type="submit" id="login" value="Login"/>
                    < Link to="/register" className="sign-up-link">Don't have an account?</Link>
                </div>
            </form>

        </div>
        </div>
        : <Redirect to='/businesses'/>
    )
}

export default LoginForm
