import React from "react";
import { Link } from "react-router-dom";

const SplashPage = () => {
  return (
    <>
      <header className="splash-header">
        <h1>SiMA</h1>
        <nav class="navbar">
          <ul class="nav_links">
            <li>
              <Link to="/register">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <a href="#About">About</a>
            </li>
          </ul>
        </nav>
      </header>

      <section id="pic_info">
        <div className="div_right">
          <img
            className="image"
            src="Images/landing.jpg"
            height="240px"
            width="360px"
            alt=""
          />
          <div class="ad">
            <h1>Manage your business with Ease</h1> <br />
            <p>
              "<em>Simplified-Inventory-Management-Application</em>" is a simple
              application to help business owners manage their business
              effectively
            </p>
          </div>
        </div>
      </section>

      <section id="emojis">
        <ul class=" add_links">
          <li className="emoji">
            <div>
              <i class="fas fa-smile-wink fa-4x f-img"></i> <br />
              <h3>Easy to Use</h3>
              <p>SIMA allows you to manage your business with ease</p>
            </div>
          </li>

          <li className="emoji">
            <div>
              <i class="fas fa-tags fa-4x f-img"></i> <br />
              <h3>Free to Use</h3>
              <p>SIMA is free of charge. No payments required. Just Sign Up!</p>
            </div>
          </li>

          <li className="emoji">
            <div>
              <i class="far fa-handshake fa-4x f-img"></i> <br />
              <h3>Reliable</h3>
              <p>Trust SIMA to work hand in hand with you.</p>
            </div>
          </li>
        </ul>
      </section>

      <section id="About">
        <div class="writing">
          <h2>About Us</h2>
          <br />
          <h3>SIMA</h3>
          <p>
            We are a group of third year students offering Computer Engineering.
            Being tasked to come up with a software we decided to come up with
            this app, SIMA, which seeks to make life easierand more efficient
            for small scale businesses.
            <br />
            Our group is divided into three, Backend developers, frontend
            developers and system analysts. We are looking forward to develop
            more life enhancing apps to make work much easier in all fields of
            work.
          </p>
          <div className="members_div">
            <ul>
              <h3 className="members_heading" style={{ color: "white" }}>
                MEMBERS
              </h3>
              <li className="members" style={{ color: "white" }}>
                Gideon Asante Yeboah
              </li>
              <li className="members" style={{ color: "white" }}>
                Joseph Nana Benyin Barnes
              </li>
              <li className="members" style={{ color: "white" }}>
                Joseph Bedzra
              </li>
              <li className="members" style={{ color: "white" }}>
                Asiedu-Biney Yeboah Kofi
              </li>
              <li className="members" style={{ color: "white" }}>
                Ansah Samuel Theophilus
              </li>
              <li className="members" style={{ color: "white" }}>
                Biney Derick
              </li>
              <li className="members" style={{ color: "white" }}>
                Osae-Addo Emmanuel
              </li>
              <li className="members" style={{ color: "white" }}>
                Adjei Manasseh
              </li>
              <li className="members" style={{ color: "white" }}>
                Oheneba Manu
              </li>
              <li className="members" style={{ color: "white" }}>
                Ofori Joseph
              </li>
              <li className="members" style={{ color: "white" }}>
                Daniel
              </li>
            </ul>
          </div>
        </div>
      </section>

      <footer class="footer_section">
        <ul class="contact_links">
          <li>
            <a href="#">LinkedIn</a>
          </li>
          <li>
            <a href="#">GitHub</a>
          </li>
          <li>
            <a href="#">Facebook</a>
          </li>
        </ul>
        <p class="Garage97"> Garage97 </p>
      </footer>
    </>
  );
};
export default SplashPage;
