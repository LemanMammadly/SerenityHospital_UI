import React from 'react'
import "./Index.css"
import { Link } from 'react-router-dom'

const Index = () => {

    var user=JSON.parse(localStorage.getItem("user"));

    const makeAnAppoinment=()=>{
      if(user && user.roles && user.roles[0]=== "Patient")
      {
        window.location.href = "/patient/appoinments";
      }
      else
      {
        window.location.href="/login";
      }
    }
  
  return (
    <section className='touchWith-section'>
        <div className="container-touchWith">
            <div className="all-touchWith">
                <div className="left-all-touchWith">
                    <p>Get In Touch With Our Specialists</p>
                </div>
                <div className="right-all-touchWith">
                    <Link className='make-an-appoinment-btn'  onClick={makeAnAppoinment}><i class="fa-regular fa-calendar-days"></i> Book An Appoinment</Link>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Index