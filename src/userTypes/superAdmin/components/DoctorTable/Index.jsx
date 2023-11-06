import React, { useEffect, useState } from "react";
import "./Index.css";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";
import $ from "jquery";
import axios from "axios";
import Swal from "sweetalert2";

const Index = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMessages, setErrorMessages] = useState("");
  const [exception, setException] = useState("");
  const itemsPerPage = 10;

  const user = JSON.parse(localStorage.getItem("user"));

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

  console.log(data);

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
          .delete(`https://localhost:7227/api/DoctorAuths/${id}`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          })
          .then((res) => {
            window.location.reload();
            console.log("Doctor deleted successfully");
          })
          .catch((e) => {
            if (e.response && e.response.data && e.response.data.errors) {
              setErrorMessages(e.response.data.errors);
            } else {
              setException(e.response.data.message);
            }
          });
      }
    });
  };

  const handleSoftDelete = (id) => {
    axios
      .patch(
        `https://localhost:7227/api/DoctorAuths/SoftDelete/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        window.location.reload();
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
      .patch(
        `https://localhost:7227/api/DoctorAuths/ReverteSoftDelete/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        window.location.reload();
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
    <section className="all-doctor-superadmin">
      <div className="container-doctor-superadmin">
        <div className="top-doctor-superadmin d-flex justify-content-between align-items-center">
          <div className="left-top-doctor-superadmin">
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
          <div className="left-right-doctor-superadmin d-flex gap-3 align-items-center">
            <Link
              to="/superadmin/doctor/create"
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
        <div
          style={{ overflowX: "scroll" }}
          className="bottom-doctor-superadmin"
        >
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Surname</th>
                <th scope="col">Username</th>
                <th scope="col">Gender</th>
                <th scope="col">Age</th>
                <th scope="col">Email</th>
                <th scope="col">Image</th>
                <th scope="col">Status</th>
                <th scope="col">Position</th>
                <th scope="col">Department</th>
                <th
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  scope="col"
                >
                  Start Date
                </th>
                <th
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  scope="col"
                >
                  End Date
                </th>
                <th scope="col">Roles</th>
                <th scope="col" colSpan={6}>
                  Options
                </th>
              </tr>
            </thead>
            <tbody>
              {searchResults.slice(startIndex, endIndex).map((datas, index) => (
                <tr key={index}>
                  <th
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {datas.id}
                  </th>
                  <td>{datas.name}</td>
                  <td>{datas.surname}</td>
                  <td>{datas.userName}</td>
                  <td>{datas.gender === 2 ? "Male" : "Female"}</td>
                  <td>{datas.age}</td>
                  <td>{datas.email}</td>
                  <td>
                    <img
                      src={datas.imageUrl}
                      style={{ width: "30px" }}
                      alt=""
                    />
                  </td>
                  <td>
                    {datas.status === 1
                      ? "Active"
                      : datas.status === 2
                      ? "OnLeave"
                      : datas.status === 3
                      ? "Leave"
                      : "Other"}
                  </td>
                  <td
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {datas.position && datas.position.name}
                  </td>
                  <td
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {datas.department && datas.department.name}
                  </td>
                  <td
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {datas.startDate.split("T")[0]}
                  </td>
                  <td
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {datas.endDate && datas.endDate.split("T")[0]}
                  </td>
                  <td>{datas.roles}</td>
                  <td>
                    <Button
                      onClick={() =>
                        nav(`/superadmin/doctor/addrole/${datas.userName}`)
                      }
                      style={{
                        backgroundColor: "#0B58CA",
                        color: "#fff",
                        padding: "5px",
                        fontSize: "13px",
                        borderRadius: "5px",
                      }}
                      disabled={datas.roles.length > 0}
                    >
                      <i class="fa-solid fa-user-plus"></i>
                    </Button>
                  </td>
                  <td>
                    <Button
                      onClick={() =>
                        nav(`/superadmin/doctor/removerole/${datas.userName}`)
                      }
                      style={{
                        backgroundColor: "#0B58CA",
                        color: "#fff",
                        padding: "5px",
                        fontSize: "13px",
                        borderRadius: "5px",
                      }}
                      disabled={datas.roles.length === 0}
                    >
                      <i class="fa-solid fa-user-minus"></i>
                    </Button>
                  </td>
                  <td>
                    <Button
                      onClick={() =>
                        nav(`/superadmin/doctor/addroom/${datas.id}`)
                      }
                      style={{
                        backgroundColor: "#0B58CA",
                        color: "#fff",
                        padding: "5px",
                        fontSize: "13px",
                        borderRadius: "5px",
                      }}
                    >
                      <i class="fa-solid fa-house-medical"></i>
                    </Button>
                  </td>

                  <td>
                    <Link
                      to={`/superadmin/doctor/update/${datas.id}`}
                      style={{
                        textDecoration: "none",
                        backgroundColor: "#0B58CA",
                        color: "#fff",
                        padding: "5px",
                        fontSize: "13px",
                        borderRadius: "5px",
                      }}
                      className="bg-success text-white "
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
