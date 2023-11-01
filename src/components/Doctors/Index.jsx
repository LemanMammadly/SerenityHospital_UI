import React, { useEffect, useState } from "react";
import "./Index.css";
import { Link } from "react-router-dom";
import $ from "jquery";
import axios from "axios";

const Index = () => {
  const [data, setData] = useState([]);
  const [detail, setDetail] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:7227/api/DoctorAuths")
      .then((resp) => {
        setData(resp.data);
      })
      .catch((error) => {
        console.log("error");
      });
  }, []);

  const openDoctorDetail = (id) => {
    const openDoctorDetail = $(".doctor-detail");
    openDoctorDetail.fadeIn("slow", () => {});
    document.body.style.overflow = "hidden";

    axios
      .get(`https://localhost:7227/api/DoctorAuths/${id}`)
      .then((resp) => {
        setDetail([resp.data]);
      })
      .catch((error) => {
        console.log("error");
      });
  };

  const closedoctorDetail = () => {
    const openDoctorDetail = $(".doctor-detail");

    openDoctorDetail.fadeOut("slow", () => {});

    document.body.style.overflow = "auto";
  };

  return (
    <section className="doctors-section">
      <div className="containers-doctor">
        <div className="all-doctors">
          <h3>Our Awesome Doctors</h3>
          <div className="doctors-boxes">
            {data.map((datas, index) => (
              <div key={index} className="doctor-box">
                <div className="img-div">
                  <img className="img-fluid" src={datas.imageUrl} alt="" />
                  <div className="view-details">
                    <button
                      onClick={() => openDoctorDetail(datas.id)}
                      className="detail-btn"
                    >
                      View Details
                    </button>
                  </div>
                </div>
                <div className="doctor-name">
                  <span>{datas.department.name}</span>
                  <br />
                  <Link to="/">{datas.name}</Link>
                </div>
                <hr />
                <div className="doctor-social">
                  <i class="fa-brands fa-facebook-f icon"></i>
                  <i class="fa-brands fa-twitter icon"></i>
                  <i class="fa-brands fa-google-plus-g icon"></i>
                  <i class="fa-brands fa-linkedin-in icon"></i>
                </div>
                {detail.map((details, index) => (
                  <div key={index} style={{display:"block"}} className="modal-doctor-detail">
                    <div className="doctor-detail">
                      <div className="all-doc-detail">
                        <div className="img-doc-detail">
                          <i
                            onClick={closedoctorDetail}
                            style={{ cursor: "pointer" }}
                            className="fa-solid fa-xmark"
                          ></i>
                          <img
                            className="img-fluid"
                            src={details.imageUrl}
                            alt=""
                          />
                          <h3>{details.name}</h3>
                          <hr />
                          <div className="email-detail det">
                            Email: <span>{details.email}</span>
                          </div>
                          <div className="department-detail det">
                            Department: <span>{details.department.name}</span>
                          </div>
                          <div className="position-detail det">
                            Position: <span>{details.position.name}</span>
                          </div>
                          <div className="profile-desc">
                            <h5>Profile</h5>
                            <p>
                              {details.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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
