import React from 'react'
import ResponsiveMenu from "../../components/ResponsiveMenu/Index"
import SiderbarSuperAdmin from "../../components/Siderbar/Index";
import PatientHistory from "../../components/PatientHistory/Index"

const Index = () => {
  return (
    <div className="d-flex">
     <ResponsiveMenu/>
      <div className="sidebar col-lg-2">
        <SiderbarSuperAdmin />
      </div>
      <div className="col-lg-10 serviceTable">
        <PatientHistory/>
      </div>
    </div>
  )
}

export default Index