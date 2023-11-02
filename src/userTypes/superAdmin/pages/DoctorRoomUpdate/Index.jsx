import React, { useEffect, useState } from "react";
import "./Index.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Index = () => {
  const { id } = useParams();
  const [inputs, setInputs] = useState({});
  const [data, setData] = useState({});
  const [errorMessages, setErrorMessages] = useState([]);
  const [exception, setException] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectdoctors, setSelectDoctors] = useState("");
  const [departmentsall, setDepartmentsall] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState("");

  const nav = useNavigate();

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

        setDoctors(allDoctors);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`https://localhost:7227/api/DoctorRooms/${id}`)
      .then((res) => {
        setData(res.data);
        setInputs(res.data);
        setSelectDoctors(res.data && res.data.doctor ? res.data.doctor.id : "")
        setSelectedDepartments(res.data && res.data.department.id)
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "text") {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: value,
      }));
    }

    if (name === "departmentId") {
      setSelectedDepartments(value);
    }

    if (name === "doctorId") {
      setSelectDoctors(value);
    }

    console.log(inputs);
  };

  const handleSubmit = async (e, id) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("number", inputs.number);
    formData.append("departmentId", selectedDepartments);
    formData.append("doctorId", selectdoctors);

    await axios
      .put(`https://localhost:7227/api/DoctorRooms/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => nav("/superadmin/doctorrooms"))
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
      <div className="all-position-update">
        <Link
          to="/superadmin/doctorrooms"
          className="back-to-superadmin"
          style={{ textDecoration: "none", color: "#333" }}
        >
          <i
            className="fa-solid fa-chevron-left"
            style={{ marginRight: "10px" }}
          ></i>
          Super Admin / Doctor Rooms
        </Link>
        <div className="top-position-update">
          <h1>Update Position</h1>
        </div>
        <div className="bottom-position-update">
          <form method="POST" onSubmit={(e) => handleSubmit(e, data.id)}>
            <div className="panel-body d-flex flex-column gap-4">
              <div className="form-group d-flex align-items-center justify-content-center">
                <label htmlFor="number" className="col-sm-3 control-label">
                  Number
                </label>
                <div className="col-sm-5">
                  <input
                    id="number"
                    type="number"
                    className="form-control"
                    defaultValue={data.number}
                    onChange={handleChange}
                    name="number"
                    required=""
                    placeholder="Number"
                  />
                  {errorMessages.Number ? (
                    <div className="error-messages">
                      <p className="error-message">{errorMessages.Number}</p>
                    </div>
                  ) : (
                    <div className="error-messages">
                      <p className="error-message">
                        {exception && exception.includes("Number") ? exception : ""}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group d-flex align-items-center justify-content-center">
                <label htmlFor="depId" className="col-sm-3 control-label">
                  Departments
                </label>
                <div className="col-sm-5">
                    <p>Room's Department : {selectedDepartments}</p>
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
                <p>Room's Doctor : {selectdoctors}</p>
                  <select
                    id="doctorId"
                    className="form-control"
                    onChange={handleChange}
                    name="doctorId"
                    value={selectdoctors}
                    // disabled={isDoctorSelectDisabled}
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
                        {exception && exception.includes("Doctor") ? exception : ""}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="update-btn-position">
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
