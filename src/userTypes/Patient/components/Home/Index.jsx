// import React, { useEffect, useState } from "react";
// import "./Index.css";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import axios from "axios";
// import moment from "moment";
// import { Button, Modal } from "react-bootstrap";

// const localizer = momentLocalizer(moment);

// const Index = () => {
//   const [data, setData] = useState([]);
//   const [appoinmentsdate, setAppoinmentsdate] = useState([]);
//   const [approveRejectAppoinments, setApproveRejectAppoinments] = useState([]);

//   const user = JSON.parse(localStorage.getItem("user"));

//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   useEffect(() => {
//     axios
//       .get(
//         `https://localhost:7227/api/PatientAuths/GetByName?userName=${user.username}`,
//         {
//           headers: {
//             Authorization: `Bearer ${user.token}`,
//           },
//         }
//       )
//       .then((res) => {
//         setData(res.data);
//         setAppoinmentsdate(
//           res.data.appoinments &&
//             res.data.appoinments
//               .filter((app) => app.status === 1)
//               .map((app) => ({
//                 start: new Date(app.appoinmentDate),
//                 end: moment(app.appoinmentDate)
//                   .add(app.duration, "minutes")
//                   .toDate(),
//                 title: `${app.problemDesc} - ${app.doctor.name} ${app.doctor.surname}`,
//               }))
//         );

//         setApproveRejectAppoinments(res.data.appoinments && res.data.appoinments.filter((app)=>app.status===1 || app.status===3))
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   return (
//     <div className="py-2 px-3 all-calendar-div">
//       <div className="top-notification px-2 text-end">
//         <i
//           // onClick={handleShow}
//           className="notif-bell"
//           style={{
//             backgroundColor: "#DFE9F2",
//             padding: "8px",
//             color: "#0860F3",
//             borderRadius: "50%",
//             fontSize: "17px",
//             marginBottom: "10px",
//             cursor: "pointer",
//           }}
//           class="fa-solid fa-bell"
//         ></i>
//         <span className={"notif-red"}></span>
//         {/* {pendingAppointments &&
//           pendingAppointments.map((pending, index) => ( */}
//         <Modal
//           // key={index}
//           size="lg"
//           show={show}
//           onHide={handleClose}
//           aria-labelledby="example-modal-sizes-title-lg"
//         >
//           <Modal.Header closeButton>
//             <Modal.Title>Notifications</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <div className="all-notif-body d-flex gap-2 align-items-center justify-content-between">
//               <div className="patient-image">
//                 <img
//                   // src={
//                   //   pending.patient && pending.patient.imageUrl
//                   //     ? pending.patient.imageUrl
//                   //     : pending.appoinmentAsDoctor &&
//                   //       pending.appoinmentAsDoctor.imageUrl
//                   // }
//                   alt=""
//                 />
//               </div>
//               <div className="patient-name">
//                 <i
//                   style={{ color: "#183A56" }}
//                   class="fa-solid fa-user mx-2"
//                 ></i>
//                 {/* {pending.patient && pending.patient.name
//                       ? pending.patient.name
//                       : pending.appoinmentAsDoctor &&
//                         pending.appoinmentAsDoctor.name}{" "}
//                     {pending.patient && pending.patient.surname
//                       ? pending.patient.surname
//                       : pending.appoinmentAsDoctor &&
//                         pending.appoinmentAsDoctor.surname} */}
//               </div>
//               <div className="patient-problem">
//                 <i
//                   style={{ color: "#015C4B" }}
//                   class="fa-regular fa-comments mx-2"
//                 ></i>
//                 {/* {pending.problemDesc && pending.problemDesc.slice(0, 30)}.. */}
//               </div>
//               <div className="patient-date">
//                 <i
//                   style={{ color: "green" }}
//                   class="fa-regular fa-clock mx-2"
//                 ></i>
//                 {/* {formatDateTime(pending.appoinmentDate)} */}
//               </div>
//               <div className="approve-reject d-flex gap-2">
//                 <Button
//                   // onClick={() => ApproveAppoinment(pending.id)}
//                   style={{ border: "none" }}
//                   className="bg-success"
//                 >
//                   Approve
//                 </Button>
//                 <Button
//                   // onClick={() => RejectAppoinment(pending.id)}
//                   style={{ border: "none" }}
//                   className="bg-danger"
//                 >
//                   Reject
//                 </Button>
//               </div>
//             </div>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={handleClose}>
//               Close
//             </Button>
//           </Modal.Footer>
//         </Modal>
//         {/* ))} */}
//       </div>
//       <div className="myCustomHeight p-4 all-calendar-div">
//         <Calendar
//           localizer={localizer}
//           events={appoinmentsdate}
//           startAccessor="start"
//           endAccessor="end"
//           defaultView="month"
//         />
//       </div>
//     </div>
//   );
// };

// export default Index;

import React, { useEffect, useState } from "react";
import "./Index.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import axios from "axios";
import moment from "moment";
import { Button, Modal } from "react-bootstrap";

const localizer = momentLocalizer(moment);

const Index = () => {
  const [data, setData] = useState([]);
  const [appoinmentsdate, setAppoinmentsdate] = useState([]);
  const [approvedAppointments, setApprovedAppointments] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

        const allAppointments = res.data.appoinments || [];

        const approvedAppointments = allAppointments.filter(
          (app) => app.status === 1 || app.status === 4
        );

        setApprovedAppointments(approvedAppointments.reverse());

        setAppoinmentsdate(
          approvedAppointments.map((app) => ({
            start: new Date(app.appoinmentDate),
            end: moment(app.appoinmentDate)
              .add(app.duration, "minutes")
              .toDate(),
            title: `${app.problemDesc} - ${app.doctor.name} ${app.doctor.surname}`,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="py-2 px-3 all-calendar-div">
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
        {/* <span className={"notif-red"}></span> */}
        <Modal
          size="lg"
          show={show}
          onHide={handleClose}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Notifications</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {approvedAppointments.slice(0, 3).length > 0 ? (
              approvedAppointments.slice(0, 3).map((approved, index) => (
                <div
                  key={index}
                  className="all-notif-body d-flex gap-2 align-items-center justify-content-between"
                >
                  <div
                    className={`${
                      approved.status === 1
                        ? "alert alert-success"
                        : approved.status === 4
                        ? "alert alert-danger"
                        : ""
                    } w-100`}
                    style={{ marginBottom: "5px" }}
                  >
                    <i
                      style={{
                        color: "#fff",
                        backgroundColor:
                          approved.status === 1
                            ? "green"
                            : approved.status === 4
                            ? "red"
                            : "",
                        padding:
                          approved.status === 1
                            ? "5px"
                            : approved.status === 4
                            ? "4.5px 6.5px"
                            : "",
                        borderRadius: "50%",
                        marginRight: "10px",
                        fontSize: "12px",
                      }}
                      className={`fa-solid ${
                        approved.status === 1
                          ? "fa-check"
                          : approved.status === 4
                          ? "fa-xmark"
                          : ""
                      }`}
                    ></i>{" "}
                    Dr. {approved.doctor && approved.doctor.name}{" "}
                    {approved.doctor && approved.doctor.surname}{" "}
                    {approved.status === 1 ? "approved" : "rejected"} your
                    appointment.
                  </div>
                </div>
              ))
            ) : (
              <p className="alert alert-dark">There are no notifications to show recently.</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div className="myCustomHeight p-4 all-calendar-div">
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
