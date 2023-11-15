import React, { useEffect, useState } from "react";
import "./Index.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { Button } from "antd";

const Index = () => {
  const [data, setData] = useState([]);
  const [department, setDepartment] = useState([]);
  const [selectdepartment, setSelectpepartment] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    axios
      .get("https://localhost:7227/api/DoctorAuths")
      .then((resp) => {
        setData(resp.data);
      })
      .catch((error) => {
        console.log("error");
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://localhost:7227/api/Departments")
      .then((resp) => {
        setDepartment(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const filterDoctorByDepartment = () => {
    if (selectdepartment) {
      const filteredDoctors = data.filter(
        (doctor) => doctor.department.name === selectdepartment
      );
      return filteredDoctors;
    } else {
      return data;
    }
  };

  useEffect(() => {
    AOS.init();
  }, []);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterDoctorByDepartment().slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(
    filterDoctorByDepartment().length / itemsPerPage
  );

  const filterDoctorsByName = () => {
    if (searchTerm) {
      const filteredDoctors = currentItems.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctor.surname.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return filteredDoctors;
    } else {
      return currentItems;
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <section>
      <div className="container-doctorFilter">
        <div className="all-doctorFilter">
          <div className="left-doctorFilter col-lg-3">
            <p>Doctors of</p>
            <ul>
              <li>
                <Link to="#" onClick={() => setSelectpepartment(null)}>
                  All Departments
                </Link>
              </li>
              <hr className="doctorFilter-hr" />
              {department.map((dep, index) => (
                <li key={index}>
                  <Link to="#" onClick={() => setSelectpepartment(dep.name)}>
                    {dep.name}
                  </Link>
                  <hr className="doctorFilter-hr" />
                </li>
              ))}
            </ul>
          </div>
          <div className="right-doctorFilter col-lg-9">
            <div className="all-seacrh-div-input w-100">
            <div className="seacrh-doctor-filter w-25">
              <input
                style={{backgroundColor:"#F3F6F7"}}
                className="form-control shadow-none"
                type="text"
                placeholder="Search Doctor . . ."
                value={searchTerm}
                onChange={handleSearch}
              />
              <i style={{color:"gray",cursor:"pointer"}} class="fa-solid fa-magnifying-glass"></i>
            </div>
            </div>
            <div className="all-filter-doctors p-4">
              <div className="doctors-boxes-filter">
                {filterDoctorsByName().map((datas, index) => (
                  <div
                    key={index}
                    className="doctor-box-filter"
                    data-aos="zoom-in"
                  >
                    <div className="img-div-filter">
                      <img className="img-fluid" src={datas.imageUrl} alt="" />
                      <div className="view-details-filter">
                        <button
                          onClick={() => nav(`/detail/${datas.id}`)}
                          className="detail-btn-filter"
                        >
                          Profile
                        </button>
                      </div>
                    </div>
                    <div className="doctor-name-filter">
                      <span>{datas.department.name}</span>
                      <br />
                      <Link to="/">
                        {datas.name}   {datas.surname}
                      </Link>
                    </div>
                    <hr />
                    <div className="doctor-social-filter">
                      <i class="fa-brands fa-facebook-f icon"></i>
                      <i class="fa-brands fa-twitter icon"></i>
                      <i class="fa-brands fa-google-plus-g icon"></i>
                      <i class="fa-brands fa-linkedin-in icon"></i>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pagination d-flex align-items-center justify-content-center gap-3">
                <Button onClick={handlePrevPage} disabled={currentPage === 1}>
                  Prev
                </Button>
                <Button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Index;
