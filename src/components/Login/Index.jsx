import React, { useState } from "react";
import "./Index.css";
import bgLogin from "../../assets/imgs/bg-login.jpeg";
import loginPage from "../../assets/imgs/loginPage.png";
import axios from "axios";
import { Link } from "react-router-dom";

const Index = () => {
  const [inputs, setInputs] = useState({});
  const [errorMessages, setErrorMessages] = useState([]);
  const [exception, setException] = useState("");
  const [selectUser, setSelectUser] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); 

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "text" || type === "password") {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: value,
      }));
    }

    if (name === "user") {
      setSelectUser(value);
    }

    console.log(inputs);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userName", inputs.userName);
    formData.append("password", inputs.password);

    let endpoint = "";

    if (selectUser === "admin") {
      endpoint = "AdminAuths";
    } else if (selectUser === "patient") {
      endpoint = "PatientAuths";
    } else if (selectUser === "doctor") {
      endpoint = "DoctorAuths";
    }

    axios
      .post(`https://localhost:7227/api/${endpoint}/Login`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          const user = res.data;
          console.log(user);
          if (user && user.roles && user.roles[0] && user.roles[0].includes("Doctor")) {
            window.location.href = "/doctor";
            localStorage.setItem("user", JSON.stringify(res.data));
          } else if (user && user.roles && user.roles[0] && user.roles[0].includes("Admin")) {
            window.location.href = "/superadmin";
            localStorage.setItem("user", JSON.stringify(res.data));
          } else if (
            (user && user.roles &&
            user.roles[0] &&
            user.roles[0].includes("Patient"))
          ) {
            window.location.href = "/patient";
            localStorage.setItem("user", JSON.stringify(res && res.data));
          }
        }
      })
      .catch((e) => {
        if (e.response && e.response.data && e.response.data.errors) {
          setErrorMessages(e.response.data.errors);
        } else {
          setException(e.response && e.response.data.message);
        }
      });
  };

  const showPassword = () => {
    setPasswordVisible(!passwordVisible); 
  };

  return (
    <section className="login-section">
      <div className="all-login col-lg-12">
        <div className="left-login col-lg-6">
          <img
            className="img-fluid"
            style={{ width: "70px", margin: "30px 0" }}
            src={loginPage}
            alt=""
          />
          <h2>
            Serenity Hospital <br /> Management System
          </h2>
          <div className="form-group d-flex align-items-center justify-content-center w-100 mb-4">
            <label
              htmlFor="user"
              className="col-sm-3 control-label text-white mx-5"
            >
              Login As:
            </label>
            <div className="col-sm-5">
              <select
                id="user"
                className="form-control"
                onChange={handleChange}
                name="user"
                value={selectUser}
              >
                <option value="">Select User:</option>
                <option value="admin">Admin</option>
                <option value="doctor">Doctor</option>
                <option value="patient">Patient</option>
              </select>
            </div>
          </div>
          <form method="POST" onSubmit={(e) => handleSubmit(e)}>
            <input
              type="text"
              placeholder="Username"
              name="userName"
              onChange={handleChange}
            />
            {errorMessages.Username ? (
              <div className="error-messages">
                <p className="error-message">{errorMessages.Username}</p>
              </div>
            ) : (
              <div className="error-messages">
                <p className="error-message">
                  {exception && exception.includes("Username") ? exception : ""}
                </p>
              </div>
            )}
            <div className="password-div d-flex align-items-center justify-content-between px-2">
            <input
              className="pass-input"
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <div className="icon-div-login">
            <i
             onClick={showPassword} class={`fa-solid ${passwordVisible ? "fa-eye-slash" : "fa-eye"}`}></i>
            </div>
            </div>
            {errorMessages.Password ? (
              <div className="error-messages">
                <p className="error-message">{errorMessages.Password}</p>
              </div>
            ) : (
              <div className="error-messages">
                <p className="error-message">
                  {(exception && exception.includes("password")) || (exception && exception.includes("delete")) ? exception : ""}
                </p>
              </div>
            )}
            <button style={{borderRadius:"5px"}} type="submit">Login</button>
          </form>
          <p>Don't you have an account?</p>
          <Link className="text-white" style={{textDecoration:"none",padding:"10px 20px",borderRadius:"5px",marginBottom:"30px",backgroundColor:"#2191BF"}} to="/register">Sign Up</Link>
        </div>
        <div className="right-login col-lg-6">
          <div className="img-div">
            {" "}
            <img
              className="img-fluid"
              style={{ height: "100vh", objectFit: "cover" }}
              src={bgLogin}
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Index;
