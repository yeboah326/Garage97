import React from "react";
import Input from "../Input";
import { Link, Redirect } from "react-router-dom";
import { useState } from "react";
import { login, useAuth } from "../../auth/index";
import Button from "../Button";
import SvgBack from "../../Assets/icons/Back";
import SecureStorage from "../../auth/secure";

const LoginForm = () => {
  const [details, setDetails] = useState({ email: "", password: "" });
  const [logged] = useAuth();

  const fetchUser = async (user_id) => {
    const response = await fetch(
      `https://sima-backend.herokuapp.com/users/${user_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const res = await response.json();
    SecureStorage.set("User", res);
  };
  const onSubmitClick = async (event) => {
    event.preventDefault();
    const data = {
      email: details["email"],
      password: details["password"],
    };
    const response = await fetch(
      "https://sima-backend.herokuapp.com/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const res = await response.json();
    if (res.token) {
      fetchUser(res.public_id);
      SecureStorage.set("REACT_TOKEN_AUTH_KEY", res.token);
      login(res.token);
    }
    // if(response.status === 200){
    //     alert('User successfully Logged in')
    // }
    else {
      alert(res.message);
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return !logged ? (
    <div className="split">
      <div className="leftdivv">
        <div className="image">
          <img
            src="Images/login.jpg"
            alt=""
            height="360px"
            width="240px"
          />
        </div>
      </div>
      <div className="rightdivv">
        <form onSubmit={onSubmitClick}>
          <div className="mobile-back">
            <Link to="/">
              <SvgBack />
            </Link>
          </div>
          <div className="headinginfo">
            <h1>Login</h1>
            {/* <p>Making it easier to manage your business. <br/> Login and Get Started</p> */}
          </div>
          <section id="inputs">
            <div className="input">
              <label className="label">Email</label>
              <br />
              <input
                type="email"
                name="email"
                placeholder="example@gmail.com"
                onChange={handleChange}
              />
            </div>
            <div className="input">
              <label className="label">Password</label>
              <br />
              <input
                type="password"
                name="password"
                placeholder="********"
                onChange={handleChange}
              />
            </div>
            <p>Forgot password?</p>
            <div className="buttonAndLink">
              <input type="submit" className="myButton1" value="Login" />
              <Link to="/register" className="butt_link">
                Don't Have An Account? Sign Up with Us
              </Link>
            </div>
          </section>
        </form>
      </div>
    </div>
  ) : (
    <Redirect to="/businesses" />
  );
};

export default LoginForm;
