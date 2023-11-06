import React from 'react'
import { Outlet } from "react-router-dom";
import DashboardHeader from "../components/DashboardHeader/Index.jsx"

const ReceptionDashboard = () => {
  return (
    <div>
       <DashboardHeader/>
        <div>
            <Outlet/>
        </div>
    </div>
  )
}

export default ReceptionDashboard