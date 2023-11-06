import React from 'react'
import "./Index.css"
import SideBarReceptionist from "../../components/Sidebar/Index"
import AppoinmentList from "../../components/AppoinmentList/Index"

const Index = () => {
  return (
    <div className="d-flex">
    <div className="sidebar col-lg-2">
      <SideBarReceptionist />
    </div>
    <div className="home col-lg-10">
      <AppoinmentList/>
    </div>
  </div>
  )
}

export default Index