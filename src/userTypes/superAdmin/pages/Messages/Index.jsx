import React from "react";
import SiderbarSuperAdmin from "../../components/Siderbar/Index"
import ResponsiveMenu from "../../components/ResponsiveMenu/Index"
import Messages from "../../components/Messages/Index"

const Index = () => {
  return (
    <div className="d-flex">
      <ResponsiveMenu />
      <div className="sidebar col-lg-2">
        <SiderbarSuperAdmin />
      </div>
      <div className="home col-lg-10">
        <Messages />
      </div>
    </div>
  );
};

export default Index;
