import React, { useEffect, useState } from 'react'
import "./Index.css"
import axios from 'axios';
import $ from 'jquery'
import { Link } from 'react-router-dom';
import { Button } from 'antd';

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

    const user = JSON.parse(localStorage.getItem("user"));
    const username = user.username;
  
    useEffect(() => {
        axios
          .get("https://localhost:7227/api/Recipes")
          .then((res) => {
            const recipes = res.data;
            const filteredRecipes = recipes.filter((rec) => (
                rec.doctor.userName===username
            ));
            console.log(filteredRecipes);
            setData(filteredRecipes);
            setSearchResults(filteredRecipes);
          })
          .catch((err) => {
            console.log(err);
          });
      }, [username]);

    const seacrhChange = (key) => {
      setSearch(key);
      const filteredResults = data.filter((item) =>
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
  return (
    <section className="all-recip-doc">
      <div className="container-recip-doc">
        <div className="top-recip-doc d-flex justify-content-between align-items-center">
          <div className="left-top-recip-doc">
            <h1>Recipes</h1>
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
          <div className="left-right-recip-doc d-flex gap-3 align-items-center">
            <Link
              to="/doctor/recipes/create"
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
        <div className="bottom-recip-doc">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Appoinment Id</th>
                <th scope="col">Patient</th>
                <th scope="col">Doctor</th>
                <th scope="col">Problem</th>
                <th scope="col">Recipe Info</th>
                <th scope="col">
                  Options
                </th>
              </tr>
            </thead>
            <tbody>
              {searchResults.slice(startIndex, endIndex).map((datas, index) => (
                <tr key={index}>
                  <th scope="row">{datas.id}</th>
                  <td>{datas.appoinment.id}</td>
                  <td>{datas.patient.name} {datas.patient.surname}</td>
                  <td>{datas.doctor.name} {datas.doctor.surname}</td>
                  <td>{datas.appoinment.problemDesc}</td>
                  <td>{datas.recipeDesc}</td>
                  <td>
                    <Link
                      to={`/doctor/recipes/update/${datas.id}`}
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
  )
}

export default Index