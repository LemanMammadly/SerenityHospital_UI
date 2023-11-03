import React, { useEffect, useState } from "react";
import "./Index.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Index = () => {
  const [inputs, setInputs] = useState({});
  const [errorMessages, setErrorMessages] = useState([]);
  const [exception, setException] = useState("");
  const [selectType, setSelectType] = useState([]);
  const [selectCapacity, setSelectCapacity] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectDepartment, setSelectDepartment] = useState("");

  const nav = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file" && files != null && files.length > 0) {
      const selectedFile = files[0];

      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: selectedFile,
      }));
    }

    if (type === "text" || type === "number") {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: value,
      }));
    }
    if (name === "departmentId") {
      setSelectDepartment(parseInt(value, 10));
    }

    if (name === "capacity") {
      setSelectCapacity(parseInt(value, 10));
    }

    if (name === "type") {
      setSelectType(parseInt(value, 10));
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
    formData.append("price", inputs.price);
    formData.append("imageFile", inputs.imageFile);
    formData.append("capacity", selectCapacity);
    formData.append("type", selectType);
    formData.append("departmentId", selectDepartment);

    axios
      .post("https://localhost:7227/api/PatientRooms", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => nav("/superadmin/patientrooms"))
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
          to="/superadmin/patientrooms"
          className="back-to-superadmin"
          style={{ textDecoration: "none", color: "#333" }}
        >
          <i
            className="fa-solid fa-chevron-left"
            style={{ marginRight: "10px" }}
          ></i>
          Super Admin / Patient Rooms
        </Link>
        <div className="top-position-create">
          <h1>Add Patient Room</h1>
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
                        {exception.includes("Number") ? exception : ""}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group d-flex align-items-center justify-content-center">
                <label htmlFor="type" className="col-sm-3 control-label">
                  Type
                </label>
                <div className="col-sm-5">
                  <select
                    id="type"
                    className="form-control"
                    onChange={handleChange}
                    name="type"
                    required=""
                    value={selectType}
                  >
                    <option value="">Select Type: </option>
                    <option value={1}>Single</option>
                    <option value={2}>Double</option>
                    <option value={3}>Multibed</option>
                  </select>
                  {errorMessages.Type ? (
                    <div className="error-messages">
                      <p className="error-message">{errorMessages.Type}</p>
                    </div>
                  ) : (
                    <div className="error-messages">
                      <p className="error-message">
                        {exception && exception.includes("type")
                          ? exception
                          : ""}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group d-flex align-items-center justify-content-center">
                <label htmlFor="capacity" className="col-sm-3 control-label">
                  Capacity
                </label>
                <div className="col-sm-5">
                  <select
                    id="capacity"
                    className="form-control"
                    onChange={handleChange}
                    name="capacity"
                    required=""
                    value={selectCapacity}
                  >
                    <option value="">Select Capacity: </option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                  </select>
                  {errorMessages.Capacity ? (
                    <div className="error-messages">
                      <p className="error-message">{errorMessages.Capacity}</p>
                    </div>
                  ) : (
                    <div className="error-messages">
                      <p className="error-message">
                        {exception && exception.includes("capacity")
                          ? exception
                          : ""}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group d-flex align-items-center justify-content-center">
                <label htmlFor="price" className="col-sm-3 control-label">
                  Price
                </label>
                <div className="col-sm-5">
                  <input
                    id="price"
                    type="price"
                    className="form-control"
                    defaultValue=""
                    onChange={handleChange}
                    name="price"
                    required=""
                    placeholder="Price"
                  />
                  {errorMessages.Price ? (
                    <div className="error-messages">
                      <p className="error-message">{errorMessages.Price}</p>
                    </div>
                  ) : (
                    <div className="error-messages">
                      <p className="error-message">
                        {exception.includes("price") ? exception : ""}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group d-flex align-items-center justify-content-center">
                <label htmlFor="imageFile" className="col-sm-3 control-label">
                  Image
                </label>
                <div className="col-sm-5">
                  <input
                    id="imageFile"
                    type="file"
                    className="form-control"
                    name="imageFile"
                    placeholder="imageFile"
                    onChange={handleChange}
                    required=""
                  />
                  {errorMessages.ImageFile ? (
                    <div className="error-messages">
                      <p className="error-message">{errorMessages.ImageFile}</p>
                    </div>
                  ) : (
                    <div className="error-messages">
                      <p className="error-message">
                        {exception && exception.includes("image")
                          ? exception
                          : ""}
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
