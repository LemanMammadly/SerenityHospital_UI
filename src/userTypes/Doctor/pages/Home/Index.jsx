import React from "react";
import SideBarDoctor from "../../components/SideBar/Index";
import HomeDashboard from "../../components/HomeDashboard/Index";

const Index = () => {

    return (
      <div className="d-flex">
        <div className="sidebar col-lg-2">
          <SideBarDoctor />
        </div>
        <div className="home col-lg-10">
          <HomeDashboard />
        </div>
      </div>
    );
};

export default Index;
