import React from "react";
import "./Index.css";
import { Link } from "react-router-dom";
import $ from "jquery"

const Index = () => {

  const openDoctorDetail=()=>{
    const openDoctorDetail = $('.doctor-detail');
        
    openDoctorDetail.fadeIn('slow', () => {
    });
    document.body.style.overflow = "hidden";
  }

  const closedoctorDetail = () => {
    const openDoctorDetail = $('.doctor-detail');
    
    openDoctorDetail.fadeOut('slow', () => {
    });

    document.body.style.overflow = "auto";
  }

  return (
    <section className="doctors-section">
      <div className="containers-doctor">
        <div className="all-doctors">
          <h3>Our Awesome Doctors</h3>
          <div className="doctors-boxes">
            <div className="doctor-box">
              <div className="img-div">
                <img
                  className="img-fluid"
                  src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?size=338&ext=jpg&ga=GA1.1.386372595.1698019200&semt=sph"
                  alt=""
                />
                <div className="view-details">
                  <button onClick={openDoctorDetail} className="detail-btn">View Details</button>
                </div>
              </div>
              <div className="doctor-name">
                <span>Cardiology</span>
                <br />
                <Link to="/">Micheal Pewd</Link>
              </div>
              <hr />
              <div className="doctor-social">
                <i class="fa-brands fa-facebook-f icon"></i>
                <i class="fa-brands fa-twitter icon"></i>
                <i class="fa-brands fa-google-plus-g icon"></i>
                <i class="fa-brands fa-linkedin-in icon"></i>
              </div>
              <div className="modal-doctor-detail">
              <div className="doctor-detail">
                <div className="all-doc-detail">
                  <div className="img-doc-detail">
                  <i onClick={closedoctorDetail} style={{cursor:"pointer"}} className="fa-solid fa-xmark"></i>
                    <img className="img-fluid"
                      src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?size=338&ext=jpg&ga=GA1.1.386372595.1698019200&semt=sph"
                      alt=""
                    />
                    <h3>MICHEAL PEWD</h3>
                    <hr />
                    <div className="email-detail det">
                      Email: <span>doctor@example.com</span>
                    </div>
                    <div className="department-detail det">
                      Department: <span>doctor@example.com</span>
                    </div>
                    <div className="position-detail det">
                      Position: <span>doctor@example.com</span>
                    </div>
                    <div className="profile-desc">
                      <h5>Profile</h5>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </div>
            <div className="doctor-box">
              <div className="img-div">
                <img
                  className="img-fluid"
                  src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?size=338&ext=jpg&ga=GA1.1.386372595.1698019200&semt=sph"
                  alt=""
                />
              </div>
              <div className="doctor-name">
                <span>Cardiology</span>
                <br />
                <Link to="/">Micheal Pewd</Link>
              </div>
              <hr />
              <div className="doctor-social">
                <i class="fa-brands fa-facebook-f icon"></i>
                <i class="fa-brands fa-twitter icon"></i>
                <i class="fa-brands fa-google-plus-g icon"></i>
                <i class="fa-brands fa-linkedin-in icon"></i>
              </div>
            </div>
            <div className="doctor-box">
              <div className="img-div">
                <img
                  className="img-fluid"
                  src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?size=338&ext=jpg&ga=GA1.1.386372595.1698019200&semt=sph"
                  alt=""
                />
              </div>
              <div className="doctor-name">
                <span>Cardiology</span>
                <br />
                <Link to="/">Micheal Pewd</Link>
              </div>
              <hr />
              <div className="doctor-social">
                <i class="fa-brands fa-facebook-f icon"></i>
                <i class="fa-brands fa-twitter icon"></i>
                <i class="fa-brands fa-google-plus-g icon"></i>
                <i class="fa-brands fa-linkedin-in icon"></i>
              </div>
            </div>
            <div className="doctor-box">
              <div className="img-div">
                <img
                  className="img-fluid"
                  src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?size=338&ext=jpg&ga=GA1.1.386372595.1698019200&semt=sph"
                  alt=""
                />
              </div>
              <div className="doctor-name">
                <span>Cardiology</span>
                <br />
                <Link to="/">Micheal Pewd</Link>
              </div>
              <hr />
              <div className="doctor-social">
                <i class="fa-brands fa-facebook-f icon"></i>
                <i class="fa-brands fa-twitter icon"></i>
                <i class="fa-brands fa-google-plus-g icon"></i>
                <i class="fa-brands fa-linkedin-in icon"></i>
              </div>
            </div>
            <div className="doctor-box">
              <div className="img-div">
                <img
                  className="img-fluid"
                  src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?size=338&ext=jpg&ga=GA1.1.386372595.1698019200&semt=sph"
                  alt=""
                />
              </div>
              <div className="doctor-name">
                <span>Cardiology</span>
                <br />
                <Link to="/">Micheal Pewd</Link>
              </div>
              <hr />
              <div className="doctor-social">
                <i class="fa-brands fa-facebook-f icon"></i>
                <i class="fa-brands fa-twitter icon"></i>
                <i class="fa-brands fa-google-plus-g icon"></i>
                <i class="fa-brands fa-linkedin-in icon"></i>
              </div>
            </div>
            <div className="doctor-box">
              <div className="img-div">
                <img
                  className="img-fluid"
                  src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?size=338&ext=jpg&ga=GA1.1.386372595.1698019200&semt=sph"
                  alt=""
                />
              </div>
              <div className="doctor-name">
                <span>Cardiology</span>
                <br />
                <Link to="/">Micheal Pewd</Link>
              </div>
              <hr />
              <div className="doctor-social">
                <i class="fa-brands fa-facebook-f icon"></i>
                <i class="fa-brands fa-twitter icon"></i>
                <i class="fa-brands fa-google-plus-g icon"></i>
                <i class="fa-brands fa-linkedin-in icon"></i>
              </div>
            </div>
            <div className="doctor-box">
              <div className="img-div">
                <img
                  className="img-fluid"
                  src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?size=338&ext=jpg&ga=GA1.1.386372595.1698019200&semt=sph"
                  alt=""
                />
              </div>
              <div className="doctor-name">
                <span>Cardiology</span>
                <br />
                <Link to="/">Micheal Pewd</Link>
              </div>
              <hr />
              <div className="doctor-social">
                <i class="fa-brands fa-facebook-f icon"></i>
                <i class="fa-brands fa-twitter icon"></i>
                <i class="fa-brands fa-google-plus-g icon"></i>
                <i class="fa-brands fa-linkedin-in icon"></i>
              </div>
            </div>
            <div className="doctor-box">
              <div className="img-div">
                <img
                  className="img-fluid"
                  src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?size=338&ext=jpg&ga=GA1.1.386372595.1698019200&semt=sph"
                  alt=""
                />
              </div>
              <div className="doctor-name">
                <span>Cardiology</span>
                <br />
                <Link to="/">Micheal Pewd</Link>
              </div>
              <hr />
              <div className="doctor-social">
                <i class="fa-brands fa-facebook-f icon"></i>
                <i class="fa-brands fa-twitter icon"></i>
                <i class="fa-brands fa-google-plus-g icon"></i>
                <i class="fa-brands fa-linkedin-in icon"></i>
              </div>
            </div>
          </div>
          <div className="doctors-load-more">
            <Link to="/" className="load-more-btn">
              Load More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Index;
