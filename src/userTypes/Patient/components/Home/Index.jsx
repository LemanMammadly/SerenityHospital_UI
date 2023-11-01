import React, { useEffect, useState } from "react";
import "./Index.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { GiPin } from "react-icons/gi";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";

const Index = () => {
  const [date, changeDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [appoinmentsdate, setAppoinmentsdate] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get(
        `https://localhost:7227/api/PatientAuths/GetByName?userName=${user.username}`
      )
      .then((res) => {
        setData(res.data);
        setAppoinmentsdate(
          res.data.appoinments &&
            res.data.appoinments.map((app) => app.appoinmentDate)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(data.appoinments);

  function changeValue(val) {
    changeDate(val);
  }

  const tileContent = ({ date, view }) => {
    const uniqueAppointments = [...new Set(appoinmentsdate)];

    const isAppointmentDate = uniqueAppointments.some((appDate) => {
      const app = new Date(appDate);
      return (
        app.getDate() === date.getDate() &&
        app.getMonth() === date.getMonth() &&
        app.getFullYear() === date.getFullYear()
      );
    });

    if (isAppointmentDate) {
      return (
        <div className="appointment-date">
          {
            <GiPin
              style={{ color: "red", width: "40px" }}
              onClick={handleShow}
            />
          }
        </div>
      );
    }
  };

  return (
    <div className="patient-home">
      <h1 className="dash-patient">Patient Dashboard</h1>
      <div className="calendar-patient d-flex justify-content-around">
        <Calendar onChange={changeValue} value={date} maxDetail="year" />
        <Calendar
          tileContent={tileContent}
          onChange={changeValue}
          value={date}
        />
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Appoinment Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {data.appoinments &&
            data.appoinments.map((app) => (
              <div className="modal-content p-3 my-3 bg-secondary text-white">
                <span>
                  Date :{" "}
                  <i
                    style={{ color: "#69B1FF" }}
                    class="fa-solid fa-calendar-days mx-2"
                  ></i>
                  {app.appoinmentDate && app.appoinmentDate.split("T")[0]}
                  <i
                    style={{ color: "#FF6575" }}
                    class="fa-regular fa-clock mx-2"
                  ></i>
                  {app.appoinmentDate &&
                    app.appoinmentDate.split("T")[1].substring(0, 5)}
                </span>
                <span>Doctor : {app.doctor.name}</span>
                <span>Problem : {app.problemDesc}</span>
              </div>
            ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Index;
