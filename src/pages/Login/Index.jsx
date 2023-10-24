import React, { useEffect } from 'react'
import "./Index.css"
import Login from '../../components/Login/Index'

const Index = () => {
  useEffect(() => {
    document.title = "Serenity Hospital | Login";
  }, []);
  return (
    <div>
        <Login/>
    </div>
  )
}

export default Index