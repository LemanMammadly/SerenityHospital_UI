import React, { useEffect, useState } from "react";
import "./Index.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Index = () => {
  const [inputs, setInputs] = useState({
    name: "",
    surname: "",
    email: "",
    userName: "",
    description: "",
    age: "",
  });
  const [data, setData] = useState({});
  const [prevImageUrl, setPrevImageUrl] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);
  const [exception, setException] = useState("");
  const [selectGender, setSelectGender] = useState("");

  const nav = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get(
        `https://localhost:7227/api/DoctorAuths/GetByName?userName=${user.username}`
      )
      .then((res) => {
        setData(res.data);
        setInputs(res.data);
        setSelectGender(res.data.gender);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
      type === "number"
    ) {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: value,
      }));
    }

    if (name === "gender") {
      setSelectGender(value);
    }
  };

  const handleSubmit = async (e, id) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", inputs.name);
    formData.append("surname", inputs.surname);
    formData.append("email", inputs.email);
    formData.append("userName", inputs.userName);
    formData.append("description", inputs.description);
    formData.append("age", inputs.age);
    formData.append("gender", selectGender);
    formData.append("imageFile", inputs.imageFile);

    await axios
      .put(`https://localhost:7227/api/DoctorAuths/Put/`, formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => nav("/doctor/profile"))
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
          to="/doctor/profile"
          className="back-to-doctor"
          style={{ textDecoration: "none", color: "#333" }}
        >
          <i
            className="fa-solid fa-chevron-left"
            style={{ marginRight: "10px" }}
          ></i>
          Super Admin / Doctor
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
                        {exception && exception.includes("name") ? exception : ""}
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
                        {exception &&  exception.includes("surname") ? exception : ""}
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
                        {exception &&  exception.includes("email") ? exception : ""}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group d-flex align-items-center justify-content-center">
                <label htmlFor="userName" className="col-sm-3 control-label">
                  Username
                </label>
                <div className="col-sm-5">
                  <input
                    id="userName"
                    type="text"
                    className="form-control"
                    defaultValue={data.userName}
                    onChange={handleChange}
                    name="userName"
                    required=""
                    placeholder="Username"
                  />
                  {errorMessages.Username ? (
                    <div className="error-messages">
                      <p className="error-message">{errorMessages.Username}</p>
                    </div>
                  ) : (
                    <div className="error-messages">
                      <p className="error-message">
                        {exception &&  exception.includes("username") ? exception : ""}
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
                        {exception &&  exception.includes("description") ? exception : ""}
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
                        {exception &&  exception.includes("age") ? exception : ""}
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
              <div className="update-btn-doctor d-flex flex-column">
                {errorMessages.UserName ? (
                  <div className="error-messages">
                    <p className="error-message">{errorMessages.UserName}</p>
                  </div>
                ) : (
                  <div className="error-messages">
                    <p className="error-message">
                      {exception &&  exception.includes("already") ? exception : ""}
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
