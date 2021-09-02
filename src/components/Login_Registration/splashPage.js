import React from 'react'
// import ReactDOM from 'react-router-dom';
import {Link} from 'react-router-dom'



const SplashPage =()=> {
    return (<>
        

        <section id="splash">
      <div class="container-fluid">
        <div class="button-space">
          <Link class="home-button" to='/register'> Sign Up</Link>
          <a class="home-button" href="#Abouts">About</a>
          <Link class="home-button" to='/login'>Login In</Link>
        </div>
      
        <div class="row image-info">
      
          <div class="col-lg-6" >
            <div class="greeting">
              <h1 class="para">Manage your business with ease</h1>
              <p class="para"><strong>SIMA</strong> is a simple application to help business owners manage their businesses effectively </p>
            </div>
          </div>
      
          <div class="col-lg-6">
                <img class="splashimage"src="../../Assets/Images/splashimage.png" alt="splashimage"/>
              </div>
        </div>
      
      </div>
      
        </section>
      
        <section id="Contacts-ad">
      
          <div class="row">
            <div class="col-lg-3">
              <i class="fas fa-smile-wink fa-4x f-img"></i>
              <h3>Easy to Use</h3>
              <p>SIMA allows you to manage your business with ease</p>
            </div>
            <div class="col-lg-3">
              <i class="fas fa-tags fa-4x f-img"></i>
              <h3>Free to Use</h3>
              <p>SIMA is free of charge. No payments required. Just Sign Up!</p>
            </div>
            <div class="col-lg-3">
              <i class="far fa-handshake fa-4x f-img"></i>
              <h3>Reliable</h3>
              <p>Trust SIMA to work hand in hand with you.</p>
            </div>
            <div class="col-lg-3">
              <i class="fas fa-users fa-4x f-img"></i>
              <h3>Who Are We?</h3>
              <p>Garage97 is a KNUST student software team devoted to building robust software for consumers.</p>
            </div>
      
          </div>
      
        </section>
      
      
        <section id="Abouts">
      
          <div class="About">
      
            <div class="writing">
              <h2>About Us</h2>
              <h3>SIMA</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas non congue ex. Praesent auctor velit aliquet,
                mattis justo sit amet, eleifend arcu. Etiam id ante varius, finibus ante nec, sollicitudin justo. Mauris sed ex eget arcu
                convallis rhoncus quis non quam. Vivamus ex elit, dapibus
                eget posuere vel, elementum a elit. Pellentesque nec nulla magna.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas non congue ex. Praesent auctor velit aliquet,
                mattis justo sit amet, eleifend arcu. Etiam id ante varius, finibus ante nec, sollicitudin justo. Mauris sed ex eget arcu
                convallis rhoncus quis non quam. Vivamus ex elit, dapibus
                eget posuere vel, elementum a elit. Pellentesque nec nulla magna.
              </p>
            </div>
            </div>
        </section>
      
        <div class="footer">
          <a class="footer-links" href="#">LinkdIn</a>
          <a class="footer-links" href="#">GitHub</a>
          <a class="footer-links" href="#">Facebook</a>
          <p class="Garage97"> &copy Garage97 </p>
        </div>
        </>
    )
}
export default SplashPage;