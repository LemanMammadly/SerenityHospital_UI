import React from "react";
import "./Index.css";
import { Link } from "react-router-dom";
import $ from "jquery";

const Index = () => {
  const openDoctorDetailFilter = () => {
    const openDoctorDetail = $(".doctor-detail-filter");

    openDoctorDetail.fadeIn("slow", () => {});
    document.body.style.overflow = "hidden";
  };

  const closedoctorDetailFilter = () => {
    const openDoctorDetail = $(".doctor-detail-filter");

    openDoctorDetail.fadeOut("slow", () => {});

    document.body.style.overflow = "auto";
  };

  return (
    <section>
      <div className="container-doctorFilter">
        <div className="all-doctorFilter">
          <div className="left-doctorFilter col-lg-3">
            <p>Doctors of</p>
            <ul>
              <li>
                <Link to="/">All Departments</Link>
              </li>
              <hr className="doctorFilter-hr" />
              <li>
                <Link to="/">Anesthetics</Link>
              </li>
              <hr className="doctorFilter-hr" />
              <li>
                <Link to="/">Cardiology</Link>
              </li>
              <hr className="doctorFilter-hr" />
              <li>
                <Link to="/">Gastroenterology</Link>
              </li>
            </ul>
          </div>
          <div className="right-doctorFilter col-lg-9">
            <div className="all-filter-doctors p-4">
              <div className="doctors-boxes-filter">
                <div className="doctor-box-filter">
                  <div className="img-div-filter">
                    <img
                      className="img-fluid"
                      src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?size=338&ext=jpg&ga=GA1.1.386372595.1698019200&semt=sph"
                      alt=""
                    />
                    <div className="view-details-filter">
                      <button
                        onClick={openDoctorDetailFilter}
                        className="detail-btn-filter"
                      >
                        Profile
                      </button>
                    </div>
                  </div>
                  <div className="doctor-name-filter">
                    <span>Cardiology</span>
                    <br />
                    <Link to="/">Micheal Pewd</Link>
                  </div>
                  <hr />
                  <div className="doctor-social-filter">
                    <i class="fa-brands fa-facebook-f icon"></i>
                    <i class="fa-brands fa-twitter icon"></i>
                    <i class="fa-brands fa-google-plus-g icon"></i>
                    <i class="fa-brands fa-linkedin-in icon"></i>
                  </div>
                  <div className="modal-doctor-detail-filter">
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
                            src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?size=338&ext=jpg&ga=GA1.1.386372595.1698019200&semt=sph"
                            alt=""
                          />
                          <h3>MICHEAL PEWD</h3>
                          <hr />
                          <div className="email-detail det-filter">
                            Email: <span>doctor@example.com</span>
                          </div>
                          <div className="department-detail det-filter">
                            Department: <span>doctor@example.com</span>
                          </div>
                          <div className="position-detail det-filter">
                            Position: <span>doctor@example.com</span>
                          </div>
                          <div className="profile-desc-filter">
                            <h5>Profile</h5>
                            <p>
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy text ever since the
                              1500s, when an unknown printer took a galley of
                              type and scrambled it to make a type specimen
                              book. Lorem Ipsum is simply dummy text of the
                              printing and typesetting industry. Lorem Ipsum has
                              been the industry's standard dummy text ever since
                              the 1500s, when an unknown printer took a galley
                              of type and scrambled it to make a type specimen
                              book.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="doctor-box-filter">
                  <div className="img-div-filter">
                    <img
                      className="img-fluid"
                      src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?size=338&ext=jpg&ga=GA1.1.386372595.1698019200&semt=sph"
                      alt=""
                    />
                    <div className="view-details-filter">
                      <button
                        onClick={openDoctorDetailFilter}
                        className="detail-btn-filter"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                  <div className="doctor-name-filter">
                    <span>Cardiology</span>
                    <br />
                    <Link to="/">Micheal Pewd</Link>
                  </div>
                  <hr />
                  <div className="doctor-social-filter">
                    <i class="fa-brands fa-facebook-f icon"></i>
                    <i class="fa-brands fa-twitter icon"></i>
                    <i class="fa-brands fa-google-plus-g icon"></i>
                    <i class="fa-brands fa-linkedin-in icon"></i>
                  </div>
                  <div className="modal-doctor-detail-filter">
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
                            src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?size=338&ext=jpg&ga=GA1.1.386372595.1698019200&semt=sph"
                            alt=""
                          />
                          <h3>MICHEAL PEWD</h3>
                          <hr />
                          <div className="email-detail det-filter">
                            Email: <span>doctor@example.com</span>
                          </div>
                          <div className="department-detail det-filter">
                            Department: <span>doctor@example.com</span>
                          </div>
                          <div className="position-detail det-filter">
                            Position: <span>doctor@example.com</span>
                          </div>
                          <div className="profile-desc-filter">
                            <h5>Profile</h5>
                            <p>
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy text ever since the
                              1500s, when an unknown printer took a galley of
                              type and scrambled it to make a type specimen
                              book. Lorem Ipsum is simply dummy text of the
                              printing and typesetting industry. Lorem Ipsum has
                              been the industry's standard dummy text ever since
                              the 1500s, when an unknown printer took a galley
                              of type and scrambled it to make a type specimen
                              book.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="doctor-box-filter">
                  <div className="img-div-filter">
                    <img
                      className="img-fluid"
                      src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?size=338&ext=jpg&ga=GA1.1.386372595.1698019200&semt=sph"
                      alt=""
                    />
                    <div className="view-details-filter">
                      <button
                        onClick={openDoctorDetailFilter}
                        className="detail-btn-filter"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                  <div className="doctor-name-filter">
                    <span>Cardiology</span>
                    <br />
                    <Link to="/">Micheal Pewd</Link>
                  </div>
                  <hr />
                  <div className="doctor-social-filter">
                    <i class="fa-brands fa-facebook-f icon"></i>
                    <i class="fa-brands fa-twitter icon"></i>
                    <i class="fa-brands fa-google-plus-g icon"></i>
                    <i class="fa-brands fa-linkedin-in icon"></i>
                  </div>
                  <div className="modal-doctor-detail-filter">
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
                            src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?size=338&ext=jpg&ga=GA1.1.386372595.1698019200&semt=sph"
                            alt=""
                          />
                          <h3>MICHEAL PEWD</h3>
                          <hr />
                          <div className="email-detail det-filter">
                            Email: <span>doctor@example.com</span>
                          </div>
                          <div className="department-detail det-filter">
                            Department: <span>doctor@example.com</span>
                          </div>
                          <div className="position-detail det-filter">
                            Position: <span>doctor@example.com</span>
                          </div>
                          <div className="profile-desc-filter">
                            <h5>Profile</h5>
                            <p>
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy text ever since the
                              1500s, when an unknown printer took a galley of
                              type and scrambled it to make a type specimen
                              book. Lorem Ipsum is simply dummy text of the
                              printing and typesetting industry. Lorem Ipsum has
                              been the industry's standard dummy text ever since
                              the 1500s, when an unknown printer took a galley
                              of type and scrambled it to make a type specimen
                              book.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="doctor-box-filter">
                  <div className="img-div-filter">
                    <img
                      className="img-fluid"
                      src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?size=338&ext=jpg&ga=GA1.1.386372595.1698019200&semt=sph"
                      alt=""
                    />
                    <div className="view-details-filter">
                      <button
                        onClick={openDoctorDetailFilter}
                        className="detail-btn-filter"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                  <div className="doctor-name-filter">
                    <span>Cardiology</span>
                    <br />
                    <Link to="/">Micheal Pewd</Link>
                  </div>
                  <hr />
                  <div className="doctor-social-filter">
                    <i class="fa-brands fa-facebook-f icon"></i>
                    <i class="fa-brands fa-twitter icon"></i>
                    <i class="fa-brands fa-google-plus-g icon"></i>
                    <i class="fa-brands fa-linkedin-in icon"></i>
                  </div>
                  <div className="modal-doctor-detail-filter">
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
                            src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?size=338&ext=jpg&ga=GA1.1.386372595.1698019200&semt=sph"
                            alt=""
                          />
                          <h3>MICHEAL PEWD</h3>
                          <hr />
                          <div className="email-detail det-filter">
                            Email: <span>doctor@example.com</span>
                          </div>
                          <div className="department-detail det-filter">
                            Department: <span>doctor@example.com</span>
                          </div>
                          <div className="position-detail det-filter">
                            Position: <span>doctor@example.com</span>
                          </div>
                          <div className="profile-desc-filter">
                            <h5>Profile</h5>
                            <p>
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy text ever since the
                              1500s, when an unknown printer took a galley of
                              type and scrambled it to make a type specimen
                              book. Lorem Ipsum is simply dummy text of the
                              printing and typesetting industry. Lorem Ipsum has
                              been the industry's standard dummy text ever since
                              the 1500s, when an unknown printer took a galley
                              of type and scrambled it to make a type specimen
                              book.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="doctor-box-filter">
                  <div className="img-div-filter">
                    <img
                      className="img-fluid"
                      src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?size=338&ext=jpg&ga=GA1.1.386372595.1698019200&semt=sph"
                      alt=""
                    />
                    <div className="view-details-filter">
                      <button
                        onClick={openDoctorDetailFilter}
                        className="detail-btn-filter"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                  <div className="doctor-name-filter">
                    <span>Cardiology</span>
                    <br />
                    <Link to="/">Micheal Pewd</Link>
                  </div>
                  <hr />
                  <div className="doctor-social-filter">
                    <i class="fa-brands fa-facebook-f icon"></i>
                    <i class="fa-brands fa-twitter icon"></i>
                    <i class="fa-brands fa-google-plus-g icon"></i>
                    <i class="fa-brands fa-linkedin-in icon"></i>
                  </div>
                  <div className="modal-doctor-detail-filter">
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
                            src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?size=338&ext=jpg&ga=GA1.1.386372595.1698019200&semt=sph"
                            alt=""
                          />
                          <h3>MICHEAL PEWD</h3>
                          <hr />
                          <div className="email-detail det-filter">
                            Email: <span>doctor@example.com</span>
                          </div>
                          <div className="department-detail det-filter">
                            Department: <span>doctor@example.com</span>
                          </div>
                          <div className="position-detail det-filter">
                            Position: <span>doctor@example.com</span>
                          </div>
                          <div className="profile-desc-filter">
                            <h5>Profile</h5>
                            <p>
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy text ever since the
                              1500s, when an unknown printer took a galley of
                              type and scrambled it to make a type specimen
                              book. Lorem Ipsum is simply dummy text of the
                              printing and typesetting industry. Lorem Ipsum has
                              been the industry's standard dummy text ever since
                              the 1500s, when an unknown printer took a galley
                              of type and scrambled it to make a type specimen
                              book.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="doctor-box-filter">
                  <div className="img-div-filter">
                    <img
                      className="img-fluid"
                      src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?size=338&ext=jpg&ga=GA1.1.386372595.1698019200&semt=sph"
                      alt=""
                    />
                    <div className="view-details-filter">
                      <button
                        onClick={openDoctorDetailFilter}
                        className="detail-btn-filter"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                  <div className="doctor-name-filter">
                    <span>Cardiology</span>
                    <br />
                    <Link to="/">Micheal Pewd</Link>
                  </div>
                  <hr />
                  <div className="doctor-social-filter">
                    <i class="fa-brands fa-facebook-f icon"></i>
                    <i class="fa-brands fa-twitter icon"></i>
                    <i class="fa-brands fa-google-plus-g icon"></i>
                    <i class="fa-brands fa-linkedin-in icon"></i>
                  </div>
                  <div className="modal-doctor-detail-filter">
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
                            src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?size=338&ext=jpg&ga=GA1.1.386372595.1698019200&semt=sph"
                            alt=""
                          />
                          <h3>MICHEAL PEWD</h3>
                          <hr />
                          <div className="email-detail det-filter">
                            Email: <span>doctor@example.com</span>
                          </div>
                          <div className="department-detail det-filter">
                            Department: <span>doctor@example.com</span>
                          </div>
                          <div className="position-detail det-filter">
                            Position: <span>doctor@example.com</span>
                          </div>
                          <div className="profile-desc-filter">
                            <h5>Profile</h5>
                            <p>
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy text ever since the
                              1500s, when an unknown printer took a galley of
                              type and scrambled it to make a type specimen
                              book. Lorem Ipsum is simply dummy text of the
                              printing and typesetting industry. Lorem Ipsum has
                              been the industry's standard dummy text ever since
                              the 1500s, when an unknown printer took a galley
                              of type and scrambled it to make a type specimen
                              book.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Index;
