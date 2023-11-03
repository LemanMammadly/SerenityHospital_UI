import React from 'react'
import "./Index.css"
import SiderbarSuperAdmin from "../../components/Siderbar/Index"
import ResponsiveMenu from "../../components/ResponsiveMenu/Index"
import NurseList from "../../components/NurseList/Index"

const Index = () => {
  return (
    <div className='d-flex'>
      <ResponsiveMenu/>
        <div className="sidebar col-lg-2">
        <SiderbarSuperAdmin/>
        </div>
        <div className="home col-lg-10">
            <NurseList/>
        </div>
    </div>
  )
}

export default Index