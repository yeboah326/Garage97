import React from 'react'
// import ReactDOM from 'react-router-dom';
import { Link } from 'react-router-dom'



const SplashPage = () => {
  return (<>


    <header>
      <h1>SIMA</h1>
      <nav class="navbar">
        <ul class="nav_links">
          <li><a href="#About">About</a></li>
          <li><Link to ='/login'>Login</Link></li>
          <li><Link to = '/register'>Sign Up</Link></li>
        </ul>
      </nav>
    </header>

    <section id="pic_info">
      <div class="div_right">
        <img class="splashimage" src="images/splashimage.png" alt=""/>
          <div class="ad">
            <h1>Manage your business with ease</h1> <br/>
            <p>""<em>SIMA</em> is a simple application to help business owners manage their business effectively"</p>
          </div>
      </div>
    </section>

    <section id="emojis">
        <ul class=" add_links">
          <li>
            <div>
              <i class="fas fa-smile-wink fa-4x f-img"></i> <br/>
                <h3>Easy to Use</h3>
                <p>SIMA allows you to manage your business with ease</p>
            </div>
        </li>

          <li>
            <div>
               <i class="fas fa-tags fa-4x f-img"></i> <br/>
                <h3>Free to Use</h3>
                <p>SIMA is free of charge. No payments required. Just Sign Up!</p>
            </div>
          </li>
              
          <li>
            <div>
              <i class="far fa-handshake fa-4x f-img"></i> <br/>
              <h3>Reliable</h3>
              <p>Trust SIMA to work hand in hand with you.</p>
            </div>
        </li>
        
        </ul>
    </section>

    <section id="About">
        <div class="writing">
            <h2>About Us</h2><br/>
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
    </section>

    <footer class="footer_section">
        <ul class="contact_links">
            <li><a href="#">LinkedIn</a></li>
            <li><a href="#">GitHub</a></li>
            <li><a href="#">Facebook</a></li>
        </ul>
            <p class="Garage97"> Garage97 </p>
    </footer>
        </>
            )
}
            export default SplashPage;