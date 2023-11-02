import React, { useEffect, useState } from 'react'
import "./Index.css"
import { Button } from 'antd'
import { Modal } from "react-bootstrap";
import axios from 'axios';
import { Link } from 'react-router-dom';
import $ from 'jquery'

const Index = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [errorMessages, setErrorMessages] = useState("");
    const [exception, setException] = useState("");
    const itemsPerPage = 10;
    const [recipeDescription, setRecipeDescription] = useState("");
  
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = (recipeDesc) => {
      setRecipeDescription(recipeDesc);
      setShow(true);
    };
  
    const respOpenMenu = () => {
      const dashboardMenu = $(".dashboard-menu-header");
  
      dashboardMenu.fadeIn("slow", () => {});
      document.body.style.overflow = "hidden";
    };
  
    const user = JSON.parse(localStorage.getItem("user"));
    const username = user.username;
  
  
    useEffect(() => {
        axios
          .get(
            `https://localhost:7227/api/PatientAuths/GetByName?userName=${username}`
          )
          .then((res) => {
            setData(res.data.patientHistories);
            setSearchResults(res.data.patientHistories);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);

      console.log(data);
  
    const seacrhChange = (key) => {
      setSearch(key);
      const filteredResults = data.filter((item) =>
        item.recipe.doctor.name.toLowerCase().includes(key.toLowerCase())
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
    <section className="all-recip-pat">
      <div className="container-recip-pat">
        <div className="top-recip-pat d-flex justify-content-between align-items-center">
          <div className="left-top-recip-pat">
            <h1>Patient History</h1>
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
          <div className="left-right-recip-pat d-flex gap-3 align-items-center">
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
        <div className="bottom-recip-pat">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Recipe Date</th>
                <th scope="col">Doctor</th>
                <th scope="col">Patient</th>
                <th scope="col">Problem</th>
                <th scope="col">Recipe Info</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.slice(startIndex, endIndex).map((datas, index) => (
                <tr key={index}>
                  <th scope="row">{datas.id}</th>
                  <td>{datas.date.substring(0,10)}</td>
                  <td>
                   {datas.recipe.doctor.name}  {datas.recipe.doctor.surname}
                  </td>
                  <td>
                  {datas.recipe.patient.name}  {datas.recipe.patient.surname}
                  </td>
                  <td>{datas.recipe.appoinment.problemDesc}</td>
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
                      onClick={() => handleShow(datas.recipe.recipeDesc)}
                    >
                      View Recipe
                    </Link>
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
          <Modal.Title>Recipe Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-content p-3 my-3 ">
            <span>Recipe Info : {recipeDescription}</span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  )
}

export default Index