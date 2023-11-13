import React, { useEffect, useState } from "react";
import "./Index.css";
import axios from "axios";
import { Link } from "react-router-dom";
import $ from "jquery";
import { Button } from "antd";

const Index = () => {
  const [data, setData] = useState([]);
  const [doctorPatient, setDoctorPatient] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMessages, setErrorMessages] = useState("");
  const [exception, setException] = useState("");
  const itemsPerPage = 10;

  const user = JSON.parse(localStorage.getItem("user"));
  const username = user.username;

  const respOpenMenu = () => {
    const dashboardMenu = $(".dashboard-menu-header");

    dashboardMenu.fadeIn("slow", () => {});
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    axios
      .get("https://localhost:7227/api/PatientAuths", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        const allPatients = res.data;
        const filteredPatients = allPatients.filter(
          (patient) =>
            patient.appoinments &&
            patient.appoinments.some(
              (app) =>
                app.doctor &&
                app.doctor.userName === username &&
                (app.status === 1 || app.status===2)
            )
        );

        setData(filteredPatients);
        setSearchResults(filteredPatients);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [username]);

  useEffect(() => {
    axios
      .get(`https://localhost:7227/api/Appoinments`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        const appoinments = res.data;
        const appoinmentFilter = appoinments.filter(
          (app) => app.doctor.userName === username && (app.status === 1 || app.status===2)
        );
        const appoinmentDoctor = appoinmentFilter.filter(
          (app) => app.appoinmentAsDoctor !== null
        );
        setDoctorPatient(appoinmentDoctor);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const seacrhChange = (key) => {
    setSearch(key);
    const filteredResults = data.filter(
      (item) =>
        item && item.name && item.name.toLowerCase().includes(key.toLowerCase())
    );
    setSearchResults(filteredResults);
    setCurrentPage(1);
  };

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return (
    <section className="all-pat-doc">
      <div className="container-pat-doc">
        <div className="top-pat-doc d-flex justify-content-between align-items-center">
          <div className="left-top-pat-doc">
            <h1>Patients</h1>
            <div className="left-menu-header">
              <i
                onClick={respOpenMenu}
                class="fa-solid fa-bars"
                style={{ color: "#333", marginBottom: "20px" }}
              ></i>
            </div>
            {errorMessages ? (
              <div className="error-messages">
                <p className="error-message">{errorMessages.message}</p>
              </div>
            ) : (
              <div className="error-messages">
                <p className="error-message">{exception}</p>
              </div>
            )}
          </div>
          <div className="left-right-pat-doc d-flex gap-3 align-items-center">
            <div className="search-input">
              <input
                className="form form-control w-100"
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => seacrhChange(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="bottom-pat-doc">
          <table class="table">
          <caption>Patients</caption>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Surname</th>
                <th scope="col">Image</th>
                <th scope="col">Age</th>
                <th scope="col">Phone</th>
                <th scope="col">Address</th>
                <th scope="col">Blood Type</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.slice(startIndex, endIndex).map((datas, index) => (
                <tr key={index}>
                  <td>{datas.name}</td>
                  <td>{datas.surname}</td>
                  <td>
                    <img
                      src={datas.imageUrl}
                      style={{ width: "30px" }}
                      alt=""
                    />
                  </td>
                  <td>{datas.age}</td>
                  <td>{datas.phoneNumber}</td>
                  <td>{datas.address}</td>
                  <td>
                    {datas.bloodType === 1
                      ? "APositive"
                      : datas.bloodType === 2
                      ? "ANegative"
                      : datas.bloodType === 3
                      ? "BPositive"
                      : datas.bloodType === 4
                      ? "BNegative"
                      : datas.bloodType === 5
                      ? "ABPositive"
                      : datas.bloodType === 6
                      ? "ABNegative"
                      : datas.bloodType === 7
                      ? "OPositive"
                      : datas.bloodType === 8
                      ? "ONegative"
                      : "Unknown"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <table class="table">
            <caption>Patients as Doctors</caption>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Surname</th>
                <th scope="col">Age</th>
                <th scope="col">Email</th>
                <th scope="col">Blood Type</th>
              </tr>
            </thead>
            <tbody>
              {doctorPatient.map((datas, index) => (
                <tr key={index}>
                  <td>
                    {datas.appoinmentAsDoctor && datas.appoinmentAsDoctor.name}
                  </td>
                  <td>
                    {datas.appoinmentAsDoctor &&
                      datas.appoinmentAsDoctor.surname}
                  </td>
                  <td>
                    {datas.appoinmentAsDoctor && datas.appoinmentAsDoctor.age}
                  </td>
                  <td>
                    {datas.appoinmentAsDoctor && datas.appoinmentAsDoctor.email}
                  </td>
                  <td>ABPositive</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <div className="pag">
              <Button
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span
                className="pagNum"
                style={{
                  fontSize: "15px",
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
              >
                {currentPage}
              </span>
              <Button
                onClick={() => changePage(currentPage + 1)}
                disabled={endIndex >= searchResults.length}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Index;
