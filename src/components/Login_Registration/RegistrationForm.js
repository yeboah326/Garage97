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
        <div className='container-log-reg'>
            <div className='left-section'>
                <div className='button-desktop'><Link to='/'><SvgBack stroke='white' fill='white'/></Link></div>
                <div className='left-section-image'></div>
            </div>
            <div className="register">
            <form className="d-flex register-form" onSubmit={handleSubmit}>
                <div className='button-mobile'><Link to='/'><SvgBack stroke='white' fill='white'/></Link></div>
                <span className='logreg-header'>Sign Up</span>
                <Input label="Name" type="text" name="name" onChange={handleChange} required="true"/>
                <Input label="Email" type="email" name="email" onChange={handleChange} required="true"/>
                <Input label="Password" type="password" name="password" onChange={handleChange} required="true"/>
                <Input label="Confirm Password" type="password" name="confirm-password" onChange={handleChange} required="true"/>
                <div className='log-reg-btns'>
                    <input type="submit" id="sign-up" value="Register" />
                    <Link to="/login" className="log-in">Already have an account?</Link>
                </div>
                
            </form>

        </div>
        </div>
        
    )

}

export default RegistrationForm
