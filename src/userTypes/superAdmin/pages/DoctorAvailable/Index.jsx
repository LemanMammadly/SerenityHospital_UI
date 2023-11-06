import React from 'react'
import "./Index.css"
import SiderbarSuperAdmin from "../../components/Siderbar/Index"
import ResponsiveMenu from "../../components/ResponsiveMenu/Index"
import DoctorBusy from "../../components/DoctorBusy/Index"

const Index = () => {
  return (
    <div className='d-flex'>
      <ResponsiveMenu/>
        <div className="sidebar col-lg-2">
        <SiderbarSuperAdmin/>
        </div>
        <div className="home col-lg-10">
            <DoctorBusy/>
        </div>
    </div>
  )
}

export default Index