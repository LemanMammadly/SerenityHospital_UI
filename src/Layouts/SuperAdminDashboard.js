import { Outlet } from "react-router-dom";
import React from "react";
import DashboardHeader from "../components/DashboardHeader/Index.jsx"
import SiderbarSuperAdmin from "../userTypes/superAdmin/components/Siderbar/Index.jsx"

const SuperAdminDashboard = () => {
  return (
    <div>
      <DashboardHeader/>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
