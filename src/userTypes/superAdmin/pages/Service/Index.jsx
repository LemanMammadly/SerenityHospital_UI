import React from 'react'
import "./Index.css"
import ResponsiveMenu from "../../components/ResponsiveMenu/Index"
import SiderbarSuperAdmin from "../../components/Siderbar/Index";
import ServiceTable from "../../components/ServiceTable/Index"


const Index = () => {
  return (
    <div className="d-flex">
     <ResponsiveMenu/>
      <div className="sidebar col-lg-2">
        <SiderbarSuperAdmin />
      </div>
      <div className="col-lg-10 serviceTable">
        <ServiceTable/>
      </div>
    </div>
  )
}

export default Index