import React from 'react'
import "./Index.css"
import SideBarPatient from "../../components/Sidebar/Index"
import PatientHistory from "../../components/PatientHistory/Index"

const Index = () => {
  return (
    <div className="d-flex">
    <div className="sidebar col-lg-2">
      <SideBarPatient />
    </div>
    <div className="home col-lg-10">
      <PatientHistory/>
    </div>
  </div>
  )
}

export default Index