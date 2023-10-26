import React from "react";
import "./Index.css";
import { Link } from "react-router-dom";

const Index = () => {
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
              <Link to="/login">
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
