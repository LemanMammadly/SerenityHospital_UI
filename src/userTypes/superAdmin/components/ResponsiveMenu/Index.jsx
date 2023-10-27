import React from "react";
import "./Index.css"
import { PieChartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import $ from 'jquery'

const Index = () => {
    const respCloseMenu = () => {
        const dashboardMenu = $(".dashboard-menu-header");
    
        dashboardMenu.fadeOut("slow", () => {});
        document.body.style.overflow = "auto";
      };

  return (
    <div>
      {" "}
      <div className="dashboard-menu-header col-lg-12">
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
    </div>
  );
};

export default Index;
