import React from 'react'
import "./Index.css"
import SideBarDoctor from "../../components/SideBar/Index";
import AppoinmentsAsPatient from "../../components/AppoinmentsAsPatinetList/Index"

const Index = () => {
  return (
    <div className="d-flex">
    <div className="sidebar col-lg-2">
      <SideBarDoctor />
    </div>
    <div className="col-lg-10">
      <AppoinmentsAsPatient/>
    </div>
  </div>
  )
}

export default Index