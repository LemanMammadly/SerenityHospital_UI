import React, { useEffect, useState } from "react";
import "./Index.css";
import { Button } from "antd";
import { Link } from "react-router-dom";
import $ from "jquery";
import axios from "axios";
import Swal from "sweetalert2";

const Index = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [errorMessages, setErrorMessages] = useState("");
  const [exception, setException] = useState("");
  const itemsPerPage = 10;

  const user = JSON.parse(localStorage.getItem("user"));

  const respOpenMenu = () => {
    const dashboardMenu = $(".dashboard-menu-header");

    dashboardMenu.fadeIn("slow", () => {});
    document.body.style.overflow = "hidden";
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://localhost:7227/api/Departments/${id}`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          })
          .then((res) => {
            window.location.reload();
            console.log("Department deleted successfully");
          })
          .catch((e) => {
            if (e.response && e.response.data && e.response.data.errors) {
              console.log(e.response.data.errors);
              setErrorMessages(e.response.data.errors);
            } else {
              setException(e.response.data.message);
              console.log(e.response.data.errors);
            }
          });
      }
    });
  };

  const handleSoftDelete = (id) => {
    axios
      .patch(`https://localhost:7227/api/Departments/SoftDelete/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        window.location.reload();
        console.log("Service deleted successfully");
      })
      .catch((e) => {
        if (e.response && e.response.data && e.response.data.errors) {
          console.log(e.response.data.errors);
          setErrorMessages(e.response.data.errors);
        } else {
          setException(e.response.data.message);
          console.log(e.response.data.errors);
        }
      });
  };

  const handleRevertDelete = (id) => {
    axios
      .patch(`https://localhost:7227/api/Departments/RevertSoftDelete/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        window.location.reload();
        console.log("Service reverted successfully");
      })
      .catch((e) => {
        if (e.response && e.response.data && e.response.data.errors) {
          console.log(e.response.data.errors);
          setErrorMessages(e.response.data.errors);
        } else {
          setException(e.response.data.message);
          console.log(e.response.data.errors);
        }
      });
  };

  useEffect(() => {
    axios
      .get("https://localhost:7227/api/Departments")
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
    const filteredResults = data.filter((item) =>
    item.name && item.name.toLowerCase().includes(key.toLowerCase())
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
    <section className="all-departments-superadmin">
      <div className="container-departments-superadmin">
        <div className="top-departments-superadmin d-flex justify-content-between align-items-center">
          <div className="left-top-departments-superadmin">
            <h1>Departments</h1>
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
          <div className="left-right-departments-superadmin d-flex gap-3 align-items-center">
            <Link
              to="/superadmin/department/create"
              style={{
                textDecoration: "none",
                backgroundColor: "#0B58CA",
                color: "#fff",
                padding: "5px",
                fontSize: "13px",
                borderRadius: "5px",
              }}
            >
              Create
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
        <div className="bottom-departments-superadmin">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Icon</th>
                <th scope="col">Service Id</th>
                <th scope="col">Is Deleted</th>
                <th scope="col" colSpan={3}>
                  Options
                </th>
              </tr>
            </thead>
            <tbody>
              {searchResults.slice(startIndex, endIndex).map((datas, index) => (
                <tr key={index}>
                  <th scope="row">{datas.id}</th>
                  <td>{datas.name}</td>
                  <td>{datas.description.slice(0, 10)}...</td>
                  <td>
                    <img style={{ width: "30px" }} src={datas.iconUrl} alt="" />
                  </td>
                  <td>
                    <Link
                      style={{ textDecoration: "none", color: "#333" }}
                      to={`/superadmin/service`}
                    >
                      {datas.serviceId}
                    </Link>
                  </td>
                  <td>{datas.isDeleted ? "Delete" : "Active"}</td>
                  <td>
                    <Link
                      to={`/superadmin/department/update/${datas.id}`}
                      style={{
                        textDecoration: "none",
                        backgroundColor: "#0B58CA",
                        color: "#fff",
                        padding: "5px",
                        fontSize: "13px",
                        borderRadius: "5px",
                      }}
                      className="bg-success text-white"
                    >
                      Edit
                    </Link>
                  </td>
                  <td>
                    {datas.isDeleted === true ? (
                      <Button
                        onClick={() => handleRevertDelete(datas.id)}
                        className="bg-secondary text-white"
                      >
                        Reverte
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleSoftDelete(datas.id)}
                        className="bg-warning text-white"
                      >
                        Soft
                      </Button>
                    )}
                  </td>
                  <td>
                    <Button
                      onClick={() => handleDelete(datas.id)}
                      className="bg-danger text-white"
                    >
                      Delete
                    </Button>
                  </td>
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
