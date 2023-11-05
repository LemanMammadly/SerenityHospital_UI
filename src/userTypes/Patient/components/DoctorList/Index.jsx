import React, { useEffect, useState } from "react";
import "./Index.css";
import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import $ from "jquery";

const Index = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMessages, setErrorMessages] = useState("");
  const [exception, setException] = useState("");
  const itemsPerPage = 10;

  const respOpenMenu = () => {
    const dashboardMenu = $(".dashboard-menu-header");

    dashboardMenu.fadeIn("slow", () => {});
    document.body.style.overflow = "hidden";
  };

  const nav = useNavigate();

  useEffect(() => {
    axios
      .get("https://localhost:7227/api/DoctorAuths")
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
      (item) => item.name && item.name.toLowerCase().includes(key.toLowerCase())
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
    <section className="all-doctor-pat">
      <div className="container-doctor-pat">
        <div className="top-doctor-pat d-flex justify-content-between align-items-center">
          <div className="left-top-doctor-pat">
            <h1>Doctors</h1>
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
          <div className="left-right-doctor-pat d-flex gap-3 align-items-center">
            <Link
              to="/patient/appoinments/create"
              style={{
                textDecoration: "none",
                backgroundColor: "#0B58CA",
                color: "#fff",
                padding: "5px",
                fontSize: "13px",
                borderRadius: "5px",
              }}
            >
              Create An Appoinment
            </Link>
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
        <div
          style={{ overflowX: "scroll" }}
          className="bottom-doctor-superadmin"
        >
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Surname</th>
                <th scope="col">Gender</th>
                <th scope="col">Email</th>
                <th scope="col">Position</th>
                <th scope="col">Department</th>
              </tr>
            </thead>
            <tbody>
              {searchResults
                .slice(startIndex, endIndex)
                .filter((doc) => doc.isDeleted === false)
                .map((datas, index) => (
                  <tr key={index}>
                    <td>
                      <img
                        src={datas.imageUrl}
                        style={{ width: "30px" }}
                        alt=""
                      />
                    </td>
                    <td>{datas.name}</td>
                    <td>{datas.surname}</td>
                    <td>{datas.gender === 2 ? "Male" : "Female"}</td>
                    <td>{datas.email}</td>
                    <td>{datas.position && datas.position.name}</td>
                    <td>{datas.department && datas.department.name}</td>
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
