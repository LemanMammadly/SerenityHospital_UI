import React, { useEffect, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "./Index.css"
import axios from "axios";
import moment from "moment";

const localizer = momentLocalizer(moment);

const Index = () => {
  const [data, setData] = useState([]);
  const [appoinmentsdate, setAppoinmentsdate] = useState([]);


  const user = JSON.parse(localStorage.getItem("user"));


  useEffect(() => {
    axios
      .get(`https://localhost:7227/api/Appoinments/GetByUsername?userName=${user.username}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        const approvedAppointments = res.data.filter((app) => app.status === 1);
  
        

        setData(res.data);
        setAppoinmentsdate(
          approvedAppointments.map((app) => ({
            start: new Date(app.appoinmentDate),
            end: moment(app.appoinmentDate).add(app.duration, 'minutes').toDate(),
            title: app.problemDesc + " - " + (app.patient ? app.patient.name + " " + app.patient.surname : (app.appoinmentAsDoctor ? app.appoinmentAsDoctor.name + " " + app.appoinmentAsDoctor.surname : "Unknown")),
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="myCustomHeight p-4 all-calendar-div">
      <Calendar
        localizer={localizer}
        events={appoinmentsdate}
        startAccessor="start"
        endAccessor="end"
        defaultView="month"
      />
    </div>
  );
};

export default Index;
