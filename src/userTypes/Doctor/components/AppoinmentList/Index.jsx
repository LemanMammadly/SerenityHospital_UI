import React, { useEffect, useState } from "react";
import "./Index.css";
import $ from "jquery";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { format } from "date-fns";

const Index = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMessages, setErrorMessages] = useState("");
  const [exception, setException] = useState("");
  const itemsPerPage = 10;


  const currentDate = new Date();
  const dates = format(currentDate, "yyyy-MM-dd");
  const time = format(currentDate, "HH:mm:ss");
  const dateNow = `${dates}T${time}`;


  const formatDateTime = (dateTime) => {
    const parsedDate = new Date(dateTime);
    return format(parsedDate, "HH:mm dd-MM-yyyy");
  };

  const user = JSON.parse(localStorage.getItem("user"));

  const respOpenMenu = () => {
    const dashboardMenu = $(".dashboard-menu-header");

    dashboardMenu.fadeIn("slow", () => {});
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    axios
      .get(
        `https://localhost:7227/api/DoctorAuths/GetByName?userName=${user.username}`
      )
      .then((res) => {
        setData(res.data.appoinments);
        setSearchResults(res.data.appoinments);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(data);

  const seacrhChange = (key) => {
    setSearch(key);
    const filteredResults = data.filter(
      (item) =>
        item.patient.name &&
        item.patient.name.toLowerCase().includes(key.toLowerCase())
    );
    setSearchResults(filteredResults);
    setCurrentPage(1);
  };

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const isAppoinmentPending = (appoinmentDate) => {
    const now = new Date(); 
    const appoinmentDateTime = new Date(appoinmentDate);
  
    if (now < appoinmentDateTime) {
      return 1; 
    } else {
      return 2; 
    }
  };

  return (
    <section className="all-app-doctor">
      <div className="container-app-doctor">
        <div className="top-app-doctor d-flex justify-content-between align-items-center">
          <div className="left-top-app-doctor">
            <h1>Appoinments</h1>
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
          <div className="left-right-app-doctor d-flex gap-3 align-items-center">
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
        <div className="bottom-app-doctor"  style={{ overflowX: "scroll" }}>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Patient</th>
                <th scope="col">Doctor</th>
                <th scope="col">Problem</th>
                <th scope="col">Date</th>
                <th scope="col">Duration</th>
                <th scope="col">Status</th>
                <th scope="col">Is Deleted</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.slice(startIndex, endIndex).sort((a, b) => new Date(b.appoinmentDate) - new Date(a.appoinmentDate)).map((datas, index) => (
                <tr key={index}>
                  <th scope="row">{datas.id}</th>
                  <td   style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}>
                    {datas.patient.name} {datas.patient.surname}
                  </td>
                  <td   style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}>
                    {datas.doctor.name} {datas.doctor.surname}
                  </td>
                  <td
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {datas.problemDesc}
                  </td>
                  <td>{formatDateTime(datas.appoinmentDate)}</td>
                  <td>{datas.duration} minute</td>
                  <td>{isAppoinmentPending(datas.appoinmentDate) === 1 ? <i title="approved" style={{color:"red",cursor:"pointer"}} class="fa-regular fa-clock"></i> : <i title="completed" style={{color:"blue",cursor:"pointer"}} class="fa-solid fa-check"></i>}</td>
                  <td>{datas.isDeleted === false ? "Active" : "Deleted"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination my-3">
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