import React, { useState } from "react";
import "./Index.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Link from "antd/es/typography/Link";

const Index = () => {
  const [date, changeDate] = useState(new Date());

  function changeValue(val) {
    changeDate(val);
  }

  return (
    <div className="all-doctor-home">
      <div className="top-doctor-home">
        <h2 className="doctor-dashboard-h1">Doctor Dashboard</h2>
      </div>
      <div className="bottom-doctor-home">
        <div className="doctor-home-bottom-top d-flex justify-content-between col-lg-12">
          <div className="calendar-doctor col-lg-6">
            <Calendar onChange={changeValue} value={date} />
            {/* <p>The selected date is - {date.toLocaleDateString()}</p> */}
          </div>
          <div className="soon-appoinments-doctor-home d-flex flex-column col-lg-6">
            <div className="top-soon-appoinments-doctor-home d-flex justify-content-between">
                <div className="topleft-app-soon">
                    Soon Appoinments
                </div>
                <div className="topright-app-soon">
                    <Link to="#">All Appoinments</Link>
                </div>
            </div>
            <div className="bottom-soon-appoinments-doctor-home">
                <div className="appoinment-soon-boxes d-flex flex-column gap-4">
                    <div className="appoinment-soon-box">
                        <div className="left-soon-appoinment-box">
                            <p className="date-appsoon"><i style={{color:"#69B1FF"}} class="fa-solid fa-calendar-days mx-1"></i> <span>5september</span> | <i style={{color:"#FF6575"}}  class="fa-regular fa-clock mx-1"></i> <span>09:00</span> - <span>10:00</span> </p>
                        </div>
                        <div className="right-soon-appoinment-box">
                            <p>Xeste adi</p>
                        </div>
                    </div>
                    <div className="appoinment-soon-box">
                        <div className="left-soon-appoinment-box">
                            <p className="date-appsoon"><i style={{color:"#69B1FF"}} class="fa-solid fa-calendar-days mx-1"></i> <span>5september</span> | <i style={{color:"#FF6575"}}  class="fa-regular fa-clock mx-1"></i> <span>09:00</span> - <span>10:00</span> </p>
                        </div>
                        <div className="right-soon-appoinment-box">
                            <p>Xeste adi</p>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
        <div className="doctor-home-bottom-bottom">
          <div className="doctor-datas-home mt-5">
            <div className="doctor-datas-boxes d-flex gap-4">
              <div className="doctor-data-box d-flex align-items-center justify-content-between w-25">
                <div className="left-doctor-home-box">
                  <h5>Appoinments</h5>
                  <span>5</span>
                </div>
                <div className="right-doctor-home-box">
                  <i
                    style={{ color: "#3C5EE1;" }}
                    class="fa-regular fa-calendar-check"
                  ></i>
                </div>
              </div>
              <div className="doctor-data-box d-flex w-25 align-items-center justify-content-between">
                <div className="left-doctor-home-box">
                  <h5>Patients</h5>
                  <span>3</span>
                </div>
                <div className="right-doctor-home-box">
                  <i
                    style={{ color: "#FF6575" }}
                    class="fa-solid fa-bed-pulse"
                  ></i>
                </div>
              </div>
              <div className="doctor-data-box d-flex w-25 align-items-center justify-content-between">
                <div className="left-doctor-home-box">
                  <h5>Department</h5>
                  <span>dep name</span>
                </div>
                <div className="right-doctor-home-box">
                  <i
                    style={{ color: "#0173B7" }}
                    class="fa-solid fa-house-medical"
                  ></i>
                </div>
              </div>
              <div className="doctor-data-box d-flex w-25 align-items-center justify-content-between">
                <div className="left-doctor-home-box">
                  <h5>Position</h5>
                  <span>dep name</span>
                </div>
                <div className="right-doctor-home-box">
                  <i
                    style={{ color: "#00C0EF" }}
                    class="fa-solid fa-map-pin"
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
