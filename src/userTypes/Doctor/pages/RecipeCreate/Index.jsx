import React, { useEffect, useState } from "react";
import "./Index.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Index = () => {
  const [inputs, setInputs] = useState({
    recipeDesc:""
  });
  const [errorMessages, setErrorMessages] = useState([]);
  const [exception, setException] = useState("");
  const [appoinments, setAppoinments] = useState([]);
  const [selectedAppoinment, setSelectedAppoinment] = useState("");
  const [doctor, setDoctor] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [patient, setPatient] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");

  const nav = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const username = user.username;

  const handleChange = (e) => {
    const { name, value, type ,} = e.target;
    const newValue = type === "checkbox" ? e.target.checked : value;

    setInputs((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    setErrorMessages((prev) => ({
      ...prev,
      [name]: null,
    }));

    if (name === "appoinmentId") {
      setSelectedAppoinment(value);
    }

    if (name === "doctorId") {
      setSelectedDoctor(value);
    }

    if (name === "patientId") {
      setSelectedPatient(value);
    }
  };

  useEffect(() => {
    axios
      .get(`https://localhost:7227/api/Appoinments`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setAppoinments(res.data.filter(((app)=>app.doctor.userName===username)));
      })
      .catch((err) => console.log(err));
  }, []);


  useEffect(() => {
    axios
      .get(`https://localhost:7227/api/DoctorAuths`)
      .then((res) => {
        setDoctor(res.data);
      })
      .catch((err) => console.log(err));
  }, []);


  useEffect(() => {
    axios
      .get("https://localhost:7227/api/PatientAuths", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        const allPatients = res.data;
        const filteredPatients = allPatients.filter(
          (patient) =>
            patient.appoinments &&
            patient.appoinments.some(
              (app) => app.doctor && app.doctor.userName === username
            )
        );
        setPatient(filteredPatients)
      })
      .catch((err) => {
        console.error(err);
      });
  }, [username]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("appoinmentId", selectedAppoinment);
    formData.append("doctorId", selectedDoctor);
    formData.append("patientId", selectedPatient);
    formData.append("recipeDesc", inputs.recipeDesc);

    axios
      .post("https://localhost:7227/api/Recipes", formData, {
        headers: {
          "Authorization": `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => nav("/doctor/recipes"))
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
      <div className="all-position-create">
        <Link
          to="/doctor/recipes"
          className="back-to-superadmin"
          style={{ textDecoration: "none", color: "#333" }}
        >
          <i
            className="fa-solid fa-chevron-left"
            style={{ marginRight: "10px" }}
          ></i>
          Doctor / Recipes
        </Link>
        <div className="top-position-create">
          <h1>Add Recipe</h1>
        </div>
        <div className="bottom-position-create">
          <form method="POST" onSubmit={(e) => handleSubmit(e)}>
            <div className="panel-body d-flex flex-column gap-4">
              <div className="form-group d-flex align-items-center justify-content-center">
                <label htmlFor="appId" className="col-sm-3 control-label">
                  Appoinments
                </label>
                <div className="col-sm-5">
                  <select
                    id="appId"
                    className="form-control"
                    onChange={handleChange}
                    name="appoinmentId"
                    required=""
                    value={selectedAppoinment}
                  >
                    <option value="">Select Appoinment: </option>
                    {appoinments.map((app) => (
                      <option key={app.id} value={app.id}>
                        {app.id}
                      </option>
                    ))}
                  </select>
                  {errorMessages.AppoinmentId ? (
                    <div className="error-messages">
                      <p className="error-message">
                        {errorMessages.AppoinmentId}
                      </p>
                    </div>
                  ) : (
                    <div className="error-messages">
                      <p className="error-message">
                        {exception &&  exception.includes("AppoinmentId") ? exception : ""}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group d-flex align-items-center justify-content-center">
                <label htmlFor="docId" className="col-sm-3 control-label">
                  Doctors
                </label>
                <div className="col-sm-5">
                  <select
                    id="docId"
                    className="form-control"
                    onChange={handleChange}
                    name="doctorId"
                    required=""
                    value={selectedDoctor}
                  >
                    <option value="">Select Doctor: </option>
                    {doctor
                      .filter((data) => data.isDeleted === false && data.userName===username)
                      .map((doc) => (
                        <option key={doc.id} value={doc.id}>
                          {doc.userName}
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
                        {exception &&  exception.includes("DoctorId") ? exception : ""}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group d-flex align-items-center justify-content-center">
                <label htmlFor="patId" className="col-sm-3 control-label">
                  Patients
                </label>
                <div className="col-sm-5">
                  <select
                    id="patId"
                    className="form-control"
                    onChange={handleChange}
                    name="patientId"
                    required=""
                    value={selectedPatient}
                  >
                    <option value="">Select Patient: </option>
                    {patient
                      .map((pat) => (
                        <option key={pat.id} value={pat.id}>
                          {pat.name} {pat.surname} - {pat.phoneNumber}
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
                        {exception &&  exception.includes("Department") ? exception : ""}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group d-flex align-items-center justify-content-center">
                <label htmlFor="recipeDesc" className="col-sm-3 control-label">
                  Recipe Description
                </label>
                <div className="col-sm-5">
                  <input
                    id="recipeDesc"
                    type="text"
                    className="form-control"
                    defaultValue=""
                    onChange={handleChange}
                    name="recipeDesc"
                    required=""
                    placeholder="Recipe Description"
                  />
                  {errorMessages.RecipeDesc ? (
                    <div className="error-messages">
                      <p className="error-message">{errorMessages.RecipeDesc}</p>
                    </div>
                  ) : (
                    <div className="error-messages">
                      <p className="error-message">
                        {exception &&  exception.includes("RecipeDesc") ? exception : ""}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="add-btn-position d-flex flex-column">
              {errorMessages.RecipeDesc ? (
                    <div className="error-messages">
                      <p className="error-message">{errorMessages.RecipeDesc}</p>
                    </div>
                  ) : (
                    <div className="error-messages">
                      <p className="error-message">
                        {exception &&  exception.includes("Recipe") ? exception : ""}
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
  );
};

export default Index;
