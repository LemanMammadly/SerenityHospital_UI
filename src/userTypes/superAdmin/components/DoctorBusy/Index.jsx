import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

const localizer = momentLocalizer(moment);

const Index = () => {
    const [inputs, setInputs] = useState({
        departmentId: "",
        doctorId: "",
      });
      const [errorMessages, setErrorMessages] = useState([]);
      const [exception, setException] = useState("");
      const [departmentsall, setDepartmentsall] = useState([]);
      const [doctors, setDoctors] = useState([]);
      const [selectdoctors, setSelectdoctors] = useState("");
      const [selectedDepartments, setSelectedDepartments] = useState([]);
      const [isDoctorSelectDisabled, setIsDoctorSelectDisabled] = useState(true);
      const [selectedDoctorAppointments, setSelectedDoctorAppointments] = useState([]);
      const [selectedDoctorId, setSelectedDoctorId] = useState("");
    
      const nav = useNavigate();
      const user = JSON.parse(localStorage.getItem("user"));
      const userToken = user.token;
    
      const handleChange = (e) => {
        const { name, value, type } = e.target;
        const newValue = type === "checkbox" ? e.target.checked : value;
    
        setInputs((prev) => ({
          ...prev,
          [name]: newValue,
        }));
    
        setErrorMessages((prev) => ({
          ...prev,
          [name]: null,
        }));
        if (name === "departmentId") {
          setSelectedDepartments(value);
          setIsDoctorSelectDisabled(false);
        }
    
        if (name === "doctorId") {
          setSelectdoctors(value);
          setSelectedDoctorId(value);
        }
      };
    
      useEffect(() => {
        axios
          .get(`https://localhost:7227/api/Departments/`)
          .then((res) => {
            setDepartmentsall(res.data);
          })
          .catch((err) => console.log(err));
      }, []);
    
      useEffect(() => {
        axios
          .get(`https://localhost:7227/api/DoctorAuths/`)
          .then((res) => {
            const allDoctors = res.data;
    
            const filteredDoctors = allDoctors.filter(
              (doctor) => doctor.department.id === parseInt(selectedDepartments, 10)
            );
    
            setDoctors(filteredDoctors);
          })
          .catch((err) => console.log(err));
      }, [selectedDepartments]);
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("departmentId", selectedDepartments);
        formData.append("doctorId", selectdoctors);
        axios
          .post("https://localhost:7227/api/Appoinments", formData, {
            headers: {
              Authorization: `Bearer ${userToken}`,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => nav("/patient/appoinments"))
          .catch((e) => {
            if (e.response && e.response.data && e.response.data.errors) {
              setErrorMessages(e.response.data.errors);
            } else {
              setException(e.response.data.message);
            }
          });
      };
    
    

      const handleChooseButtonClick = (e) => {
        e.preventDefault();
      
        if (selectedDoctorId) {
          axios
            .get(`https://localhost:7227/api/DoctorAuths/${selectedDoctorId}`, {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            })
            .then((res) => {
              const doctorAppointments = res.data && res.data.appoinments;
      
              const selectedDoctorAppointments = doctorAppointments
                .filter((app) => ![ 3, 4].includes(app.status))
                .map((app) => ({
                  start: new Date(app.appoinmentDate),
                  end: moment(app.appoinmentDate)
                    .add(app.duration, "minutes")
                    .toDate(),
                    title: `${moment(app.appoinmentDate).format("HH:mm")} - ${moment(app.appoinmentDate).add(app.duration, "minutes").format("HH:mm")}`,
                }));
      
              setSelectedDoctorAppointments(selectedDoctorAppointments);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      };
      return (
        <section>
          <div className="all-app-available">
            <div className="top-app-available">
              <h1>Busy Date</h1>
            </div>
            <div className="bottom-app-available">
              <form method="POST" onSubmit={(e) => handleSubmit(e)}>
                <div className="panel-body d-flex flex-column gap-4">
                  <div className="form-group d-flex align-items-center justify-content-center">
                    <div className="col-sm-5">
                      <select
                        id="depId"
                        className="form-control"
                        onChange={handleChange}
                        name="departmentId"
                        required=""
                        value={selectedDepartments}
                      >
                        <option value="">Select Department: </option>
                        {departmentsall
                          .filter((data) => data.isDeleted === false)
                          .map((deps) => (
                            <option key={deps.id} value={deps.id}>
                              {deps.name}
                            </option>
                          ))}
                      </select>
                      {errorMessages.DepartmentId ? (
                        <div className="error-messages">
                          <p className="error-message">
                            {errorMessages.DepartmentId}
                          </p>
                        </div>
                      ) : (
                        <div className="error-messages">
                          <p className="error-message">
                            {exception && exception.includes("Department")
                              ? exception
                              : ""}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="form-group d-flex align-items-center justify-content-center">
                    <div className="col-sm-5">
                      <select
                        id="doctorId"
                        className="form-control"
                        onChange={handleChange}
                        name="doctorId"
                        required=""
                        value={selectdoctors}
                        disabled={isDoctorSelectDisabled}
                      >
                        <option value="">Select Doctor: </option>
                        {doctors
                          .filter((data) => data.isDeleted === false)
                          .map((doc) => (
                            <option key={doc.id} value={doc.id}>
                              {doc.name} {doc.surname}
                            </option>
                          ))}
                      </select>
                      {errorMessages.DoctorId ? (
                        <div className="error-messages">
                          <p className="error-message">{errorMessages.DoctorId}</p>
                        </div>
                      ) : (
                        <div className="error-messages">
                          <p className="error-message">
                            {exception && exception.includes("Department")
                              ? exception
                              : ""}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="add-btn-app d-flex flex-column mb-5">
                    <button type="submit" onClick={handleChooseButtonClick}>
                      Choose <i className="fa-solid fa-check"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="myCustomHeight p-4 all-calendar-div">
              {selectedDoctorAppointments.length > 0 ? (
                <Calendar
                  localizer={localizer}
                  events={selectedDoctorAppointments}
                  startAccessor="start"
                  endAccessor="end"
                  defaultView="month"
                />
              ) : (
                <div className="not-appoinments">
                  <p>Doctor's appointments are not available.</p>
                  <Calendar
                    localizer={localizer}
                    events={selectedDoctorAppointments}
                    startAccessor="start"
                    endAccessor="end"
                    defaultView="month"
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      );
}

export default Index