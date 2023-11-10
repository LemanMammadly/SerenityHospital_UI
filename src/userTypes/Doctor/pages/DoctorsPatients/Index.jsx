import React from 'react'
import SideBarDoctor from "../../components/SideBar/Index";
import PatientsListDoctor from "../../components/PatientsListDoctor/Index"

const Index = () => {
  return (
    <div className="d-flex">
    <div className="sidebar col-lg-2">
      <SideBarDoctor />
    </div>
    <div className="col-lg-10">
        <PatientsListDoctor/>
    </div>
  </div>
  )
}

export default Index