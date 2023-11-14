import React, { useEffect, useState } from "react";
import "./Index.css"
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import axios from "axios";
import moment from "moment";

const localizer = momentLocalizer(moment);

const Index = () => {
  const [data, setData] = useState([]);
  const [appoinmentsdate, setAppoinmentsdate] = useState([]);


  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get(
        `https://localhost:7227/api/PatientAuths/GetByName?userName=${user.username}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        setData(res.data);
        setAppoinmentsdate(
          res.data.appoinments &&
            res.data.appoinments
              .filter((app) => app.status === 1)
              .map((app) => ({
                start: new Date(app.appoinmentDate),
                end: moment(app.appoinmentDate).add(app.duration, 'minutes').toDate(),
                title: `${app.problemDesc} - ${app.doctor.name} ${app.doctor.surname}`,
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
