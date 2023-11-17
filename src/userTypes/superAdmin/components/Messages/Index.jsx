import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import $ from "jquery";
import Swal from "sweetalert2";
import { Button } from "antd";
import "./Index.css";
import { Modal } from "react-bootstrap";

const Index = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMessages, setErrorMessages] = useState("");
  const [exception, setException] = useState("");
  const itemsPerPage = 10;
  const [messageDescription, setMessageDescription] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (message) => {
    setMessageDescription(message);
    setShow(true);
  };

  const user = JSON.parse(localStorage.getItem("user"));

  const nav = useNavigate();

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
          .delete(`https://localhost:7227/api/Contacts/Delete/${id}`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          })
          .then((res) => {
            window.location.reload();
            console.log("Service deleted successfully");
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

  useEffect(() => {
    axios
      .get("https://localhost:7227/api/Contacts", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        const sortedData = res.data.sort((a, b) => b.id - a.id);
        setData(sortedData);
        setSearchResults(sortedData);
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
    <div>
      <section className="all-messages-superadmin">
        <div className="container-messages-superadmin">
          <div className="top-messages-superadmin d-flex justify-content-between align-items-center">
            <div className="left-top-messages-superadmin">
              <h1>Messages</h1>
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
            <div className="left-right-messages-superadmin d-flex gap-3 align-items-center">
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
          <div className="bottom-messages-superadmin">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Address</th>
                  <th scope="col">Date</th>
                  <th scope="col">Message</th>
                  <th scope="col" colSpan={1}>
                    Options
                  </th>
                </tr>
              </thead>
              <tbody>
                {searchResults
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
                        {datas.name}
                      </td>
                      <td
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {datas.email}
                      </td>
                      <td>{datas.phone}</td>
                      <td>{datas.address}</td>
                      <td>{datas.date.substring(0, 10)}</td>
                      <td>
                        <Link
                          style={{
                            textDecoration: "none",
                            backgroundColor: "#14A2B8",
                            color: "#fff",
                            fontSize: "13px",
                            padding: "7px",
                            borderRadius: "5px",
                          }}
                          onClick={() => handleShow(datas.message)}
                        >
                          View Message
                        </Link>
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
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Message Detail</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="modal-content p-3 my-3 ">
              <span>{messageDescription}</span>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </section>
    </div>
  );
};

export default Index;
