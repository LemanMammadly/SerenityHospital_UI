import React, { useEffect } from 'react'
import './Index.css'
import Slider from "../../components/Slider/Index"
import Welcome from "../../components/Welcome/Index"
import Service from "../../components/Service/Index"
import Departments from "../../components/Departments/Index"
import Doctors from "../../components/Doctors/Index"

const Index = () => {
  useEffect(() => {
    document.title = "Serenity Hospital | Home";
  }, []);
  return (
    <div>
        <Slider/>
        <Welcome/>
        <Service/>
        <Departments/>
        <Doctors/>
    </div>
  )
}

export default Index