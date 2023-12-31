import React, { useEffect, useState } from "react";
import "./Index.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Index = () => {

  const [data, setData] = useState([])

  useEffect(() => {
    axios
      .get("https://localhost:7227/api/Settings")
      .then((resp) => {
        setData(resp.data);
      })
      .catch((error) => {
        console.log("error");
      });
  }, []);

  return (
    <footer>
      <div className="container-footer">
        <div className="top-footer">
          <div className="left-footer">
            {data.map((datas,index) => (
              <div key={index} className="logo-div-footer">
                <img src={datas.footerLogoUrl} alt="footerlogo" />
              </div>
            ))}
          </div>
          <div className="center-footer">
            <h3>Main Menu</h3>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/doctors">Doctors</Link>
              </li>
              <li>
                <Link to="/login">Make An Appoinment</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </div>
          <div className="right-footer">
            <h3>Help and Support</h3>
            <ul>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>
                <Link to="/aboutus">About Us</Link>
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
