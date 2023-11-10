import React from 'react'
import SideBarDoctor from "../../components/SideBar/Index";
import AppoinmentList from "../../components/AppoinmentList/Index"


const Index = () => {
  return (
    <div className="d-flex">
    <div className="sidebar col-lg-2">
      <SideBarDoctor />
    </div>
    <div className="col-lg-10">
      <AppoinmentList/>
    </div>
  </div>
  )
}

export default Index