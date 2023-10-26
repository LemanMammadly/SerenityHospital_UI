import React from "react";
import "./Index.css";
import { Link } from "react-router-dom";
import { PieChartOutlined } from "@ant-design/icons";
import $ from "jquery"

const Index = () => {
  const respOpenMenu = () => {
    const dashboardMenu = $(".dashboard-menu-header");

    dashboardMenu.fadeIn("slow", () => {});
    document.body.style.overflow = "hidden";
  };

  const respCloseMenu = () => {
    const dashboardMenu = $(".dashboard-menu-header");

    dashboardMenu.fadeOut("slow", () => {});
    document.body.style.overflow = "auto";
  };

  return (
    <section className="col-lg-10">
      <div className="container-home-dashboard">
        <div className="all-home-dashboard">
          <div className="header-admin-dashboard">
            <h2>Super Admin Dashboard</h2>
            <div className="left-menu-header">
              <i
                onClick={respOpenMenu}
                class="fa-solid fa-bars"
                style={{ color: "#333", marginBottom: "20px" }}
              ></i>
            </div>
          </div>
          <div className="boxes-dashboard">
            <div className="box-dashboard">
              <div className="text-div-dashboard">
                <h3>2</h3>
                <span>Doctor</span>
              </div>
              <div className="icon-div">
                <i class="fa-solid fa-user-doctor"></i>
              </div>
            </div>
            <div className="box-dashboard">
              <div className="text-div-dashboard">
                <h3>2</h3>
                <span>Patient</span>
              </div>
              <div className="icon-div">
                <i class="fa-solid fa-hospital-user"></i>
              </div>
            </div>
            <div className="box-dashboard">
              <div className="text-div-dashboard">
                <h3>2</h3>
                <span>Nurse</span>
              </div>
              <div className="icon-div">
                <i class="fa-solid fa-user-nurse"></i>
              </div>
            </div>
            <div className="box-dashboard">
              <div className="text-div-dashboard">
                <h3>2</h3>
                <span>Patient Room</span>
              </div>
              <div className="icon-div">
                <i class="fa-solid fa-restroom"></i>
              </div>
            </div>
            <div className="box-dashboard">
              <div className="text-div-dashboard">
                <h3>2</h3>
                <span>Doctor Room</span>
              </div>
              <div className="icon-div">
                <i class="fa-solid fa-hospital"></i>
              </div>
            </div>
            <div className="box-dashboard">
              <div className="text-div-dashboard">
                <h3>2</h3>
                <span>Department</span>
              </div>
              <div className="icon-div">
                <i class="fa-solid fa-building"></i>
              </div>
            </div>
            <div className="box-dashboard">
              <div className="text-div-dashboard">
                <h3>2</h3>
                <span>Service</span>
              </div>
              <div className="icon-div">
                <i class="fa-brands fa-servicestack"></i>
              </div>
            </div>
            <div className="box-dashboard">
              <div className="text-div-dashboard">
                <h3>2</h3>
                <span>Appoinment</span>
              </div>
              <div className="icon-div">
                <i class="fa-solid fa-calendar-check"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="dashboard-menu-header">
        <i
          onClick={respCloseMenu}
          class="fa-solid fa-xmark"
          style={{ padding: "20px", fontSize: "25px" }}
        ></i>
        <ul>
          <li>
            <Link to="#">
              {" "}
              <PieChartOutlined /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="#">
              {" "}
              <PieChartOutlined /> Doctor
            </Link>
          </li>
          <li>
            <Link to="#">
              {" "}
              <PieChartOutlined /> Patient
            </Link>
          </li>
          <li>
            <Link to="#">
              {" "}
              <PieChartOutlined /> Department
            </Link>
          </li>
          <li>
            <Link to="#">
              {" "}
              <PieChartOutlined /> Nurse
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Index;
