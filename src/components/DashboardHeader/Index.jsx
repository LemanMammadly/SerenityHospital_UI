import React, { useEffect, useState } from "react";
import "./Index.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Index = () => {

  const [logout,setLogout]=useState(false);

  const user=JSON.parse(localStorage.getItem("user"));

  let endpoint = "";

  if (user && user.roles && user.roles[0] === "Admin") {
    endpoint = "AdminAuths";
  } else if (user &&  user.roles && user.roles[0] === "Patient") {
    endpoint = "PatientAuths";
  } else if (user &&  user.roles && user.roles[0] === "Doctor") {
    endpoint = "DoctorAuths";
  }


  function handleLogout() {
    setLogout(true);
  }

    useEffect(()=>{
      if(logout)
      {
        axios
      .post(`https://localhost:7227/api/${endpoint}/Logout`,{}, {
        headers: {
          Authorization: `Bearer ${user && user.token && user.token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res)=>{
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
    }, [logout, endpoint, user && user.token && user.token])

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
              <Link onClick={handleLogout}>
                Logout<i class="fa-solid fa-arrow-right-from-bracket mx-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Index;
