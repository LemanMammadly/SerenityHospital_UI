import React, { useEffect, useState } from "react";
import "./Index.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Index = () => {
  const [inputs, setInputs] = useState({});
  const [errorMessages, setErrorMessages] = useState([]);
  const [exception, setException] = useState("");
  const [departments, setDepartments] = useState([]);
  const [selectDepartment, setSelectDepartment] = useState("");

  const nav = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "text" || type === "number") {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: value,
      }));
    }
    if (name === "departmentId") {
      setSelectDepartment(parseInt(value, 10));
    }
  };

  useEffect(() => {
    axios
      .get("https://localhost:7227/api/Departments")
      .then((resp) => {
        setDepartments(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("number", inputs.number);
    formData.append("departmentId", selectDepartment);

    axios
      .post("https://localhost:7227/api/DoctorRooms", formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
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
      <div className="all-position-create">
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
        <div className="top-position-create">
          <h1>Add Doctor Room</h1>
        </div>
        <div className="bottom-position-create">
          <form method="POST" onSubmit={(e) => handleSubmit(e)}>
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
                    defaultValue=""
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
                <label htmlFor="department" className="col-sm-3 control-label">
                  Department
                </label>
                <div className="col-sm-5">
                  <select
                    id="department"
                    className="form-control"
                    onChange={handleChange}
                    name="departmentId"
                    required=""
                    value={selectDepartment}
                  >
                    <option value="">Select Department: </option>
                    {departments
                      .filter((dep) => dep.isDeleted === false)
                      .map((dep, index) => (
                        <option key={index} value={dep.id}>
                          {dep.name}
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
                        {exception && exception.includes("department")
                          ? exception
                          : ""}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="add-btn-position">
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
