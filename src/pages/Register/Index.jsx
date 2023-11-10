import React, { useEffect, useState } from "react";
import "./Index.css";
import { Link, useNavigate } from "react-router-dom";
import "select2";
import "select2/dist/css/select2.css";
import axios from "axios";

const Index = () => {
  const [inputs, setInputs] = useState({
    name: "",
    surname: "",
    email: "",
    userName: "",
    password: "",
    address: "",
    phoneNumber: "",
    age: "",
    gender: "",
    bloodType: "",
    imageFile: "",
  });
  const [errorMessages, setErrorMessages] = useState([]);
  const [exception, setException] = useState("");
  const [selectGender, setSelectGender] = useState("");
  const [selectBloodType, setSelectBloodType] = useState("");

  const nav = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file" && files != null && files.length > 0) {
      const selectedFile = files[0];

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

    if (name === "bloodType") {
      setSelectBloodType(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", inputs.name);
    formData.append("surname", inputs.surname);
    formData.append("email", inputs.email);
    formData.append("userName", inputs.userName);
    formData.append("password", inputs.password);
    formData.append("address", inputs.address);
    formData.append("phoneNumber", inputs.phoneNumber);
    formData.append("age", inputs.age);
    formData.append("gender", selectGender);
    formData.append("bloodType", selectBloodType);
    formData.append("imageFile", inputs.imageFile);

    console.log(formData);

    axios
      .post("https://localhost:7227/api/PatientAuths/Create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => nav("/login"))
      .catch((e) => {
        if (e.response && e.response.data && e.response.data.errors) {
          setErrorMessages(e.response.data.errors);
        } else {
          setException(e.response.data.message);
        }
      });
  };
  return (
    <section class="all-register">
      <div class="form-container-register">
        <div class="section-header-register">
          <h1 class="primary-heading-register">
            Create a new account<span class="fullstop-register">.</span>
          </h1>
          <h2 class="secondary-heading-register">
            Already A Member?{" "}
            <a class="login-link-register" href="/login">
              Log in
            </a>
          </h2>
        </div>
        <form
          action="javascript:void(0);"
          method="POST"
          onSubmit={(e) => handleSubmit(e)}
          class="form-register"
        >
          <div class="form-input-register">
            <div className="name-input-register">
              <div className="col-sm-6">
                <input
                  id="name"
                  type="text"
                  className="form-control"
                  defaultValue=""
                  onChange={handleChange}
                  name="name"
                  required=""
                  placeholder="Name"
                />
                {/* {errorMessages.Name ? (
                  <div className="error-messages">
                    <p className="error-message">{errorMessages.Name}</p>
                  </div>
                ) : (
                  <div className="error-messages">
                    <p className="error-message">
                      {exception && exception.includes("null") ? exception : ""}
                    </p>
                  </div>
                )} */}
              </div>
              <div className="col-sm-6">
                <input
                  id="surname"
                  type="text"
                  className="form-control"
                  defaultValue=""
                  onChange={handleChange}
                  name="surname"
                  required=""
                  placeholder="Surname"
                />
                {/* {errorMessages.Surname ? (
                  <div className="error-messages">
                    <p className="error-message">{errorMessages.Surname}</p>
                  </div>
                ) : (
                  <div className="error-messages">
                    <p className="error-message">
                      {exception && exception.includes("null") ? exception : ""}
                    </p>
                  </div>
                )} */}
              </div>
            </div>
            <input
              id="email"
              type="email"
              className="form-control"
              defaultValue=""
              onChange={handleChange}
              name="email"
              required=""
              placeholder="Email"
            />
            {/* {errorMessages.Email ? (
              <div className="error-messages">
                <p className="error-message">{errorMessages.Email}</p>
              </div>
            ) : (
              <div className="error-messages">
                <p className="error-message">
                  {exception && exception.includes("email") ? exception : ""}
                </p>
              </div>
            )} */}
            <input
              id="username"
              type="text"
              className="form-control"
              defaultValue=""
              onChange={handleChange}
              name="userName"
              required=""
              placeholder="Username"
            />
            {/* {errorMessages.UserName ? (
              <div className="error-messages">
                <p className="error-message">{errorMessages.UserName}</p>
              </div>
            ) : (
              <div className="error-messages">
                <p className="error-message">
                  {exception && exception.includes("exist") ? exception : ""}
                </p>
              </div>
            )} */}
            <input
              id="pass"
              type="text"
              className="form-control"
              defaultValue=""
              onChange={handleChange}
              name="password"
              required=""
              placeholder="Password"
            />
            {/* {errorMessages.Password ? (
              <div className="error-messages">
                <p className="error-message">{errorMessages.Password}</p>
              </div>
            ) : (
              <div className="error-messages">
                <p className="error-message">
                  {exception && exception.includes("password") ? exception : ""}
                </p>
              </div>
            )} */}
            <input
              id="address"
              type="text"
              className="form-control"
              defaultValue=""
              onChange={handleChange}
              name="address"
              required=""
              placeholder="Address"
            />
            {/* {errorMessages.Address ? (
              <div className="error-messages">
                <p className="error-message">{errorMessages.Address}</p>
              </div>
            ) : (
              <div className="error-messages">
                <p className="error-message">
                  {exception && exception.includes("address") ? exception : ""}
                </p>
              </div>
            )} */}
            <input
              id="phoneNumber"
              type="tel"
              className="form-control"
              defaultValue=""
              onChange={handleChange}
              name="phoneNumber"
              required=""
              placeholder="Phone Number"
            />
            {/* {errorMessages.PhoneNumber ? (
              <div className="error-messages">
                <p className="error-message">{errorMessages.PhoneNumber}</p>
              </div>
            ) : (
              <div className="error-messages">
                <p className="error-message">
                  {exception && exception.includes("phonenumber")
                    ? exception
                    : ""}
                </p>
              </div>
            )} */}
            <input
              id="age"
              type="number"
              className="form-control"
              defaultValue=""
              onChange={handleChange}
              name="age"
              required=""
              placeholder="Age"
            />
            {/* {errorMessages.Age ? (
              <div className="error-messages">
                <p className="error-message">{errorMessages.Age}</p>
              </div>
            ) : (
              <div className="error-messages">
                <p className="error-message">
                  {exception && exception.includes("age") ? exception : ""}
                </p>
              </div>
            )} */}
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
            {/* {errorMessages.Gender ? (
              <div className="error-messages">
                <p className="error-message">{errorMessages.Gender}</p>
              </div>
            ) : (
              <div className="error-messages">
                <p className="error-message">
                  {exception && exception.includes("gender") ? exception : ""}
                </p>
              </div>
            )} */}
            <select
              id="bloodType"
              className="form-control"
              onChange={handleChange}
              name="bloodType"
              required=""
              value={selectBloodType}
            >
              <option value="">Select Blood Type: </option>
              <option value={1}>APositive</option>
              <option value={2}>ANegative</option>
              <option value={3}>BPositive</option>
              <option value={4}>BNegative</option>
              <option value={5}>ABPositive</option>
              <option value={6}>ABNegative</option>
              <option value={7}>OPositive</option>
              <option value={8}>ONegative</option>
              <option value={9}>Unknown</option>
            </select>
            {/* {errorMessages.BloodType ? (
              <div className="error-messages">
                <p className="error-message">{errorMessages.BloodType}</p>
              </div>
            ) : (
              <div className="error-messages">
                <p className="error-message">
                  {exception && exception.includes("BloodType")
                    ? exception
                    : ""}
                </p>
              </div>
            )} */}
            <input
              id="imageFile"
              type="file"
              className="form-control"
              name="imageFile"
              placeholder="imageFile"
              onChange={handleChange}
              required=""
            />
            {/* {errorMessages.ImageFile ? (
              <div className="error-messages">
                <p className="error-message">{errorMessages.ImageFile}</p>
              </div>
            ) : (
              <div className="error-messages">
                <p className="error-message">
                  {(exception && exception.includes("image")) ||
                  (exception && exception.includes("email")) ||
                  (exception && exception.includes("null"))
                    ? exception
                    : ""}
                </p>
              </div>
            )} */}
            <div class="btn-input-register d-flex align-items-center justify-content-center d-flex flex-column">
              {errorMessages.ImageFile ? (
                <div className="error-messages">
                  <p className="error-message">{errorMessages.ImageFile}</p>
                </div>
              ) : (
                <div className="error-messages">
                  <p className="error-message">
                    {(exception && exception.includes("image")) ||
                    (exception && exception.includes("email")) ||
                    (exception && exception.includes("null")) ||
                    (exception && exception.includes("password"))
                      ? exception
                      : ""}
                  </p>
                </div>
              )}
              <button type="submit" class="primary-btn-register">
                Create account
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Index;
