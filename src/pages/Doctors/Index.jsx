import React, { useEffect } from 'react'
import "./Index.css"
import DoctorsHead from "../../components/DoctorsHead/Index"
import DoctorFilter from "../../components/DoctorFilter/Index"
import TouchWith from "../../components/TouchWith/Index"

const Index = () => {
  useEffect(() => {
    document.title = "Serenity Hospital | Doctors";
  }, []);
  return (
    <div>
        <DoctorsHead/>
        <DoctorFilter/>
        <TouchWith/>
    </div>
  )
}

export default Index