import React from 'react'
import HomeDashboard from "../../components/HomeDashboard/Index"
import SiderbarSuperAdmin from "../../components/Siderbar/Index"
import ResponsiveMenu from "../../components/ResponsiveMenu/Index"


const Index = () => {
  return (
    <div className='d-flex'>
      <ResponsiveMenu/>
        <div className="sidebar col-lg-2">
        <SiderbarSuperAdmin/>
        </div>
        <div className="home col-lg-10">
        <HomeDashboard/>
        </div>
    </div>
  )
}

export default Index