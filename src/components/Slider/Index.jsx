import React from 'react'
import "./Index.css"
import slider from '../../assets/imgs/C1D0B356-20E0-4365-AE18-ECDD46369448_1_201_a.jpeg'
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
    <section>
      <div className="img-div">
        <img src={slider} className='img-fluid' alt="" />
      <div className="text-div">
       <div className="text-div-text">
       <h2>The skill to heal, the spirit to care</h2>
        <p>Dedicated to providing multidisciplinary medical care and backed by state-of-the-art facilities</p>
        <div className="appoinment-button d-flex align-items-center justify-content-center">
        <Link onClick={makeAnAppoinment} className='appoinment'>Make An Appoinment</Link>
        </div>
       </div>
      </div>
      </div>
    </section>
  )
}

export default Index
