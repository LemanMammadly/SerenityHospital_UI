import React, { useEffect, useState } from "react";
import "./Index.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { DatePicker } from "antd";

const Index = () => {
  const { id } = useParams();
  const [inputs, setInputs] = useState({});
  const [data, setData] = useState({});
  const [positions, setPositions] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);
  const [exception, setException] = useState("");
  const [prevImageUrl, setPrevImageUrl] = useState("");
  const [selectGender, setSelectGender] = useState("");
  const [selectStatus, setSelectStatus] = useState("");
  const [selectPosition, setSelectPosition] = useState("");
  const [selectDepartment, setSelectDepartment] = useState("");

  const nav = useNavigate();

  useEffect(() => {
    axios
      .get("https://localhost:7227/api/Positions")
      .then((resp) => {
        setPositions(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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

  useEffect(() => {
    axios
      .get(`https://localhost:7227/api/DoctorAuths/${id}`)
      .then((res) => {
        setData(res.data);
        setInputs(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file" && files != null && files.length > 0) {
      const selectedFile = files[0];
      const preview = URL.createObjectURL(selectedFile);

      if (name === "imageFile") {
        setPrevImageUrl(preview);
      }
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: selectedFile,
      }));
    } else if (
      type === "text" ||
      type === "tel" ||
      type === "email" ||
      type === "number" ||
      type === "password"
    ) {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: value,
      }));
    }

    if (name === "gender") {
      setSelectGender(value);
    }

    if (name === "status") {
      setSelectStatus(value);
    }

    if (name === "positionId") {
      setSelectPosition(value);
    }

    if (name === "departmentId") {
      setSelectDepartment(value);
    }
  };

  console.log(data);

  const handleSubmit = async (e, id) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", inputs.name);

    await axios
      .put(`https://localhost:7227/api/Positions/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => nav("/superadmin/position"))
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
          to="/superadmin/doctor"
          className="back-to-superadmin"
          style={{ textDecoration: "none", color: "#333" }}
        >
          <i
            className="fa-solid fa-chevron-left"
            style={{ marginRight: "10px" }}
          ></i>
          Super Admin / Positions
        </Link>
        <div className="top-doctor-update">
          <h1>Update Doctor</h1>
        </div>
        <div className="bottom-doctor-update">
          <form method="POST" onSubmit={(e) => handleSubmit(e, data.id)}>
            <div className="panel-body d-flex flex-column gap-4">
              <div className="form-group d-flex align-items-center justify-content-center">
                <label htmlFor="name" className="col-sm-3 control-label">
                  Name
                </label>
                <div className="col-sm-5">
                  <input
                    id="name"
                    type="text"
                    className="form-control"
                    defaultValue={data.name}
                    onChange={handleChange}
                    name="name"
                    required=""
                    placeholder="Name"
                  />
                  {errorMessages.Name ? (
                    <div className="error-messages">
                      <p className="error-message">{errorMessages.Name}</p>
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
                <label htmlFor="surname" className="col-sm-3 control-label">
                  Surname
                </label>
                <div className="col-sm-5">
                  <input
                    id="surname"
                    type="text"
                    className="form-control"
                    defaultValue={data.surname}
                    onChange={handleChange}
                    name="surname"
                    required=""
                    placeholder="Surname"
                  />
                  {errorMessages.Surname ? (
                    <div className="error-messages">
                      <p className="error-message">{errorMessages.Surname}</p>
                    </div>
                  ) : (
                    <div className="error-messages">
                      <p className="error-message">
                        {exception && exception.includes("surname")
                          ? exception
                          : ""}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group d-flex align-items-center justify-content-center">
                <label htmlFor="email" className="col-sm-3 control-label">
                  Email
                </label>
                <div className="col-sm-5">
                  <input
                    id="email"
                    type="email"
                    className="form-control"
                    defaultValue={data.email}
                    onChange={handleChange}
                    name="email"
                    required=""
                    placeholder="Email"
                  />
                  {errorMessages.Email ? (
                    <div className="error-messages">
                      <p className="error-message">{errorMessages.Email}</p>
                    </div>
                  ) : (
                    <div className="error-messages">
                      <p className="error-message">
                        {exception && exception.includes("email")
                          ? exception
                          : ""}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group d-flex align-items-center justify-content-center">
                <label htmlFor="username" className="col-sm-3 control-label">
                  Username
                </label>
                <div className="col-sm-5">
                  <input
                    id="username"
                    type="text"
                    className="form-control"
                    defaultValue={data.userName}
                    onChange={handleChange}
                    name="userName"
                    required=""
                    placeholder="Username"
                  />
                  {errorMessages.UserName ? (
                    <div className="error-messages">
                      <p className="error-message">{errorMessages.UserName}</p>
                    </div>
                  ) : (
                    <div className="error-messages">
                      <p className="error-message">
                        {exception && exception.includes("exist")
                          ? exception
                          : ""}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group d-flex align-items-center justify-content-center">
                <label htmlFor="pass" className="col-sm-3 control-label">
                  Password
                </label>
                <div className="col-sm-5">
                  <input
                    id="pass"
                    type="password"
                    className="form-control"
                    defaultValue={data.password}
                    onChange={handleChange}
                    name="password"
                    required=""
                    placeholder="Password"
                  />
                  {errorMessages.Password ? (
                    <div className="error-messages">
                      <p className="error-message">{errorMessages.Password}</p>
                    </div>
                  ) : (
                    <div className="error-messages">
                      <p className="error-message">
                        {exception && exception.includes("password")
                          ? exception
                          : ""}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group d-flex align-items-center justify-content-center">
                <label htmlFor="desc" className="col-sm-3 control-label">
                  Description
                </label>
                <div className="col-sm-5">
                  <input
                    id="desc"
                    type="text"
                    className="form-control"
                    defaultValue={data.description}
                    onChange={handleChange}
                    name="description"
                    required=""
                    placeholder="Description"
                  />
                  {errorMessages.Description ? (
                    <div className="error-messages">
                      <p className="error-message">
                        {errorMessages.Description}
                      </p>
                    </div>
                  ) : (
                    <div className="error-messages">
                      <p className="error-message">
                        {exception && exception.includes("description")
                          ? exception
                          : ""}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group d-flex align-items-center justify-content-center">
                <label htmlFor="salary" className="col-sm-3 control-label">
                  Salary
                </label>
                <div className="col-sm-5">
                  <input
                    id="salary"
                    type="number"
                    className="form-control"
                    defaultValue={data.salary}
                    onChange={handleChange}
                    name="salary"
                    required=""
                    placeholder="Salary"
                  />
                  {errorMessages.Salary ? (
                    <div className="error-messages">
                      <p className="error-message">{errorMessages.Salary}</p>
                    </div>
                  ) : (
                    <div className="error-messages">
                      <p className="error-message">
                        {exception && exception.includes("salary")
                          ? exception
                          : ""}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group d-flex align-items-center justify-content-center">
                <label htmlFor="age" className="col-sm-3 control-label">
                  Age
                </label>
                <div className="col-sm-5">
                  <input
                    id="age"
                    type="number"
                    className="form-control"
                    defaultValue={data.age}
                    onChange={handleChange}
                    name="age"
                    required=""
                    placeholder="Age"
                  />
                  {errorMessages.Age ? (
                    <div className="error-messages">
                      <p className="error-message">{errorMessages.Age}</p>
                    </div>
                  ) : (
                    <div className="error-messages">
                      <p className="error-message">
                        {exception && exception.includes("age")
                          ? exception
                          : ""}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group d-flex align-items-center justify-content-center">
                <label htmlFor="gender" className="col-sm-3 control-label">
                  Gender
                </label>
                <div className="col-sm-5">
                  <select
                    id="gender"
                    className="form-control"
                    onChange={handleChange}
                    name="gender"
                    required=""
                    value={selectGender}
                  >
                    <option value="">Select Gender: </option>
                    <option value={1}>Female</option>
                    <option value={2}>Male</option>
                    <option value={3}>Others</option>
                  </select>
                  {errorMessages.Gender ? (
                    <div className="error-messages">
                      <p className="error-message">{errorMessages.Gender}</p>
                    </div>
                  ) : (
                    <div className="error-messages">
                      <p className="error-message">
                        {exception && exception.includes("gender")
                          ? exception
                          : ""}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group d-flex align-items-center justify-content-center">
                <label htmlFor="status" className="col-sm-3 control-label">
                  Status
                </label>
                <div className="col-sm-5">
                  <select
                    id="status"
                    className="form-control"
                    onChange={handleChange}
                    name="status"
                    required=""
                    value={selectStatus}
                  >
                    <option value="">Select Gender: </option>
                    <option value={1}>Active</option>
                    <option value={2}>OnLeave</option>
                    <option value={3}>Leave</option>
                    <option value={4}>Other</option>
                  </select>
                  {errorMessages.Gender ? (
                    <div className="error-messages">
                      <p className="error-message">{errorMessages.Gender}</p>
                    </div>
                  ) : (
                    <div className="error-messages">
                      <p className="error-message">
                        {exception && exception.includes("gender")
                          ? exception
                          : ""}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group d-flex align-items-center justify-content-center">
                <label className="col-sm-3 control-label">
                  Doctor Start Date
                </label>
                <div className="col-sm-5">
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    placeholder="Select Date and Time"
                    onChange={(value) => handleChange("startDate", value)}
                  />
                  {errorMessages.ServiceBeginning && (
                    <div className="error-messages">
                      <p className="error-message">
                        {errorMessages.ServiceBeginning[0]}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="image-url text-center">
                <img
                  style={{ width: "150px" }}
                  src={prevImageUrl || data.imageUrl}
                  alt=""
                />
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
              <div className="w-25 m-auto bg-secondary text-white p-2">
                Position:
                {data.position && (
                  <div>
                    <div>{data.position.name}</div>
                  </div>
                )}
              </div>
              <div className="form-group d-flex align-items-center justify-content-center">
                <label htmlFor="position" className="col-sm-3 control-label">
                  Position
                </label>
                <div className="col-sm-5">
                  <select
                    id="position"
                    className="form-control"
                    onChange={handleChange}
                    name="positionId"
                    required=""
                    value={selectPosition}
                  >
                    <option value="">Select Position: </option>
                    {positions
                      .filter((pos) => pos.isDeleted === false)
                      .map((pos, index) => (
                        <option key={index} value={pos.id}>
                          {pos.name}
                        </option>
                      ))}
                  </select>
                  {errorMessages.PositionId ? (
                    <div className="error-messages">
                      <p className="error-message">
                        {errorMessages.PositionId}
                      </p>
                    </div>
                  ) : (
                    <div className="error-messages">
                      <p className="error-message">
                        {exception && exception.includes("position")
                          ? exception
                          : ""}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="w-25 m-auto bg-secondary text-white p-2">
                Department:
                {data.department && (
                  <div>
                    <div>{data.department.name}</div>
                  </div>
                )}
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
              <div className="update-btn-doctor">
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
