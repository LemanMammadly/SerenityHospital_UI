import React from 'react'
import SideBarPatient from "../../components/Sidebar/Index"
import RecipeList from "../../components/RecipeList/Index"


const Index = () => {
  return (
    <div className="d-flex">
    <div className="sidebar col-lg-2">
      <SideBarPatient />
    </div>
    <div className="home col-lg-10">
        <RecipeList/>
    </div>
  </div>
  )
}

export default Index