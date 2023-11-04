import React, { useEffect, useState } from "react";
import "./Index.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Index = () => {
  const [data, setData] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get(
        `https://localhost:7227/api/PatientAuths/GetByName?userName=${user.username}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(data);
  return (
    <div className="all-pat-profile">
      <div className="all-pat-profile-container">
        <div className="top-pat-profile d-flex justify-content-between align-items-center">
          <div className="prof-text-div-pat">
            <h3>Profile</h3>
          </div>
          <div className="upt-prof-btn-pat">
            <Link to={`/patient/profile/update`}>Update Profile</Link>
          </div>
        </div>
        <div className="bottom-pat-profile d-flex justify-content-between align-items-center">
          <div className="left-pat-doc-profile col-lg-3">
            <div className="left-image-pat-top">
              <img className="img-fluid" src={data.imageUrl || ""} alt="" />
            </div>
            <div className="left-desc-pat-bottom text-center">
              <h3>
                {data.name || ""} {data.surname || ""}
              </h3>
            </div>
          </div>
          <div className="right-bot-pat-profile col-lg-8">
            <table class="table table-bordered table-secondary">
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>{data.name || ""}</td>
                </tr>
                <tr>
                  <td>Surname</td>
                  <td>{data.surname || ""}</td>
                </tr>
                <tr>
                  <td>Age</td>
                  <td>{data.age || ""}</td>
                </tr>
                <tr>
                  <td>Username</td>
                  <td>{data.userName || ""}</td>
                </tr>
                <tr>
                  <td>Phone Number</td>
                  <td>{data.phoneNumber || ""}</td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>{data.address || ""}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{data.email || ""}</td>
                </tr>
                <tr>
                  <td>BloodType</td>
                  <td>
                    {data.bloodType === 1
                      ? "APositive"
                      : data.bloodType === 2
                      ? "ANegative"
                      : data.bloodType === 3
                      ? "BPositive"
                      : data.bloodType === 4
                      ? "BNegative"
                      : data.bloodType === 5
                      ? "ABPositive"
                      : data.bloodType === 6
                      ? "ABNegative"
                      : data.bloodType === 7
                      ? "OPositive"
                      : data.bloodType === 8
                      ? "ONegative"
                      : "Unknown"}
                  </td>
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
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
