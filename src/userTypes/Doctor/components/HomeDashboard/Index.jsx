import React, { useEffect, useState } from "react";
import "./Index.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { GiPin } from "react-icons/gi";

const Index = () => {
  const [date, changeDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [appoinmentsdate, setAppoinmentsdate] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const currentDate = new Date();
  const dates = format(currentDate, "yyyy-MM-dd");
  const time = format(currentDate, "HH:mm:ss");
  const dateNow = `${dates}T${time}`;

  function changeValue(val) {
    changeDate(val);
  }

  useEffect(() => {
    axios
      .get(
        `https://localhost:7227/api/DoctorAuths/GetByName?userName=${user.username}`
      )
      .then((res) => {
        setData(res.data);
        setAppoinmentsdate(
          res.data.appoinments &&
            res.data.appoinments.map((app) => app.appoinmentDate)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const tileContent = ({ date, view }) => {
    const uniqueAppointments = [...new Set(appoinmentsdate)];

    const isAppointmentDate = uniqueAppointments.some((appDate) => {
      const app = new Date(appDate);
      return (
        app.getDate() === date.getDate() &&
        app.getMonth() === date.getMonth() &&
        app.getFullYear() === date.getFullYear()
      );
    });

    if (isAppointmentDate) {
      return (
        <div className="appointment-date">
          {<GiPin style={{ color: "red", width: "40px" }} />}
        </div>
      );
    }
  };

  return (
    <div className="all-doctor-home">
      <div className="top-doctor-home">
        <h2 className="doctor-dashboard-h1">Doctor Dashboard</h2>
      </div>
      <div className="bottom-doctor-home">
        <div className="doctor-home-bottom-top d-flex justify-content-between col-lg-12">
          <div className="calendar-doctor col-lg-6">
            <Calendar
              tileContent={tileContent}
              onChange={changeValue}
              value={date}
            />
          </div>
          <div className="soon-appoinments-doctor-home d-flex flex-column col-lg-6">
            <div className="top-soon-appoinments-doctor-home d-flex justify-content-between">
              <div className="topleft-app-soon">Soon Appoinments</div>
              <div className="topright-app-soon">
                <Link to="/doctor/appoinments">All Appoinments</Link>
              </div>
            </div>
            <div className="bottom-soon-appoinments-doctor-home">
              <div className="appoinment-soon-boxes d-flex flex-column gap-4">
                {data.appoinments &&
                  data.appoinments.filter(
                    (app) => app.appoinmentDate > dateNow
                  ) &&
                  (
                    data.appoinments &&
                    data.appoinments.filter(
                      (app) => app.appoinmentDate > dateNow
                    )
                  )
                    .slice(0, 2)
                    .map((app) => (
                      <div className="appoinment-soon-box d-flex flex-column gap-3">
                        <div className="left-soon-appoinment-box d-flex justify-content-between">
                          <p className="date-appsoon">
                            <i
                              style={{ color: "#69B1FF" }}
                              class="fa-solid fa-calendar-days mx-1"
                            ></i>{" "}
                            <span>
                              {app.appoinmentDate &&
                                app.appoinmentDate.split("T")[0]}
                            </span>{" "}
                            |{" "}
                            <i
                              style={{ color: "#FF6575" }}
                              class="fa-regular fa-clock mx-1"
                            ></i>{" "}
                            <span>
                              {app.appoinmentDate &&
                                app.appoinmentDate
                                  .split("T")[1]
                                  .substring(0, 5)}
                            </span>
                          </p>
                          <p
                            style={{
                              textAlign: "center",
                              color: "#A098AD",
                              fontSize: "15px",
                            }}
                          >
                            Duration :{" "}
                            <span
                              style={{ color: "#6DB3FF", fontSize: "15px" }}
                            >
                              {app.duration && app.duration} minute
                            </span>
                          </p>
                        </div>
                        <div className="right-soon-appoinment-box">
                          <p>{app.problemDesc}</p>
                        </div>
                      </div>
                    ))}
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
                  <span>{data.appoinments && data.appoinments.length}</span>
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
                  <span>{data.appoinments && data.appoinments.length}</span>
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
                  <span>{data.department && data.department.name}</span>
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
                  <span>{data.position && data.position.name}</span>
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
