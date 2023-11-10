import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { DatePicker } from 'antd';

const Index = () => {
    const [inputs, setInputs] = useState({
        departmentId: "",
        doctorId: "",
        problemDesc: "",
        appoinmentDate: "",
      });
      const [errorMessages, setErrorMessages] = useState([]);
      const [exception, setException] = useState("");
      const [departmentsall, setDepartmentsall] = useState([]);
      const [doctors, setDoctors] = useState([]);
      const [selectdoctors, setSelectdoctors] = useState("");
      const [selectedDepartments, setSelectedDepartments] = useState([]);
      const [isDoctorSelectDisabled, setIsDoctorSelectDisabled] = useState(true);
    
      const nav = useNavigate();
      const user = JSON.parse(localStorage.getItem("user"));
      const userToken=user.token

    
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
        formData.append("problemDesc", inputs.problemDesc);
        formData.append("appoinmentDate", inputs.appoinmentDate);
        axios
          .post("https://localhost:7227/api/Appoinments", formData, {
            headers: {
              "Authorization": `Bearer ${userToken}`,
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
  return (
    <section>
      <div className="all-app-create">
        <Link
          to="/patient/appoinments"
          className="back-to-superadmin"
          style={{ textDecoration: "none", color: "#333" }}
        >
          <i
            className="fa-solid fa-chevron-left"
            style={{ marginRight: "10px" }}
          ></i>
          Patient / Appoinments
        </Link>
        <div className="top-app-create">
          <h1>Add Appoinment</h1>
        </div>
        <div className="bottom-app-create">
          <form method="POST" onSubmit={(e) => handleSubmit(e)}>
            <div className="panel-body d-flex flex-column gap-4">
              <div className="form-group d-flex align-items-center justify-content-center">
                <label htmlFor="depId" className="col-sm-3 control-label">
                  Departments
                </label>
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
                        {exception && exception.includes("Department") ? exception : ""}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group d-flex align-items-center justify-content-center">
                <label htmlFor="doctorId" className="col-sm-3 control-label">
                  Doctors
                </label>
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
                        {exception && exception.includes("Department") ? exception : ""}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group d-flex align-items-center justify-content-center">
                <label htmlFor="problem" className="col-sm-3 control-label">
                  Problem
                </label>
                <div className="col-sm-5">
                  <input
                    id="problem"
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    name="problemDesc"
                    required=""
                    placeholder="Problem Description"
                  />
                  {errorMessages.ProblemDesc ? (
                    <div className="error-messages">
                      <p className="error-message">
                        {errorMessages.ProblemDesc}
                      </p>
                    </div>
                  ) : (
                    <div className="error-messages">
                      <p className="error-message">
                        {exception && exception.includes("name") ? exception : ""}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group d-flex align-items-center justify-content-center">
                <label className="col-sm-3 control-label">
                  Appoinment Date
                </label>
                <div className="col-sm-5">
                  <DatePicker
                    showTime
                    name="appoinmentDate"
                    format="YYYY-MM-DD HH:mm:ss"
                    placeholder="Select Date and Time"
                    onChange={(date, dateString) =>
                      handleChange({
                        target: { name: "appoinmentDate", value: dateString },
                      })
                    }
                  />
                </div>
              </div>
              <div className="add-btn-app d-flex flex-column">
                {errorMessages.AppoinmentDate ? (
                    <div className="error-messages">
                      <p className="error-message">
                        {errorMessages.AppoinmentDate}
                      </p>
                    </div>
                  ) : (
                    <div className="error-messages">
                      <p className="error-message">
                        {(exception && exception.includes("Invalid")) || (exception && exception.includes("busy")) || (exception && exception.includes("past")) ? exception : ""}
                      </p>
                    </div>
                  )}
                <button type="submit">
                  Create <i className="fa-solid fa-check"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Index