import React from 'react'
import { Outlet } from "react-router-dom";
import DashboardHeader from "../components/DashboardHeader/Index.jsx"

const DoctorDashboard = () => {
  return (
    <div>
       <DashboardHeader/>
        <div>
            <Outlet/>
        </div>
    </div>
  )
}

export default DoctorDashboard