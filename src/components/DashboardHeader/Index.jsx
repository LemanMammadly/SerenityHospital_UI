import React, { useEffect, useState } from "react";
import "./Index.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Index = () => {
  const [logout, setLogout] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  let endpoint = "";

  if (user && user.roles && user.roles[0] === "Admin") {
    endpoint = "AdminAuths";
  } else if (user && user.roles && user.roles[0] === "Patient") {
    endpoint = "PatientAuths";
  } else if (user && user.roles && user.roles[0] === "Doctor") {
    endpoint = "DoctorAuths";
  } else if (user && user.roles && user.roles[0] === "Receptionist") {
    endpoint = "NurseAuths";
  }

  function handleLogout() {
    setLogout(true);
  }

  useEffect(() => {
    if (logout) {
      axios
        .post(
          `https://localhost:7227/api/${endpoint}/Logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${user && user.token && user.token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.status === 204) {
            localStorage.removeItem("user");
            window.location.href = "/login";
          } else {
            console.error("Logout failed with status code:", res.status);
          }
        })
        .catch((error) => {
          console.error("Error during logout:", error);
        });
    }
  }, [logout, endpoint, user && user.token && user.token]);

  return (
    <header>
      <div className="container-dashboard">
        <div className="all-header-dashboard">
          <div className="top-header-dashboard">
            <h2>Serenity Hospital Management System</h2>
          </div>
          <div className="bottom-header-dashboard">
            <div className="right-bottom-header">
              <Link to="/">
                <i class="fa-solid fa-earth-americas mx-2"></i>Website
              </Link>
              <hr className="dashboard-hr" />
              <div className="username-login d-flex align-items-center justify-content-center gap-1">
                <i
                  style={{
                    backgroundColor: "transparent",
                    border: "1px solid #fff",
                    borderRadius: "50%",
                    padding: "3px",
                    fontSize: "7.5px",
                    color: "#fff",
                  }}
                  class="fa-regular fa-user"
                ></i>
                <h5
                  style={{ color: "#fff", fontSize: "13px", marginBottom: "0",textTransform:"capitalize"}}
                >
                  {" "}
                  {user.username}
                </h5>
                <div className="logout-link" style={{borderRadius:"5px",padding:"10px"}}>
                <Link style={{color:"#fff",padding:"5px",marginTop:"0px"}} className="d-flex align-items-center gap-1" to={`/${user.roles[0].toLowerCase()}/profile`}>
                  <i style={{marginRight:"5px"}} class="fa-solid fa-user"></i>
                  Profile
                </Link>
                <Link style={{color:"#fff",padding:"5px",marginTop:"0px"}} className="d-flex align-items-center gap-1" onClick={handleLogout}>
                  <i style={{marginRight:"5px"}} class="fa-solid fa-arrow-right-from-bracket"></i>
                  Logout
                </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Index;
