import React, { useEffect, useState } from "react";
import "./Index.css";
import { Button } from "antd";
import { format } from "date-fns";
import axios from "axios";
import $ from "jquery";
import { Link } from "react-router-dom";
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

  const currentDate = new Date();
  const dates = format(currentDate, "yyyy-MM-dd");
  const time = format(currentDate, "HH:mm:ss");
  const dateNow = `${dates}T${time}`;

  const formatDateTime = (dateTime) => {
    const parsedDate = new Date(dateTime);
    return format(parsedDate, "HH:mm dd-MM-yyyy");
  };

  const respOpenMenu = () => {
    const dashboardMenu = $(".dashboard-menu-header");

    dashboardMenu.fadeIn("slow", () => {});
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    axios
      .get(`https://localhost:7227/api/Appoinments`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
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
          .delete(`https://localhost:7227/api/Appoinments/${id}`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          })
          .then((res) => {
            window.location.reload();
            console.log("Appoinment deleted successfully");
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
        `https://localhost:7227/api/Appoinments/SoftDelete/${id}`,
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
        console.log("Appoinment deleted successfully");
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
        `https://localhost:7227/api/Appoinments/ReverteSoftDelete/${id}`,
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

  const seacrhChange = (key) => {
    setSearch(key);
    const filteredResults = data.filter(
      (item) =>
        item.doctor.name &&
        item.doctor.name.toLowerCase().includes(key.toLowerCase())
    );
    setSearchResults(filteredResults);
    setCurrentPage(1);
  };

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const searchResultsCopy = [...searchResults];

  searchResultsCopy.sort((a, b) => b.id - a.id);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <section className="all-app-admin">
      <div className="container-app-admin">
        <div className="top-app-admin d-flex justify-content-between align-items-center">
          <div className="left-top-app-admin">
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
          <div className="left-right-app-admin d-flex gap-3 align-items-center">
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
        <div className="bottom-app-admin" style={{ overflowX: "scroll" }}>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Doctor</th>
                <th scope="col">Patient</th>
                <th scope="col">Problem</th>
                <th scope="col">Date</th>
                <th scope="col">Duration</th>
                <th scope="col">Status</th>
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
                <th scope="col" colSpan={3}>
                  Options
                </th>
              </tr>
            </thead>
            <tbody>
              {searchResultsCopy
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
                      {datas.patient && datas.patient.name}{" "}
                      {datas.patient && datas.patient.surname}{" "}
                      {datas.appoinmentAsDoctor &&
                        datas.appoinmentAsDoctor.name}
                      {datas.appoinmentAsDoctor &&
                        datas.appoinmentAsDoctor.surname}
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
                        : datas.status === 4
                        ? "Rejected"
                        : "Unknown"}
                    </td>
                    <td>{datas.isDeleted === false ? "Active" : "Deleted"}</td>
                    <td>
                      <Link
                        to={`/superadmin/appoinments/update/${datas.id}`}
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
