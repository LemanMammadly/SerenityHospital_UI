import React from 'react'
import "./Index.css"
import { Link } from 'react-router-dom'

const Index = () => {
  return (
    <section className='touchWith-section'>
        <div className="container-touchWith">
            <div className="all-touchWith">
                <div className="left-all-touchWith">
                    <p>Get In Touch With Our Specialists</p>
                </div>
                <div className="right-all-touchWith">
                    <Link to='/'><i class="fa-regular fa-calendar-days"></i> Book An Appoinment</Link>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Index