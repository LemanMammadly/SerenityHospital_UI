import React from 'react'
import SideBarPatient from "../../components/Sidebar/Index"
import DoctorList from  "../../components/DoctorList/Index"

const Index = () => {
  return (
    <div className="d-flex">
    <div className="sidebar col-lg-2">
      <SideBarPatient />
    </div>
    <div className="home col-lg-10">
      <DoctorList/>
    </div>
  </div>
  )
}

export default Index