import React from 'react'
import "./Index.css"
import HomeDashboard from "../../components/HomeDashboard/Index"
import SiderbarSuperAdmin from "../../components/Siderbar/Index"


const Index = () => {
  return (
    <div className='d-flex'>
        <SiderbarSuperAdmin/>
        <HomeDashboard/>
    </div>
  )
}

export default Index