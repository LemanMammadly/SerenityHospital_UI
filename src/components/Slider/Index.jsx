import React from 'react'
import "./Index.css"
import slider from '../../assets/imgs/slider-serenity.jpeg'
import { Link } from 'react-router-dom'

const Index = () => {
  return (
    <section>
      <div className="img-div">
        <img src={slider} className='img-fluid' alt="" />
      <div className="text-div">
       <div className="text-div-text">
       <h2>The skill to heal, the spirit to care</h2>
        <p>Dedicated to providing multidisciplinary medical care and backed by state-of-the-art facilities</p>
        <Link to="/appoinment" className='appoinment'>Make An Appoinment</Link>
       </div>
      </div>
      </div>
    </section>
  )
}

export default Index
