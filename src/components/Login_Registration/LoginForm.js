import React from 'react'
import Input from '../Input'
import { Link, Redirect } from 'react-router-dom'
import { useState } from 'react'
import { login, useAuth } from '../../auth/index'
import Button from '../Button'
import SvgBack from '../../Assets/icons/Back'



const LoginForm = () => {
  const [details, setDetails] = useState({ 'email': '', 'password': '' })
  const [logged] = useAuth()


  const fetchUser = async (user_id) => {
    const response = await fetch(`http://localhost:9000/users/${user_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const res = await response.json()
    console.log(res)
    localStorage.setItem('User', JSON.stringify(res))
    console.log(localStorage.getItem('User'))
  }
  const onSubmitClick = async (e) => {
    e.preventDefault()
    const data = {
      "email": details['email'],
      "password": details['password']
    }
    const response = await fetch('http://localhost:9000/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    const res = await response.json()
    if (res.token) {
      fetchUser(res.public_id)
      login(res.token)
    }
    // if(response.status === 200){
    //     alert('User successfully Logged in')
    // }
    else {
      alert(res.message)
    }

  }
  const handleChange = (event) => {
    const { name, value } = event.target
    setDetails(prevDetails => ({
      ...prevDetails, [name]: value
    }))
  }

  return (
    !logged ?
      <div class="split">
        <div class="leftdivv">
          <img src="../images/2.jpg" alt="" />
        </div>
        <div class="rightdivv">
          <form>
            <div class="info">
              <h1>Login</h1>
              <p>Make it easier to manage your business. Ready? Sign Up</p>
            </div>
            <section id="inputs">
            <div class="input">
              <label class="label">Name</label><br />
              <input type="text" name="sign_up_name" />
            </div>
            <div class="input">
              <label class="label">Email</label><br />
              <input type="email" name="sign_up_email" value="" placeholder="example@gmail.com" />
            </div>
            <div class="input">
              <label class="label">Password</label><br />
              <input type="password" name="" value="" placeholder="********" />
            </div>
            <div class="buttonAndLink">
              <a href="#" class="myButton">Login</a><br />
              <a href="#">Don't Have An Account? Sign Up with Us</a>
            </div>
            </section>
          </form>
      </div>
      </div>
    
        : <Redirect to='/businesses' />
    )
}

export default LoginForm
