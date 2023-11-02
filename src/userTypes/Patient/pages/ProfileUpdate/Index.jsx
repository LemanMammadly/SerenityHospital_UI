import React, { useEffect, useState } from 'react'
import "./Index.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const Index = () => {
    const [inputs, setInputs] = useState({
        name: "",
        surname: "",
        email: "",
        userName: "",
        description: "",
        age: "",
        address:"",
      });
      const [data, setData] = useState({});
      const [prevImageUrl, setPrevImageUrl] = useState("");
      const [errorMessages, setErrorMessages] = useState([]);
      const [exception, setException] = useState("");
      const [selectGender, setSelectGender] = useState("");
      const [selectBloodType, setSelectBloodType] = useState("");
    
      const nav = useNavigate();
    
      const user = JSON.parse(localStorage.getItem("user"));
    
      useEffect(() => {
        axios
          .get(
            `https://localhost:7227/api/PatientAuths/GetByName?userName=${user.username}`
          )
          .then((res) => {
            setData(res.data);
            setInputs(res.data);
            setSelectGender(res.data.gender);
            setSelectBloodType(res.data.bloodType)
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);

      console.log(data);
    
      const handleChange = (e) => {
        const { name, value, type, files } = e.target;
    
        if (type === "file" && files != null && files.length > 0) {
          const selectedFile = files[0];
          const preview = URL.createObjectURL(selectedFile);
    
          if (name === "imageFile") {
            setPrevImageUrl(preview);
          }

          setErrorMessages((prev) => ({
            ...prev,
            [name]: null,
          }));
          
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

        if (name === "bloodyType") {
            setSelectBloodType(value);
          }
      };
    
      const handleSubmit = async (e, id) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("name", inputs.name);
        formData.append("surname", inputs.surname);
        formData.append("email", inputs.email);
        formData.append("userName", inputs.userName);
        formData.append("phoneNumber", inputs.phoneNumber);
        formData.append("age", inputs.age);
        formData.append("gender", selectGender);
        formData.append("imageFile", inputs.imageFile);
        formData.append("bloodType", inputs.bloodType);
        formData.append("address", inputs.address);
    
        await axios
          .put(`https://localhost:7227/api/PatientAuths/Update/`, formData, {
            headers: {
              Authorization: `Bearer ${user.token}`,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => nav("/patient/profile"))
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
      <div className="all-pat-update">
        <Link
          to="/patient/profile"
          className="back-to-pat"
          style={{ textDecoration: "none", color: "#333" }}
        >
          <i
            className="fa-solid fa-chevron-left"
            style={{ marginRight: "10px" }}
          ></i>
          Super Admin / Patient
        </Link>
        <div className="top-pat-update">
          <h1>Update Profile</h1>
        </div>
        <div className="bottom-pat-update">
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
                        {exception.includes("name") ? exception : ""}
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
                        {exception.includes("surname") ? exception : ""}
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
                        {exception.includes("email") ? exception : ""}
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
                        {exception.includes("username") ? exception : ""}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group d-flex align-items-center justify-content-center">
                <label htmlFor="address" className="col-sm-3 control-label">
                  Address
                </label>
                <div className="col-sm-5">
                  <input
                    id="address"
                    type="text"
                    className="form-control"
                    defaultValue={data.address}
                    onChange={handleChange}
                    name="address"
                    required=""
                    placeholder="Address"
                  />
                  {errorMessages.Address ? (
                    <div className="error-messages">
                      <p className="error-message">{errorMessages.Address}</p>
                    </div>
                  ) : (
                    <div className="error-messages">
                      <p className="error-message">
                        {exception.includes("address") ? exception : ""}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group d-flex align-items-center justify-content-center">
                <label htmlFor="phoneNumber" className="col-sm-3 control-label">
                  Phone Number
                </label>
                <div className="col-sm-5">
                  <input
                    id="phoneNumber"
                    type="tel"
                    className="form-control"
                    defaultValue={data.phoneNumber}
                    onChange={handleChange}
                    name="phoneNumber"
                    required=""
                    placeholder="Phone Number"
                  />
                  {errorMessages.PhoneNumber ? (
                    <div className="error-messages">
                      <p className="error-message">
                        {errorMessages.PhoneNumber}
                      </p>
                    </div>
                  ) : (
                    <div className="error-messages">
                      <p className="error-message">
                        {exception.includes("number") ? exception : ""}
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
                        {exception.includes("age") ? exception : ""}
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
                <label htmlFor="bloodType" className="col-sm-3 control-label">
                  Blood Type
                </label>
                <div className="col-sm-5">
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
                  {errorMessages.BloodType ? (
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
              <div className="update-btn-pat d-flex flex-column">
                {errorMessages.UserName ? (
                  <div className="error-messages">
                    <p className="error-message">{errorMessages.UserName}</p>
                  </div>
                ) : (
                  <div className="error-messages">
                    <p className="error-message">
                      {exception.includes("already") ? exception : ""}
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
  )
}

export default Index