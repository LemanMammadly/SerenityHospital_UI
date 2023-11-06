import React from 'react'
import "./Index.css"
import Profile from "../../components/Profile/Index"
import SideBarReceptionist from "../../components/Sidebar/Index"

const Index = () => {
  return (
    <div className="d-flex">
    <div className="sidebar col-lg-2">
      <SideBarReceptionist />
    </div>
    <div className="home col-lg-10">
      <Profile/>
    </div>
  </div>
  )
}

export default Index