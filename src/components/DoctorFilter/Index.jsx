import React, { useEffect, useState } from "react";
import "./Index.css";
import { Link } from "react-router-dom";
import $ from "jquery";
import axios from "axios";

const Index = () => {
  const [data, setData] = useState([]);
  const [detail, setDetail] = useState([]);
  const [department, setDepartment] = useState([]);
  const [selectdepartment,setSelectpepartment]=useState(null);

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

  const openDoctorDetailFilter = (id) => {
    const openDoctorDetail = $(".doctor-detail-filter");

    openDoctorDetail.fadeIn("slow", () => {});
    document.body.style.overflow = "hidden";

    axios
      .get(`https://localhost:7227/api/DoctorAuths/${id}`)
      .then((resp) => {
        setDetail([resp.data]);
      })
      .catch((error) => {
        console.log("error");
      });
  };

  const closedoctorDetailFilter = () => {
    const openDoctorDetail = $(".doctor-detail-filter");

    openDoctorDetail.fadeOut("slow", () => {});

    document.body.style.overflow = "auto";
  };


  const filterDoctorByDepartment=()=>{
    if(selectdepartment)
    {
      const filteredDoctors=data.filter((doctor)=>doctor.department.name===selectdepartment);
      return filteredDoctors;
    }else{
      return data;
    }
  }

  return (
    <section>
      <div className="container-doctorFilter">
        <div className="all-doctorFilter">
          <div className="left-doctorFilter col-lg-3">
            <p>Doctors of</p>
            <ul>
              <li>
                <Link to="#"
                onClick={()=>setSelectpepartment(null)}
                >All Departments</Link>
              </li>
              <hr className="doctorFilter-hr" />
              {department.map((dep,index) => (
                <li key={index}>
                  <Link to="#"
                  onClick={()=>setSelectpepartment(dep.name)}
                  >{dep.name}</Link>
                  <hr className="doctorFilter-hr" />
                </li>

              ))}
            </ul>
          </div>
          <div className="right-doctorFilter col-lg-9">
            <div className="all-filter-doctors p-4">
              <div className="doctors-boxes-filter">
                {filterDoctorByDepartment().map((datas, index) => (
                  <div key={index} className="doctor-box-filter">
                    <div className="img-div-filter">
                      <img className="img-fluid" src={datas.imageUrl} alt="" />
                      <div className="view-details-filter">
                        <button
                          onClick={() => openDoctorDetailFilter(datas.id)}
                          className="detail-btn-filter"
                        >
                          Profile
                        </button>
                      </div>
                    </div>
                    <div className="doctor-name-filter">
                      <span>{datas.department.name}</span>
                      <br />
                      <Link to="/">{datas.name}</Link>
                    </div>
                    <hr />
                    <div className="doctor-social-filter">
                      <i class="fa-brands fa-facebook-f icon"></i>
                      <i class="fa-brands fa-twitter icon"></i>
                      <i class="fa-brands fa-google-plus-g icon"></i>
                      <i class="fa-brands fa-linkedin-in icon"></i>
                    </div>
                    {detail.map((details, index) => (
                      <div
                        key={index}
                        style={{ display: "block" }}
                        className="modal-doctor-detail-filter"
                      >
                        <div className="doctor-detail-filter">
                          <div className="all-doc-detail-filter">
                            <div className="img-doc-detail-filter">
                              <i
                                onClick={closedoctorDetailFilter}
                                style={{ cursor: "pointer" }}
                                className="fa-solid fa-xmark"
                              ></i>
                              <img
                                className="img-fluid"
                                src={details.imageUrl}
                                alt=""
                              />
                              <h3>{details.name}</h3>
                              <hr />
                              <div className="email-detail det-filter">
                                Email: <span>{details.email}</span>
                              </div>
                              <div className="department-detail det-filter">
                                Department:{" "}
                                <span>{details.department.name}</span>
                              </div>
                              <div className="position-detail det-filter">
                                Position: <span>{details.position.name}</span>
                              </div>
                              <div className="profile-desc-filter">
                                <h5>Profile</h5>
                                <p>
                                  Lorem Ipsum is simply dummy text of the
                                  printing and typesetting industry. Lorem Ipsum
                                  has been the industry's standard dummy text
                                  ever since the 1500s, when an unknown printer
                                  took a galley of type and scrambled it to make
                                  a type specimen book. Lorem Ipsum is simply
                                  dummy text of the printing and typesetting
                                  industry. Lorem Ipsum has been the industry's
                                  standard dummy text ever since the 1500s, when
                                  an unknown printer took a galley of type and
                                  scrambled it to make a type specimen book.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Index;
