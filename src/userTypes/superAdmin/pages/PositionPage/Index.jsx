import React from 'react'
import "./Index.css"
import ResponsiveMenu from "../../components/ResponsiveMenu/Index"
import SiderbarSuperAdmin from "../../components/Siderbar/Index";
import PositionTable from "../../components/PositionTable/Index"

const Index = () => {
  return (
    <div className="d-flex">
     <ResponsiveMenu/>
      <div className="sidebar col-lg-2">
        <SiderbarSuperAdmin />
      </div>
      <div className="col-lg-10">
        <PositionTable/>
      </div>
    </div>
  )
}

export default Index