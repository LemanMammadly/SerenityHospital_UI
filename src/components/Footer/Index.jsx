import React from "react";
import "./Index.css";
import { Link } from "react-router-dom";
import Logo from "../../assets/imgs/logo-no-background.png"

const Index = () => {
  return (
    <footer>
     <div className="container-footer">
     <div className="top-footer">
        <div className="left-footer">
          <div className="logo-div-footer">
            <img src={Logo} alt="" />
          </div>
        </div>
        <div className="center-footer">
          <h3>Main Menu</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/">Doctors</Link>
            </li>
            <li>
              <Link to="/">Make An Appoinment</Link>
            </li>
            <li>
              <Link to="/">Login</Link>
            </li>
          </ul>
        </div>
        <div className="right-footer">
          <h3>Help and Support</h3>
          <ul>
            <li>
              <Link to="/">Contact Us</Link>
            </li>
            <li>
              <Link to="/">About Us</Link>
            </li>
            <li>
              <Link to="/">Blog</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="bottom-footer">
        <div className="bottom-footer-left">
            <p>copyright@serenityhospital | 2023</p>
        </div>
        <div className="bottom-footer-right">
        <div className="social-footer">
                <i class="fa-brands fa-facebook-f icon-footer"></i>
                <i class="fa-brands fa-twitter icon-footer"></i>
                <i class="fa-brands fa-google-plus-g icon-footer"></i>
                <i class="fa-brands fa-linkedin-in icon-footer"></i>
              </div>
        </div>
      </div>
     </div>
    </footer>
  );
};

export default Index;
