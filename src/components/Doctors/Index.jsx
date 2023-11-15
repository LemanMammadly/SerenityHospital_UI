import React, { useEffect, useState } from "react";
import "./Index.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Index = () => {
  const [data, setData] = useState([]);

  const nav=useNavigate();

  useEffect(() => {
    axios
      .get("https://localhost:7227/api/DoctorAuths")
      .then((resp) => {
        setData(resp.data.filter((app)=>app.position && app.position.name==="Professor doctor")); 
      })
      .catch((error) => {
        console.log("error");
      });
  }, []);


  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <section className="doctors-section">
      <div className="containers-doctor">
        <div className="all-doctors">
          <h3>Our Professor Doctors</h3>
          <div className="doctors-boxes">
            {data.map((datas, index) => (
              <div key={index} className="doctor-box" data-aos="fade-up"
              data-aos-anchor-placement="bottom-bottom">
                <div className="img-div">
                  <img className="img-fluid" src={datas.imageUrl} alt="" />
                  <div className="view-details">
                    <button
                    onClick={() =>
                      nav(`/detail/${datas.id}`)
                    }
                      className="detail-btn"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
                <div className="doctor-name">
                  <span>{datas.department.name}</span>
                  <br />
                  <Link to="/">{datas.name} {datas.surname}</Link>
                </div>
                <hr />
                <div className="doctor-social">
                  <i class="fa-brands fa-facebook-f icon"></i>
                  <i class="fa-brands fa-twitter icon"></i>
                  <i class="fa-brands fa-google-plus-g icon"></i>
                  <i class="fa-brands fa-linkedin-in icon"></i>
                </div>
              </div>
            ))}
          </div>
          <div className="doctors-load-more">
            <Link to="/doctors" className="load-more-btn">
              Load More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Index;
