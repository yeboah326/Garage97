import React from 'react'
import Input from './Input'
import {Link} from 'react-router-dom'
// import SubmitButton from './SubmitButton'

const LoginForm = () => {
    return (
        <div className="d-flex login-form">
            <form>
                <Input type="email" required="true" label="Email"/>
                <Input type="password" required="true" label="Password"/>
                <p  className="forgot-pass"><Link className="forgot-pass-link">Forgot password?</Link></p>
                <input type="submit" id="login" value="Login"/>
                < Link to="/register" className="sign-up-link">Not registered? Sign Up </Link>
            </form>

        </div>
    )
}

export default LoginForm
