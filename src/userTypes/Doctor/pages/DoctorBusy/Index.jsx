import React from 'react'
import "./Index.css"
import SideBarDoctor from "../../components/SideBar/Index";
import DoctorAvailable from "../../components/DoctorAvailable/Index"

const Index = () => {
  return (
    <div className="d-flex">
    <div className="sidebar col-lg-2">
      <SideBarDoctor />
    </div>
    <div className="home col-lg-10">
      <DoctorAvailable />
    </div>
  </div>
  )
}

export default Index