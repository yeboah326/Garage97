import Input from "../Input";
import { login, useAuth } from "../../auth";
import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Button from "../Button";
import SvgBack from "../../Assets/icons/Back";
import SecureStorage from "../../auth/secure";

const RegistrationForm = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    "confirm-password": "",
  });
  const [userCreated, setUserCreated] = useState(false);
  const [logged] = useAuth();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const fetchUser = async (user_id) => {
    const response = await fetch(`https://sima-backend.herokuapp.com/users/${user_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await response.json();
    SecureStorage.set("User", res);
  };

  const Login = async () => {
    const details = {
      email: user["email"],
      password: user["password"],
    };
    const response = await fetch(
      "https://sima-backend.herokuapp.com/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      }
    );
    const res = await response.json();
    if (res.token) {
      fetchUser(res.public_id);
      login(res.token);
    }
    setUser({ name: "", email: "", password: "", "confirm-password": "" });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (user["password"] === user["confirm-password"]) {
        await createUser();
        Login();
        setUserCreated(true);
      } else {
        alert("Passwords do not match");
      }
    } catch (e) {
      alert(`Registration failed! ${e.message}`);
    }
  };

  const createUser = async () => {
    const data = {
      name: user.name,
      email: user.email,
      password: user.password,
    };
    const response = await fetch("https://sima-backend.herokuapp.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 400) {
      throw new Error(`Request failed:${response.status}`);
    }
  };

  return userCreated && logged ? (
    <Redirect to="/businesses" />
  ) : (
    <div id="main">
      <div className="splitscreen">
        <div className="leftdiv">
          <div className="image">
            <img
              src="Images/inventory-control.jpg"
              alt=""
              height="360px"
              width="240px"
            />
          </div>
        </div>
        <div className="rightdiv">
          <form onSubmit={handleSubmit}>
            <div className="mobile-back">
              <SvgBack fill="#fff" stroke="#fff" />
            </div>
            <div className="information">
              <h1>Sign Up</h1>
            </div>
            <section id="inputs">
              <div className="input">
                <label className="label">Name</label>
                <br />
                <input
                  type="text"
                  name="name"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="input">
                <label className="label">Email</label>
                <br />
                <input
                  type="email"
                  name="email"
                  placeholder="example@gmail.com"
                  onChange={handleChange}
                  required
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
                  required
                />
              </div>
              <div className="input">
                <label className="label">Confirm Password</label>
                <br />
                <input
                  type="password"
                  name="confirm-password"
                  placeholder="********"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="buttonAndLink">
                <input className="myButton" type="submit" value="Sign Up" />
                <Link to="/login" className="link">
                  Already Have an Account? Login!
                </Link>
              </div>
            </section>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
