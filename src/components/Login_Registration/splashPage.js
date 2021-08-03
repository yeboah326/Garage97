import React from 'react'
// import ReactDOM from 'react-router-dom';
import {Link} from 'react-router-dom'
import Logo from './Logo'



const SplashPage =()=> {
    return (
        <div className = "container-splash">
         <div className="first-row">
            <Logo className="logo"/>
            <div className="buttonspace">
            < Link to="/login" className="sign-up-link button">About</Link>
            < Link to="/login"  className="sign-up-link button">Login</Link>
            < Link to="/register"  className="sign-up-link button">Sign up</Link>

            
            
            </div>
            
          </div>
            <div className="home__container">
                <img
                    className="home__image"
                    src="https://www.mishainfotech.com/images/InventoryManagement.png"
                    alt=""
                />
            </div>
           
          <div className="first-row" >
              <div className="splash-logo"></div>
              {/* <div></div> */}
              <div className="buttonspace">
                  <Link to="/stocks1" className="log-in button">About</Link>
                  <Link to="/login" className="log-in button">Login</Link>
                  <Link to="/register" className="log-in button">SignUp</Link>
              </div>
              </div>
              <div className="message">
              <h1> Simplified Inventory Management Application</h1>
              <p>Have you been getting bored managing long catalogues?  just want faster more efficient fix?</p>
              <h3> Manage effortlessly with SIMA at your disposable</h3>
              </div>
         
     
        </div>
    )
}
export default SplashPage;