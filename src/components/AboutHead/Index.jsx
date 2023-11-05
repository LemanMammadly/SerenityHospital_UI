import React from 'react'
import "./Index.css"
import doctorHeadImg from "../../assets/imgs/hospital-top-image.webp"
import { Link } from 'react-router-dom'

const Index = () => {
  return (
    <section className='aboutHead'>
        <img src={doctorHeadImg} alt="" />
        <div className="aboutHead-text">
        <h1>About Us</h1>
        <div className="breadcrumb-div">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                <li class="breadcrumb-item active" aria-current="page">About</li>
            </ol>
        </nav>
        </div>
        </div>
    </section>
  )
}

export default Index