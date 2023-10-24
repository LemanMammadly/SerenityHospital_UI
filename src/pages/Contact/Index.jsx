import React, { useEffect } from 'react'
import "./Index.css"
import ContactPhone from "../../components/ContactPhone/Index"
import ContactHead from "../../components/ContactHead/Index"
import ContactSend from "../../components/ContactSend/Index"

const Index = () => {
  useEffect(() => {
    document.title = "Serenity Hospital | Contact";
  }, []);
  return (
    <div>
        <ContactHead/>
        <ContactPhone/>
        <ContactSend/>
    </div>
  )
}

export default Index