import React from 'react'
// import ReactDOM from 'react-router-dom';
import {Link} from 'react-router-dom'



const SplashPage =()=> {
    return (
        <div className = "splash">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="curved-upper">
              <path fill="#6880fe" fill-opacity="1" d="M0,320L48,304C96,288,192,256,288,213.3C384,171,480,117,576,80C672,43,768,21,864,16C960,11,1056,21,1152,64C1248,107,1344,181,1392,218.7L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z">
              </path>
           </svg>
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="bottom-curve">
              <path fill="#6880fe" fill-opacity="1" d="M0,0L48,21.3C96,43,192,85,288,112C384,139,480,149,576,133.3C672,117,768,75,864,48C960,21,1056,11,1152,53.3C1248,96,1344,192,1392,240L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
              </path>
           </svg> 
            <svg xmlns="http://www.w3.org/2000/svg" className= "bottom-circle" height="600" width="600"
                  id="myShape">
              <circle cx="300" cy="300"  r="200"
                  stroke="#18266f" stroke-width="0" fillOpacity= "1" fill="#6880fe" />
            </svg> 
           
          <div className="first-row" >
              <div className="splash-logo"></div>
              {/* <div></div> */}
              <div className="buttonspace">
                  <Link to="/about" className="log-in button">About</Link>
                  <Link to="/login" className="log-in button">Login</Link>
                  <Link to="/register" className="log-in button">SignUp</Link>
              </div>
              </div>
              <div className="message">
              <h1> Simplified Inventory Management Application</h1>
              <p>have you been getting bored managing long catalogues?  just want faster more efficient fix?</p>
              <h3> Manage effortlessly with SIMA at your disposable</h3>
              </div>
         
     
        </div>
    )
}
export default SplashPage;