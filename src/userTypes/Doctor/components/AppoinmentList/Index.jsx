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
        `https://localhost:7227/api/Appoinments/GetByUsername?userName=${user.username}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        setData(res.data);
        setSearchResults(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const seacrhChange = (key) => {
    setSearch(key);
    const filteredResults = data.filter(
      (item) =>
        item.problemDesc &&
        item.problemDesc.toLowerCase().includes(key.toLowerCase())
    );
    setSearchResults(filteredResults);
    setCurrentPage(1);
  };

  const searchResultsCopy = [...searchResults];

  searchResultsCopy.sort((a, b) => b.id - a.id);

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;


  const ApproveAppoinment = (id) => {
    axios
      .post(
        `https://localhost:7227/api/Appoinments/AcceptAppoinment?id=${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        const updatedData = data.map((item) =>
          item.id === id ? { ...item, status: 1 } : item
        );
        window.location.reload();
        setData(updatedData);
      })
      .catch((err) => console.log(err));
  };


  const RejectAppoinment = (id) => {
    axios
      .post(
        `https://localhost:7227/api/Appoinments/RejectAppoinment?id=${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        const updatedData = data.map((item) =>
          item.id === id ? { ...item, status: 4 } : item
        );
        window.location.reload();
        setData(updatedData);
      })
      .catch((err) => console.log(err));
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
        <div className="bottom-app-doctor" style={{ overflowX: "scroll" }}>
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
                <th scope="col">Approved</th>
                <th scope="col">Rejected</th>
                <th
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  scope="col"
                >
                  Is Deleted
                </th>
              </tr>
            </thead>
            <tbody>
              {searchResultsCopy
                .filter((dat) => dat.status !== 4)
                .slice(startIndex, endIndex)
                .map((datas, index) => (
                  <tr key={index}>
                    <th scope="row">{datas.id}</th>
                    <td
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {datas.patient && datas.patient.name
                        ? datas.patient.name
                        : datas.appoinmentAsDoctor &&
                          datas.appoinmentAsDoctor.name}{" "}
                      {datas.patient && datas.patient.surname
                        ? datas.patient.surname
                        : datas.appoinmentAsDoctor &&
                          datas.appoinmentAsDoctor.surname}
                    </td>
                    <td
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {datas.doctor && datas.doctor.name}{" "}
                      {datas.doctor && datas.doctor.surname}
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
                    <td
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {formatDateTime(datas.appoinmentDate)}
                    </td>
                    <td
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {datas.duration} minute
                    </td>
                    <td
                      style={{
                        color:
                          datas.status === 1
                            ? "green"
                            : datas.status === 2
                            ? "#FCA12F"
                            : datas.status === 3
                            ? "#1C79FF"
                            : datas.status === 4
                            ? "red"
                            : "black",
                      }}
                    >
                      {datas.status === 1
                        ? "Approved"
                        : datas.status === 2
                        ? "Completed"
                        : datas.status === 3
                        ? "Pending"
                        : "Rejected"}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {datas.status === 3 ? (
                        <i
                          onClick={() => ApproveAppoinment(datas.id)}
                          style={{ color: "green", cursor: "pointer" }}
                          class="fa-solid fa-check"
                        ></i>
                      ) : datas.status === 1 ? (
                        <i
                          style={{ color: "#008001" }}
                          class="fa-solid fa-user-check"
                        ></i>
                      ) : datas.status === 2 ? (
                        <i
                          style={{ color: "#FCA12F" }}
                          class="fa-solid fa-hourglass-end"
                        ></i>
                      ) : null}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {datas.status === 3 ? (
                        <i
                          onClick={() => RejectAppoinment(datas.id)}
                          style={{ color: "red", cursor: "pointer" }}
                          class="fa-solid fa-x"
                        ></i>
                      ) : datas.status === 1 ? (
                        <i
                          style={{ color: "#008001" }}
                          class="fa-solid fa-user-check"
                        ></i>
                      ) : datas.status === 2 ? (
                        <i
                          style={{ color: "#FCA12F" }}
                          class="fa-solid fa-hourglass-end"
                        ></i>
                      ) : null}
                    </td>

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
