import React, { useEffect, useState } from "react";
import "./Index.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import DoctorDetail from "../../assets/imgs/doctor-detail.jpeg";
import AOS from "aos";
import "aos/dist/aos.css";

const Index = () => {
  const [data, setData] = useState({});
  const { id } = useParams();

  var user = JSON.parse(localStorage.getItem("user"));

  const makeAnAppoinment = () => {
    if (user && user.roles && user.roles[0] === "Patient") {
      window.location.href = "/patient/appoinments";
    } else {
      window.location.href = "/login";
    }
  };

  useEffect(() => {
    axios
      .get(`https://localhost:7227/api/DoctorAuths/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  console.log(data);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="all-detail-page-doctor">
      <div
        className="top-detail-page-doctor"
        style={{
          backgroundImage: `url(${DoctorDetail})`,
          backgroundSize: "cover",
          backgroundPosition: "right",
          width: "100%",
          height: "450px",
        }}
      >
        <div className="color-overlay">
          <div
            className="all-doctor-detail-div d-flex gap-2 align-items-center"
            data-aos="fade-right"
          >
            <img
              style={{ width: "24.21%", marginLeft: "90px" }}
              src={data.imageUrl}
              alt=""
            />

            <div className="right-doctor-page-detail">
              <h4 className="position-detail-doctor">
                {data.position && data.position.name}
              </h4>
              <h2 className="name-surname-detail-doctor">
                {data.name} {data.surname}
              </h2>
              <h4 className="department-detail-doctor">
                {data.department && data.department.name}
              </h4>
              <h4 className="mail-detail-doctor">{data.email}</h4>
              <Link
                onClick={makeAnAppoinment}
                className="appoinment-doctor-detail"
              >
                <i
                  class="fa-solid fa-calendar-days"
                  style={{ color: "#fff", marginRight: "5px" }}
                ></i>{" "}
                Appointment
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-detail-doctor">
        <h3 className="info-doctor-deatil-page">Doctor Info</h3>
        <div className="doctor-info-div">
          <span><i class="fa-regular fa-address-card" style={{marginRight:"5px"}}></i> About Doctor</span>
          <p className="desc-doctor-deatil-page">{data.description}</p>
          <span> <i class="fa-solid fa-image-portrait" style={{marginRight:"5px"}}></i>Doctor Age</span>
          <p className="desc-doctor-deatil-page">{data.age}</p>
          <span> <i class="fa-regular fa-calendar" style={{marginRight:"5px"}}></i> Start Work Date</span>
          <p className="startDate-doctor-deatil-page">{data.startDate && data.startDate.substring(0,10)}</p>
          <span> <i class="fa-solid fa-venus-mars" style={{marginRight:"5px"}}></i> Gender</span>
          <p className="startDate-doctor-deatil-page">
            {data.gender === 2 ? "Male" : "Female"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
