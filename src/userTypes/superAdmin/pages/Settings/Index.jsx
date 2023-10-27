import React from "react";
import "./Index.css";
import Settings from "../../components/Settings/Index";
import SiderbarSuperAdmin from "../../components/Siderbar/Index";
import ResponsiveMenu from "../../components/ResponsiveMenu/Index"

const Index = () => {
  return (
    <div className="d-flex">
     <ResponsiveMenu/>
      <div className="sidebar col-lg-2">
        <SiderbarSuperAdmin />
      </div>
      <div className= "col-lg-10">
        <Settings />
      </div>
    </div>
  );
};

export default Index;
