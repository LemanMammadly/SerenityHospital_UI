import React, { useEffect } from 'react'
import "./Index.css"
import AppoinmentHead from '../../components/AppoinmentHead/Index'
import MakeAppoinment from '../../components/MakeAppoinment/Index'

const Index = () => {
  useEffect(() => {
    document.title = "Serenity Hospital | Appoinment";
  }, []);
  
  return (
    <div>
        <AppoinmentHead/>
        <MakeAppoinment/>
    </div>
  )
}

export default Index