import React from 'react'
import "./Index.css"
import doctorHeadImg from "../../assets/imgs/doctorHead.jpeg"
import { Link } from 'react-router-dom'

const Index = () => {
  return (
    <section className='doctorHead'>
        <img src={doctorHeadImg} alt="" />
        <div className="doctorHead-text">
        <h1>DOCTORS OF ALL DEPARTMENTS</h1>
        <div className="breadcrumb-div">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                <li class="breadcrumb-item active" aria-current="page">Doctors</li>
            </ol>
        </nav>
        </div>
        </div>
    </section>
  )
}

export default Index