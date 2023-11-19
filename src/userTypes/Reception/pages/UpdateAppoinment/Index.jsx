import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { DatePicker } from "antd";
import moment from "moment";

const Index = () => {
  const { id } = useParams();
  const [inputs, setInputs] = useState({});
  const [data, setData] = useState({});
  const [errorMessages, setErrorMessages] = useState([]);
  const [exception, setException] = useState("");
  const [departmentsall, setDepartmentsall] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState("");
  const [isDoctorSelectDisabled, setIsDoctorSelectDisabled] = useState(true);
  const [doctors, setDoctors] = useState([]);
  const [selectdoctors, setSelectDoctors] = useState("");
  const [patients, setPatients] = useState([]);
  const [selectPatients, setSelectPatients] = useState("");
  const [patientAsDoctor, setPatientAsDoctor] = useState([]);
  const [selectPatientAsDoctor, setSelectPatientAsDoctor] = useState("");
  const [isDoctorAsPatientSelectDisabled, setIsDoctorAsPatientSelectDisabled] =
    useState(false);

  const nav = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

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
      setSelectDoctors(value);
    }

    if (name === "patientId") {
      setSelectPatients(value);
      setSelectPatientAsDoctor("");
      setIsDoctorAsPatientSelectDisabled(true);
    }

    if (name === "appoinmentAsDoctorId") {
      setSelectPatientAsDoctor(value);
      setSelectPatients("");
      setIsDoctorSelectDisabled(true);
    }

    console.log(inputs);
  };

  useEffect(() => {
    axios
      .get(`https://localhost:7227/api/Appoinments/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setData(res.data);
        setInputs(res.data);
        setSelectedDepartments(res.data.doctor.department.id);
        setSelectDoctors(res.data.doctor.id);
        setSelectPatients(res.data.patient ? res.data.patient.id : "");
        setSelectPatientAsDoctor(
          res.data.appoinmentAsDoctor ? res.data.appoinmentAsDoctor.id : ""
        );
      })
      .catch((err) => console.log(err));
  }, [id]);

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
      .get(`https://localhost:7227/api/PatientAuths/`)
      .then((res) => {
        setPatients(res.data);
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
        setPatientAsDoctor(res.data);
      })
      .catch((err) => console.log(err));
  }, [selectedDepartments]);

  const handleSubmit = async (e, id) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("departmentId", selectedDepartments);
    formData.append("doctorId", selectdoctors);
    formData.append("patientId", selectPatients);
    formData.append("appoinmentAsDoctorId", selectPatientAsDoctor);
    formData.append("problemDesc", inputs.problemDesc);
    formData.append("appoinmentDate", inputs.appoinmentDate);
    formData.append("duration", inputs.duration);

    console.log(inputs);

    await axios
      .put(`https://localhost:7227/api/Appoinments/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => nav("/receptionist/appoinments"))
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
      <div className="all-doctor-update">
        <Link
          to="/receptionist/appoinments"
          className="back-to-superadmin"
          style={{ textDecoration: "none", color: "#333" }}
        >
          <i
            className="fa-solid fa-chevron-left"
            style={{ marginRight: "10px" }}
          ></i>
          Receptionist / Appoinments
        </Link>
        <div className="top-doctor-update">
          <h1>Update Appoinment</h1>
        </div>
        <div className="bottom-doctor-update">
          <form method="POST" onSubmit={(e) => handleSubmit(e, data.id)}>
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
                <label htmlFor="doctorId" className="col-sm-3 control-label">
                  Doctors
                </label>
                <div className="col-sm-5">
                  <select
                    id="doctorId"
                    className="form-control"
                    onChange={handleChange}
                    name="doctorId"
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
                        {exception && exception.includes("own")
                          ? exception
                          : ""}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group d-flex align-items-center justify-content-center">
                <label htmlFor="patientId" className="col-sm-3 control-label">
                  Patients
                </label>
                <div className="col-sm-5">
                  <select
                    id="patientId"
                    className="form-control"
                    onChange={handleChange}
                    name="patientId"
                    value={selectPatients}
                    disabled={isDoctorSelectDisabled || !selectPatients}
                  >
                    <option value="">Select Patient: </option>
                    {patients.map((doc) => (
                      <option key={doc.id} value={doc.id}>
                        {doc.name} {doc.surname}
                      </option>
                    ))}
                  </select>
                  {errorMessages.PatientId ? (
                    <div className="error-messages">
                      <p className="error-message">{errorMessages.PatientId}</p>
                    </div>
                  ) : (
                    <div className="error-messages">
                      <p className="error-message">
                        {exception && exception.includes("PatientId")
                          ? exception
                          : ""}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group d-flex align-items-center justify-content-center">
                <label
                  htmlFor="appoinmentAsDoctorId"
                  className="col-sm-3 control-label"
                >
                  Doctor as Patient
                </label>
                <div className="col-sm-5">
                  <select
                    id="appoinmentAsDoctorId"
                    className="form-control"
                    onChange={handleChange}
                    name="appoinmentAsDoctorId"
                    value={selectPatientAsDoctor}
                    disabled={
                      isDoctorAsPatientSelectDisabled || !selectPatientAsDoctor
                    }
                  >
                    <option value="">Select Doctor as Patient: </option>
                    {patientAsDoctor
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
              <div className="form-group d-flex align-items-center justify-content-center">
                <label htmlFor="problem" className="col-sm-3 control-label">
                  Problem
                </label>
                <div className="col-sm-5">
                  <input
                    id="problem"
                    type="text"
                    defaultValue={data.problemDesc}
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
                        {exception && exception.includes("name")
                          ? exception
                          : ""}
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
                    value={
                      inputs.appoinmentDate
                        ? moment(inputs.appoinmentDate)
                        : null
                    }
                    onChange={(date, dateString) =>
                      handleChange({
                        target: { name: "appoinmentDate", value: dateString },
                      })
                    }
                  />
                  {errorMessages.AppoinmentDate ? (
                    <div className="error-messages">
                      <p className="error-message">
                        {errorMessages.AppoinmentDate}
                      </p>
                    </div>
                  ) : (
                    <div className="error-messages">
                      <p className="error-message">
                        {exception && exception.includes("Exception")
                          ? exception
                          : ""}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group d-flex align-items-center justify-content-center">
                <label htmlFor="duration" className="col-sm-3 control-label">
                  Duration
                </label>
                <div className="col-sm-5">
                  <input
                    id="duration"
                    type="number"
                    defaultValue={data.duration}
                    className="form-control"
                    onChange={handleChange}
                    name="duration"
                    required=""
                    placeholder="Duration"
                  />
                  {errorMessages.Duration ? (
                    <div className="error-messages">
                      <p className="error-message">{errorMessages.Duration}</p>
                    </div>
                  ) : (
                    <div className="error-messages">
                      <p className="error-message">
                        {exception && exception.includes("duration")
                          ? exception
                          : ""}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="update-btn-doctor d-flex flex-column">
                {errorMessages.AppoinmentDate ? (
                  <div className="error-messages">
                    <p className="error-message">
                      {errorMessages.AppoinmentDate}
                    </p>
                  </div>
                ) : (
                  <div className="error-messages">
                    <p className="error-message">
                      {(exception && exception.includes("Conflict")) ||
                      (exception && exception.includes("found")) ||
                      (exception && exception.includes("Approved")) ||
                      (exception && exception.includes("Rejected")) ||
                      (exception && exception.includes("past")) ||
                      (exception && exception.includes("Durations"))
                        ? exception
                        : ""}
                    </p>
                  </div>
                )}
                <button type="submit">
                  Update <i className="fa-solid fa-check"></i>
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
