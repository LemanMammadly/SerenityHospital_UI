import React, { useEffect, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "./Index.css";
import axios from "axios";
import moment from "moment";
import { Button, Modal } from "react-bootstrap";
import { format } from "date-fns";

const localizer = momentLocalizer(moment);

const Index = () => {
  const [data, setData] = useState([]);
  const [appoinmentsdate, setAppoinmentsdate] = useState([]);
  const [pendingAppointments, setPendingAppointments] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const formatDateTime = (dateTime) => {
    const parsedDate = new Date(dateTime);
    return format(parsedDate, "HH:mm dd-MM-yyyy");
  };

  const user = JSON.parse(localStorage.getItem("user"));

  const ApproveAppoinment = (id) => {
    axios
      .post(
        `https://localhost:7227/api/Appoinments/AcceptAppoinment?id=${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        const updatedData = data.map((item) =>
          item.id === id ? { ...item, status: 1 } : item
        );
        window.location.reload();
        setData(updatedData);
      })
      .catch((err) => console.log(err));
  };

  const RejectAppoinment = (id) => {
    axios
      .post(
        `https://localhost:7227/api/Appoinments/RejectAppoinment?id=${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        const updatedData = data.map((item) =>
          item.id === id ? { ...item, status: 4 } : item
        );
        window.location.reload();
        setData(updatedData);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(
        `https://localhost:7227/api/Appoinments/GetByUsername?userName=${user.username}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        const approvedAppointments = res.data.filter((app) => app.status === 1);
        const pendingAppointments = res.data.filter((app) => app.status === 3);

        const nonDeletedAppointments = pendingAppointments.filter((app) => !app.isDeleted);


        setData(res.data);
        setAppoinmentsdate(
          approvedAppointments.map((app) => ({
            start: new Date(app.appoinmentDate),
            end: moment(app.appoinmentDate)
              .add(app.duration, "minutes")
              .toDate(),
            title:
              app.problemDesc +
              " - " +
              (app.patient
                ? app.patient.name + " " + app.patient.surname
                : app.appoinmentAsDoctor
                ? app.appoinmentAsDoctor.name +
                  " " +
                  app.appoinmentAsDoctor.surname
                : "Unknown"),
          }))
        );
        setPendingAppointments(nonDeletedAppointments);
        console.log(pendingAppointments);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className=" py-2 px-3 all-calendar-div">
      <div className="top-notification px-2 text-end">
        <i
          onClick={handleShow}
          className="notif-bell"
          style={{
            backgroundColor: "#DFE9F2",
            padding: "8px",
            color: "#0860F3",
            borderRadius: "50%",
            fontSize: "17px",
            marginBottom: "10px",
            cursor: "pointer",
          }}
          class="fa-solid fa-bell"
        ></i>
        <span
          className={pendingAppointments.length > 0 ? "notif-red" : ""}
        ></span>
        {pendingAppointments &&
          pendingAppointments.map((pending, index) => (
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
                  <div className="patient-image">
                    <img
                      src={
                        pending.patient && pending.patient.imageUrl
                          ? pending.patient.imageUrl
                          : pending.appoinmentAsDoctor &&
                            pending.appoinmentAsDoctor.imageUrl
                      }
                      alt=""
                    />
                  </div>
                  <div className="patient-name">
                    <i
                      style={{ color: "#183A56" }}
                      class="fa-solid fa-user mx-2"
                    ></i>
                    {pending.patient && pending.patient.name
                      ? pending.patient.name
                      : pending.appoinmentAsDoctor &&
                        pending.appoinmentAsDoctor.name}{" "}
                    {pending.patient && pending.patient.surname
                      ? pending.patient.surname
                      : pending.appoinmentAsDoctor &&
                        pending.appoinmentAsDoctor.surname}
                  </div>
                  <div className="patient-problem">
                    <i style={{color:"#015C4B"}} class="fa-regular fa-comments mx-2"></i>
                    {pending.problemDesc && pending.problemDesc.slice(0, 30)}..
                  </div>
                  <div className="patient-date">
                    <i
                      style={{ color: "green" }}
                      class="fa-regular fa-clock mx-2"
                    ></i>
                    {formatDateTime(pending.appoinmentDate)}
                  </div>
                  <div className="approve-reject d-flex gap-2">
                    <Button
                      onClick={() => ApproveAppoinment(pending.id)}
                      style={{ border: "none" }}
                      className="bg-success"
                    >
                      Approve
                    </Button>
                    <Button
                      onClick={() => RejectAppoinment(pending.id)}
                      style={{ border: "none" }}
                      className="bg-danger"
                    >
                      Reject
                    </Button>
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
      <div className="myCustomHeight">
        <Calendar
          localizer={localizer}
          events={appoinmentsdate}
          startAccessor="start"
          endAccessor="end"
          defaultView="month"
        />
      </div>
    </div>
  );
};

export default Index;
