import React, { useEffect, useState } from "react";
import ResponsiveMenu from "../ResponsiveMenu/Index"
import "./Index.css";

import $ from "jquery"
import axios from "axios";
import { Link } from "react-router-dom";

const Index = () => {

  const[doctorCount,setDoctorCount]=useState("")
  const[patientCount,setPatientCount]=useState("")
  const[nurseCount,setNurseCount]=useState("")
  const[patientRoom,setpatientRoomt]=useState("")
  const[doctorRoom,setDoctorRoomt]=useState("")
  const[departmentCount,setDepartmentCount]=useState("")
  const[serviceCount,setServiceCount]=useState("")
  const[positionCount,setPositionCount]=useState("")
  const[patientHistoryCount,setPatientHistoryCount]=useState("")
  const[appoinmentCount,setAppoinmenCount]=useState("")

  const respOpenMenu = () => {
    const dashboardMenu = $(".dashboard-menu-header");

    dashboardMenu.fadeIn("slow", () => {});
    document.body.style.overflow = "hidden";
  };



  useEffect(()=>{
    axios.get("https://localhost:7227/api/DoctorAuths/Count")
    .then((resp)=>setDoctorCount(resp.data))
    .catch((err)=>console.log(err));
  },[])

  useEffect(()=>{
    axios.get("https://localhost:7227/api/PatientAuths/Count")
    .then((resp)=>setPatientCount(resp.data))
    .catch((err)=>console.log(err));
  },[])

  useEffect(()=>{
    axios.get("https://localhost:7227/api/NurseAuths/Count")
    .then((resp)=>setNurseCount(resp.data))
    .catch((err)=>console.log(err));
  },[])

  useEffect(()=>{
    axios.get("https://localhost:7227/api/PatientRooms/Count")
    .then((resp)=>setpatientRoomt(resp.data))
    .catch((err)=>console.log(err));
  },[])

  useEffect(()=>{
    axios.get("https://localhost:7227/api/DoctorRooms/Count")
    .then((resp)=>setDoctorRoomt(resp.data))
    .catch((err)=>console.log(err));
  },[])

  useEffect(()=>{
    axios.get("https://localhost:7227/api/Departments/Count")
    .then((resp)=>setDepartmentCount(resp.data))
    .catch((err)=>console.log(err));
  },[])

  useEffect(()=>{
    axios.get("https://localhost:7227/api/Services/Count")
    .then((resp)=>setServiceCount(resp.data))
    .catch((err)=>console.log(err));
  },[])

  useEffect(()=>{
    axios.get("https://localhost:7227/api/Appoinments/Count")
    .then((resp)=>setAppoinmenCount(resp.data))
    .catch((err)=>console.log(err));
  },[])

  useEffect(()=>{
    axios.get("https://localhost:7227/api/Positions/Count")
    .then((resp)=>setPositionCount(resp.data))
    .catch((err)=>console.log(err));
  },[])
  
  useEffect(()=>{
    axios.get("https://localhost:7227/api/PatientHistories/Count")
    .then((resp)=>setPatientHistoryCount(resp.data))
    .catch((err)=>console.log(err));
  },[])

  return (
    <section>
      <div className="container-home-dashboard col-lg-12">
        <div className="all-home-dashboard">
          <div className="header-admin-dashboard">
            <h2>Super Admin Dashboard</h2>
            <div className="left-menu-header">
              <i
                onClick={respOpenMenu}
                class="fa-solid fa-bars"
                style={{ color: "#333", marginBottom: "20px" }}
              ></i>
            </div>
          </div>
          <div className="boxes-dashboard">
            <Link to="/superadmin/doctor" style={{textDecoration:"none"}} className="box-dashboard">
              <div className="text-div-dashboard">
                <h3 style={{color:"#303641"}}>{doctorCount}</h3>
                <span style={{color:"#303641"}}>Doctor</span>
              </div>
              <div className="icon-div">
                <i class="fa-solid fa-user-doctor"></i>
              </div>
            </Link>
            <Link to="/superadmin/patients"  style={{textDecoration:"none"}} className="box-dashboard">
              <div className="text-div-dashboard">
                <h3 style={{color:"#F56954"}}>{patientCount}</h3>
                <span style={{color:"#F56954"}}>Patient</span>
              </div>
              <div className="icon-div">
                <i class="fa-solid fa-hospital-user"></i>
              </div>
            </Link>
            <Link to="/superadmin/nurse"  style={{textDecoration:"none"}} className="box-dashboard">
              <div className="text-div-dashboard">
                <h3 style={{color:"#00C0EF"}}>{nurseCount}</h3>
                <span style={{color:"#00C0EF"}}>Nurse</span>
              </div>
              <div className="icon-div">
                <i class="fa-solid fa-user-nurse"></i>
              </div>
            </Link>
            <Link to="/superadmin/patientrooms" style={{textDecoration:"none"}} className="box-dashboard">
              <div className="text-div-dashboard">
                <h3 style={{color:"#0173B7"}}>{patientRoom}</h3>
                <span style={{color:"#0173B7"}}>Patient Room</span>
              </div>
              <div className="icon-div">
                <i class="fa-solid fa-restroom"></i>
              </div>
            </Link>
            <Link to="/superadmin/doctorrooms" style={{textDecoration:"none"}} className="box-dashboard">
              <div className="text-div-dashboard">
                <h3 style={{color:"#00B19E"}}>{doctorRoom}</h3>
                <span style={{color:"#00B19E"}}>Doctor Room</span>
              </div>
              <div className="icon-div">
                <i class="fa-solid fa-hospital"></i>
              </div>
            </Link>
            <Link to="/superadmin/department" style={{textDecoration:"none"}} className="box-dashboard">
              <div className="text-div-dashboard">
                <h3 style={{color:"#FFA812"}}>{departmentCount}</h3>
                <span style={{color:"#FFA812"}}>Department</span>
              </div>
              <div className="icon-div">
                <i class="fa-solid fa-building"></i>
              </div>
            </Link>
            <Link to="/superadmin/service" style={{textDecoration:"none"}} className="box-dashboard">
              <div className="text-div-dashboard">
                <h3 style={{color:"#04A559"}}>{serviceCount}</h3>
                <span style={{color:"#04A559"}}>Service</span>
              </div>
              <div className="icon-div">
                <i class="fa-brands fa-servicestack"></i>
              </div>
            </Link>
            <Link to="/superadmin/appoinments" style={{textDecoration:"none"}} className="box-dashboard">
              <div className="text-div-dashboard">
                <h3 style={{color:"#BA79CB"}}>{appoinmentCount}</h3>
                <span style={{color:"#BA79CB"}}>Appoinment</span>
              </div>
              <div className="icon-div">
                <i class="fa-solid fa-calendar-check"></i>
              </div>
            </Link>
            <Link to="/superadmin/position" style={{textDecoration:"none"}} className="box-dashboard">
              <div className="text-div-dashboard">
                <h3 style={{color:"#6C541F"}}>{positionCount}</h3>
                <span style={{color:"#6C541F"}}>Position</span>
              </div>
              <div className="icon-div">
                <i class="fa-solid fa-map-pin"></i>
              </div>
            </Link>
            <Link to="/superadmin/patienthistory" style={{textDecoration:"none"}} className="box-dashboard">
              <div className="text-div-dashboard">
                <h3 style={{color:"#701C1C"}}>{patientHistoryCount}</h3>
                <span style={{color:"#701C1C"}}>Patient History</span>
              </div>
              <div className="icon-div">
              <i class="fa-solid fa-clock-rotate-left"></i>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="respmenu">
        <ResponsiveMenu/>
      </div>
    </section>
  );
};

export default Index;
