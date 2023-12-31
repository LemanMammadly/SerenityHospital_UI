import React, { useEffect, useState } from "react";
import ResponsiveMenu from "../ResponsiveMenu/Index";
import "./Index.css";
import { Button, Modal } from "react-bootstrap";
import { format } from "date-fns";
import $ from "jquery";
import axios from "axios";
import { Link } from "react-router-dom";

const Index = () => {
  const [doctorCount, setDoctorCount] = useState("");
  const [patientCount, setPatientCount] = useState("");
  const [receptionCount, setReceptionCount] = useState("");
  const [patientRoom, setpatientRoomt] = useState("");
  const [doctorRoom, setDoctorRoomt] = useState("");
  const [departmentCount, setDepartmentCount] = useState("");
  const [serviceCount, setServiceCount] = useState("");
  const [positionCount, setPositionCount] = useState("");
  const [patientHistoryCount, setPatientHistoryCount] = useState("");
  const [appoinmentCount, setAppoinmenCount] = useState("");
  const [messageCount, setMessageCount] = useState("");
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const formatDateTime = (dateTime) => {
    const parsedDate = new Date(dateTime);
    return format(parsedDate, "HH:mm dd-MM-yyyy");
  };

  const user = JSON.parse(localStorage.getItem("user"));

  const respOpenMenu = () => {
    const dashboardMenu = $(".dashboard-menu-header");

    dashboardMenu.fadeIn("slow", () => {});
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    axios
      .get("https://localhost:7227/api/DoctorAuths/Count")
      .then((resp) => setDoctorCount(resp.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("https://localhost:7227/api/PatientAuths/Count")
      .then((resp) => setPatientCount(resp.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("https://localhost:7227/api/NurseAuths/Count")
      .then((resp) => setReceptionCount(resp.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("https://localhost:7227/api/PatientRooms/Count")
      .then((resp) => setpatientRoomt(resp.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("https://localhost:7227/api/DoctorRooms/Count")
      .then((resp) => setDoctorRoomt(resp.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("https://localhost:7227/api/Departments/Count")
      .then((resp) => setDepartmentCount(resp.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("https://localhost:7227/api/Services/Count")
      .then((resp) => setServiceCount(resp.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("https://localhost:7227/api/Appoinments/Count")
      .then((resp) => setAppoinmenCount(resp.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("https://localhost:7227/api/Positions/Count")
      .then((resp) => setPositionCount(resp.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("https://localhost:7227/api/PatientHistories/Count")
      .then((resp) => setPatientHistoryCount(resp.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("https://localhost:7227/api/Contacts/Count")
      .then((resp) => setMessageCount(resp.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("https://localhost:7227/api/Contacts/GetAllReadUnread", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((resp) => {
        const allMessage = resp.data;
        const unreadMessages = allMessage.filter(
          (mess) => mess.isRead === false
        );
        setMessage(unreadMessages);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section>
      <div className="container-home-dashboard col-lg-12">
        <div className="all-home-dashboard">
          <div className="header-admin-dashboard">
            <h2>Admin Dashboard</h2>
            <div className="left-menu-header">
              <i
                onClick={respOpenMenu}
                class="fa-solid fa-bars"
                style={{ color: "#333", marginBottom: "20px" }}
              ></i>
            </div>
            <div className="top-notifcation-admin text-end">
              <Link to={"/superadmin/messages"} style={{fontSize:"13px",fontWeight:"bold",color:"#0A5FF3",marginRight:"5px",textDecoration:"none"}}> Messages</Link>
                <i
                  onClick={handleShow}
                  className="notif-bell"
                  title="Message Notifications"
                  style={{
                    backgroundColor: "#DFE9F2",
                    padding: "8px",
                    color: "#0860F3",
                    borderRadius: "50%",
                    fontSize: "17px",
                    marginBottom: "10px",
                    cursor: "pointer",
                  }}
                  class="fa-regular fa-envelope"
                ></i>
              <span
                className={message.length > 0 ? "notif-red-admin" : "notif-red-admin"}
              ><p>{message.length}</p></span>
              {message &&
                message.map((mess, index) => (
                  <Modal
                    key={index}
                    size="lg"
                    show={show}
                    onHide={handleClose}
                    aria-labelledby="example-modal-sizes-title-lg"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Notifications</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="all-notif-body d-flex gap-2 align-items-center justify-content-between">
                        <div className="message-name">
                          <i
                            style={{ color: "#183A56" }}
                            class="fa-solid fa-user mx-2"
                          ></i>
                          {mess.name}
                        </div>
                        <div className="email-notif">{mess.email}</div>
                        <div className="notif-message">
                          <i
                            style={{ color: "#015C4B" }}
                            class="fa-regular fa-comments mx-2"
                          ></i>
                          <Link
                            to="/superadmin/messages"
                            style={{ color: "red" }}
                          >
                            Message
                          </Link>
                        </div>
                        <div className="patient-date">
                          <i
                            style={{ color: "green" }}
                            class="fa-regular fa-clock mx-2"
                          ></i>
                          {formatDateTime(mess.date)}
                        </div>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                ))}
            </div>
          </div>
          <div className="boxes-dashboard">
            <Link
              to="/superadmin/doctor"
              style={{ textDecoration: "none" }}
              className="box-dashboard"
            >
              <div className="text-div-dashboard">
                <h3 style={{ color: "#303641" }}>{doctorCount}</h3>
                <span style={{ color: "#303641" }}>Doctor</span>
              </div>
              <div className="icon-div">
                <i class="fa-solid fa-user-doctor"></i>
              </div>
            </Link>
            <Link
              to="/superadmin/patients"
              style={{ textDecoration: "none" }}
              className="box-dashboard"
            >
              <div className="text-div-dashboard">
                <h3 style={{ color: "#F56954" }}>{patientCount}</h3>
                <span style={{ color: "#F56954" }}>Patient</span>
              </div>
              <div className="icon-div">
                <i class="fa-solid fa-hospital-user"></i>
              </div>
            </Link>
            <Link
              to="/superadmin/nurse"
              style={{ textDecoration: "none" }}
              className="box-dashboard"
            >
              <div className="text-div-dashboard">
                <h3 style={{ color: "#00C0EF" }}>{receptionCount}</h3>
                <span style={{ color: "#00C0EF" }}>Receptionist</span>
              </div>
              <div className="icon-div">
                <i class="fa-solid fa-bell-concierge"></i>
              </div>
            </Link>
            <Link
              to="/superadmin/patientrooms"
              style={{ textDecoration: "none" }}
              className="box-dashboard"
            >
              <div className="text-div-dashboard">
                <h3 style={{ color: "#0173B7" }}>{patientRoom}</h3>
                <span style={{ color: "#0173B7" }}>Patient Room</span>
              </div>
              <div className="icon-div">
                <i class="fa-solid fa-person-booth"></i>
              </div>
            </Link>
            <Link
              to="/superadmin/doctorrooms"
              style={{ textDecoration: "none" }}
              className="box-dashboard"
            >
              <div className="text-div-dashboard">
                <h3 style={{ color: "#00B19E" }}>{doctorRoom}</h3>
                <span style={{ color: "#00B19E" }}>Doctor Room</span>
              </div>
              <div className="icon-div">
                <i class="fa-solid fa-hospital"></i>
              </div>
            </Link>
            <Link
              to="/superadmin/department"
              style={{ textDecoration: "none" }}
              className="box-dashboard"
            >
              <div className="text-div-dashboard">
                <h3 style={{ color: "#FFA812" }}>{departmentCount}</h3>
                <span style={{ color: "#FFA812" }}>Department</span>
              </div>
              <div className="icon-div">
                <i class="fa-solid fa-building"></i>
              </div>
            </Link>
            <Link
              to="/superadmin/service"
              style={{ textDecoration: "none" }}
              className="box-dashboard"
            >
              <div className="text-div-dashboard">
                <h3 style={{ color: "#04A559" }}>{serviceCount}</h3>
                <span style={{ color: "#04A559" }}>Service</span>
              </div>
              <div className="icon-div">
                <i class="fa-brands fa-servicestack"></i>
              </div>
            </Link>
            <Link
              to="/superadmin/appoinments"
              style={{ textDecoration: "none" }}
              className="box-dashboard"
            >
              <div className="text-div-dashboard">
                <h3 style={{ color: "#BA79CB" }}>{appoinmentCount}</h3>
                <span style={{ color: "#BA79CB" }}>Appoinment</span>
              </div>
              <div className="icon-div">
                <i class="fa-solid fa-calendar-check"></i>
              </div>
            </Link>
            <Link
              to="/superadmin/position"
              style={{ textDecoration: "none" }}
              className="box-dashboard"
            >
              <div className="text-div-dashboard">
                <h3 style={{ color: "#6C541F" }}>{positionCount}</h3>
                <span style={{ color: "#6C541F" }}>Position</span>
              </div>
              <div className="icon-div">
                <i class="fa-solid fa-map-pin"></i>
              </div>
            </Link>
            <Link
              to="/superadmin/patienthistory"
              style={{ textDecoration: "none" }}
              className="box-dashboard"
            >
              <div className="text-div-dashboard">
                <h3 style={{ color: "#701C1C" }}>{patientHistoryCount}</h3>
                <span style={{ color: "#701C1C" }}>Patient History</span>
              </div>
              <div className="icon-div">
                <i class="fa-solid fa-clock-rotate-left"></i>
              </div>
            </Link>
            <Link
              to="/superadmin/messages"
              style={{ textDecoration: "none" }}
              className="box-dashboard"
            >
              <div className="text-div-dashboard">
                <h3 style={{ color: "#61AFFE" }}>{messageCount}</h3>
                <span style={{ color: "#61AFFE" }}>Messages</span>
              </div>
              <div className="icon-div">
                <i class="fa-regular fa-paper-plane"></i>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="respmenu">
        <ResponsiveMenu />
      </div>
    </section>
  );
};

export default Index;
