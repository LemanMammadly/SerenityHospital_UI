import React from 'react'
import SideBarReceptionist from "../../components/Sidebar/Index"
import HomeReceptionist from "../../components/HomeReceptionist/Index"

const Index = () => {
  return (
    <div className="d-flex">
    <div className="sidebar col-lg-2">
      <SideBarReceptionist />
    </div>
    <div className="home col-lg-10">
      <HomeReceptionist/>
    </div>
  </div>
  )
}

export default Index