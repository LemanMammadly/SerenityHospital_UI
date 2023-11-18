import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const Index = () => {
  const {username}=useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://localhost:7227/api/DoctorAuths/GetByName?userName=${username}`
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="all-doc-profile">
      <div className="all-doc-profile-container">
        <div className="back-to-doctor">
            <Link style={{color:"black",textDecoration:"none"}} to="/superadmin/doctor"><i class="fa-regular fa-circle-left"></i> Admin / Doctors</Link>
        </div>
        <div className="top-doc-profile d-flex justify-content-between align-items-center">
          <div className="prof-text-div-doctor" style={{marginTop:"20px"}}>
            <h3>Profile</h3>
          </div>
        </div>
        <div className="bottom-doc-profile d-flex justify-content-between align-items-center">
          <div className="left-bot-doc-profile col-lg-3">
            <div className="left-image-doc-top">
              <img className="img-fluid" src={data.imageUrl} alt="" />
            </div>
            <div className="left-desc-doc-bottom">
              <h3>
                Dr. {data.name} {data.surname}
              </h3>
              <p>{data.description}</p>
            </div>
          </div>
          <div className="right-bot-doc-profile col-lg-8">
            <table class="table table-bordered table-secondary">
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>{data.name}</td>
                </tr>
                <tr>
                  <td>Surname</td>
                  <td>{data.surname}</td>
                </tr>
                <tr>
                  <td>Username</td>
                  <td>{data.userName}</td>
                </tr>
                <tr>
                  <td>Department</td>
                  <td>{data.department && data.department.name}</td>
                </tr>
                <tr>
                  <td>Position</td>
                  <td>{data.position && data.position.name}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{data.email}</td>
                </tr>
                <tr>
                  <td>Salary</td>
                  <td>{data.salary} manat</td>
                </tr>
                <tr>
                  <td>Gender</td>
                  <td>
                    {data.gender === 1
                      ? "Female"
                      : data.gender === 2
                      ? "Male"
                      : "Others"}
                  </td>
                </tr>
                <tr>
                  <td>Age</td>
                  <td>{data.age}</td>
                </tr>
                <tr>
                  <td>Start Date</td>
                  <td>{data.startDate && data.startDate.substring(0, 10)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
