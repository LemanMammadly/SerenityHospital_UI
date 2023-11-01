import React from 'react'
import "./Index.css"
import SideBarDoctor from "../../components/SideBar/Index";
import Profile from "../../components/Profile/Index"

const Index = () => {
  return (
    <div className="d-flex">
    <div className="sidebar col-lg-2">
      <SideBarDoctor />
    </div>
    <div className="home col-lg-10">
        <Profile/>
    </div>
  </div>
  )
}

export default Index