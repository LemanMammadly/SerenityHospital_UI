import React from 'react'
import SideBarDoctor from "../../components/SideBar/Index";
import RecipeList from "../../components/RecipeList/Index"

const Index = () => {
  return (
    <div className="d-flex">
    <div className="sidebar col-lg-2">
      <SideBarDoctor />
    </div>
    <div className="col-lg-10">
        <RecipeList/>
    </div>
  </div>
  )
}

export default Index