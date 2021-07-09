import React from 'react'
import Input from './Input'
import Logo from './Logo'
import {Link} from 'react-router-dom'
import {useState} from 'react'
// import SubmitButton from './SubmitButton'

const LoginForm = () => {
    const [details,setDetails] = useState({'email':'','password':''})

    const onSubmitClick = async (e) => {
        e.preventDefault()
        const data = {
            "username":details['email'],
            "password":details['password']
        }
        console.log(data)
        const response = await fetch('http://localhost:9000/users/login',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin':'*'
            },
            body: JSON.stringify(data)
        })
        const res = response.json()
        console.log(res)
        if(response.status === 200){
            alert('User successfully Logged in')
        }
        else{
            throw new Error(`Request failed:${response.status}`)
        }
        
    }
    const handleChange = (event) => {
        const {name,value} = event.target
        setDetails(prevDetails => ({
            ...prevDetails,[name]:value
        }))
    }
    
    return (
        <div className='container'>
            <Logo/>
            <div className="d-flex login-form">
            <form onSubmit={onSubmitClick}>
                <Input type="email" name='email' required="true" onChange={handleChange} label="Email"/>
                <Input type="password" name='password'required="true" onChange={handleChange} label="Password"/>
                <p  className="forgot-pass"><Link className="forgot-pass-link">Forgot password?</Link></p>
                <input type="submit" id="login" value="Login"/>
                < Link to="/register" className="sign-up-link">Not registered? Sign Up </Link>
            </form>

        </div>
        </div>
    )
}

export default LoginForm
