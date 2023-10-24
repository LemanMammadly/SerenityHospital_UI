import React, { useEffect } from 'react'
import "./Index.css"
import AboutHead from "../../components/AboutHead/Index"
import AboutBody from "../../components/AboutBody/Index"
import Service from "../../components/Service/Index"

const Index = () => {
  useEffect(() => {
    document.title = "Serenity Hospital | AboutUs";
  }, []);
  
  return (
    <div>
        <AboutHead/>
        <AboutBody/>
        <Service/>
    </div>
  )
}

export default Index