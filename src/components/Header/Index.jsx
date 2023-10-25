import React, { useEffect, useState } from "react";
import "./Index.css";
import { Link } from "react-router-dom";
import $ from "jquery";
import axios from "axios";

const Index = () => {
  const [data, setData] = useState([]);

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


  const respmenu = () => {
    const containerResp = $(".container-resp");

    containerResp.fadeIn("slow", () => {});
  };

  const closeRespMenu = () => {
    const containerResp = $(".container-resp");

    containerResp.fadeOut("slow", () => {});
  };

  const closeMenu = () => {
    const containerResp = $(".container-resp");

    containerResp.fadeOut("slow", () => {});
  };

  return (
    <header>
      <div className="container">
        <div className="left-logo">
          {data.map((datas, index) => (
            <Link key={index} to="/">
              <img
               src={datas.headerLogoUrl}
                alt="headerlogo"
                style={{ width: "40%" }}
              />
            </Link>
          ))}
        </div>
        <div className="right">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/doctors">Doctors</Link>
            </li>
            <li>
              <Link to="/appoinment">Appoinment</Link>
            </li>
            <li>
              <Link to="/aboutus">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </div>
        <div className="resp-icon">
          <i onClick={respmenu} className="fa-solid fa-bars"></i>
        </div>
      </div>
      <div className="container-resp">
        <div className="resp-menu">
          <i
            onClick={closeRespMenu}
            className="fa-solid fa-xmark resp-icon-close"
          ></i>
          <ul>
            <li>
              <Link onClick={closeMenu} to="/">
                Home
              </Link>
            </li>
            <li>
              <Link onClick={closeMenu} to="/doctors">
                Doctors
              </Link>
            </li>
            <li>
              <Link onClick={closeMenu} to="/apoinment">
                Appoinment
              </Link>
            </li>
            <li>
              <Link onClick={closeMenu} to="/aboutus">
                About
              </Link>
            </li>
            <li>
              <Link onClick={closeMenu} to="/contact">
                Contact
              </Link>
            </li>
            <li>
              <Link onClick={closeMenu} to="/login">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Index;
