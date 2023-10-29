import React from 'react'
import "./Index.css"
import ResponsiveMenu from "../../components/ResponsiveMenu/Index"
import SiderbarSuperAdmin from "../../components/Siderbar/Index";
import DoctorTable from "../../components/DoctorTable/Index"

const Index = () => {
  return (
    <div className="d-flex">
     <ResponsiveMenu/>
      <div className="sidebar col-lg-2">
        <SiderbarSuperAdmin />
      </div>
      <div className="col-lg-10">
        <DoctorTable/>
      </div>
    </div>
  )
}

export default Index