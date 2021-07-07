import Input from './Input'
import BusinessesDashboard from './BusinessesDashboard/BusinessesDashboard'
import Logo from './Logo'

import {useState} from 'react'
import {Link,Redirect} from 'react-router-dom'


const RegistrationForm = () => {
    const [user,setUser] = useState({"name":"","email":"","password":"","confirm-password":""})
    const [userCreated,setUserCreated] = useState(false)

    const handleChange = (event) => {
        const {name,value} = event.target
        setUser(prevUser => ({
            ...prevUser, [name]:value
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            if(user['password'] === user['confirm-password']){
            await createUser()
            setUserCreated(true)
            alert('Your registration was successfully submitted!')
            setUser({'name':'','email':'','password':'',"confirm-password":''})
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
        console.log(data)
        const response = await fetch('http://localhost:9000/users/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        })
        
        if(response.status !== 200){
            throw new Error(`Request failed:${response.status}`)
        }
    }
            
      
    return (
        userCreated ? <Redirect to={BusinessesDashboard}/>:
        <div className='container'>
            <Logo/>
            <div className="register">
            <form className="d-flex register-form" onSubmit={handleSubmit}>
                <Input label="Name" type="text" name="name" onChange={handleChange} required="true"/>
                <Input label="Email" type="email" name="email" onChange={handleChange} required="true"/>
                <Input label="Password" type="password" name="password" onChange={handleChange} required="true"/>
                <Input label="Confirm Password" type="password" name="confirm-password" onChange={handleChange} required="true"/>
                <input type="submit" id="sign-up" value="Sign Up" />
                <Link to="/login" className="log-in">Already registered?Log In</Link>
            </form>

        </div>
        </div>
        
    )

}

export default RegistrationForm
