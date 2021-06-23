import {useState} from 'react'
import Input from './Input'
import {Link} from 'react-router-dom'

const RegistrationForm = () => {
    const [user,setUser] = useState([])
    return (
        <div className="register">
            <form className="d-flex register-form">
                <Input label="Name" type="text"/>
                <Input label="Email" type="email"/>
                <Input label="Password" type="password"/>
                <Input label="Confirm Password" type="password"/>
                <input type="submit" id="sign-up" value="Sign Up"/>
                <p className="registered">Already registered?<Link to="/login" className="log-in">Log In</Link></p>
            </form>

        </div>
    )
}

export default RegistrationForm
