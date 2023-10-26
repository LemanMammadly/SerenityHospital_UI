import React, { useEffect, useState } from "react";
import "./Index.css";
import { Link } from "react-router-dom";
import { PieChartOutlined } from "@ant-design/icons";
import $ from "jquery"
import axios from "axios";

const Index = () => {

  const[doctorCount,setDoctorCount]=useState("")
  const[patientCount,setPatientCount]=useState("")
  const[nurseCount,setNurseCount]=useState("")
  const[patientRoom,setpatientRoomt]=useState("")
  const[doctorRoom,setDoctorRoomt]=useState("")
  const[departmentCount,setDepartmentCount]=useState("")
  const[serviceCount,setServiceCount]=useState("")
  const[appoinmentCount,setAppoinmenCount]=useState("")

  const respOpenMenu = () => {
    const dashboardMenu = $(".dashboard-menu-header");

    dashboardMenu.fadeIn("slow", () => {});
    document.body.style.overflow = "hidden";
  };

  const respCloseMenu = () => {
    const dashboardMenu = $(".dashboard-menu-header");

    dashboardMenu.fadeOut("slow", () => {});
    document.body.style.overflow = "auto";
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
            <div className="box-dashboard">
              <div className="text-div-dashboard">
                <h3>{doctorCount}</h3>
                <span>Doctor</span>
              </div>
              <div className="icon-div">
                <i class="fa-solid fa-user-doctor"></i>
              </div>
            </div>
            <div className="box-dashboard">
              <div className="text-div-dashboard">
                <h3>{patientCount}</h3>
                <span>Patient</span>
              </div>
              <div className="icon-div">
                <i class="fa-solid fa-hospital-user"></i>
              </div>
            </div>
            <div className="box-dashboard">
              <div className="text-div-dashboard">
                <h3>{nurseCount}</h3>
                <span>Nurse</span>
              </div>
              <div className="icon-div">
                <i class="fa-solid fa-user-nurse"></i>
              </div>
            </div>
            <div className="box-dashboard">
              <div className="text-div-dashboard">
                <h3>{patientRoom}</h3>
                <span>Patient Room</span>
              </div>
              <div className="icon-div">
                <i class="fa-solid fa-restroom"></i>
              </div>
            </div>
            <div className="box-dashboard">
              <div className="text-div-dashboard">
                <h3>{doctorRoom}</h3>
                <span>Doctor Room</span>
              </div>
              <div className="icon-div">
                <i class="fa-solid fa-hospital"></i>
              </div>
            </div>
            <div className="box-dashboard">
              <div className="text-div-dashboard">
                <h3>{departmentCount}</h3>
                <span>Department</span>
              </div>
              <div className="icon-div">
                <i class="fa-solid fa-building"></i>
              </div>
            </div>
            <div className="box-dashboard">
              <div className="text-div-dashboard">
                <h3>{serviceCount}</h3>
                <span>Service</span>
              </div>
              <div className="icon-div">
                <i class="fa-brands fa-servicestack"></i>
              </div>
            </div>
            <div className="box-dashboard">
              <div className="text-div-dashboard">
                <h3>{appoinmentCount}</h3>
                <span>Appoinment</span>
              </div>
              <div className="icon-div">
                <i class="fa-solid fa-calendar-check"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="dashboard-menu-header">
        <i
          onClick={respCloseMenu}
          class="fa-solid fa-xmark"
          style={{ padding: "20px", fontSize: "25px" }}
        ></i>
        <ul>
          <li>
            <Link to="#">
              {" "}
              <PieChartOutlined /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="#">
              {" "}
              <PieChartOutlined /> Doctor
            </Link>
          </li>
          <li>
            <Link to="#">
              {" "}
              <PieChartOutlined /> Patient
            </Link>
          </li>
          <li>
            <Link to="#">
              {" "}
              <PieChartOutlined /> Department
            </Link>
          </li>
          <li>
            <Link to="#">
              {" "}
              <PieChartOutlined /> Nurse
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Index;
