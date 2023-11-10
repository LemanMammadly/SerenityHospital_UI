import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Index = () => {
    const { id } = useParams();
    const [selectRooom, setSelectRooom] = useState("");
    const [room, setRoom] = useState([]);
    const [errorMessages, setErrorMessages] = useState([]);
    const [exception, setException] = useState("");
  
    const nav = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));
  
    const handleChange = (e) => {
      const { name, value } = e.target;
  
      setErrorMessages((prev) => ({
        ...prev,
        [name]: null,
      }));
  
      if (name === "roomId") {
        setSelectRooom(value);
      }
    };
  
    useEffect(() => {
      axios
        .get("https://localhost:7227/api/PatientRooms", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((resp) => {
          setRoom(resp.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const formData = new FormData();
      formData.append("id", id);
      formData.append("roomId",selectRooom)
  
      axios
        .post("https://localhost:7227/api/PatientAuths/AddPatientRoom", formData, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => nav("/superadmin/patients"))
        .catch((e) => {
          if (e.response && e.response.data && e.response.data.errors) {
            setErrorMessages(e.response.data.errors);
          } else {
            setException(e.response.data.message);
          }
        });
  
        console.log(formData);
    };
  return (
    <section>
      <div className="all-addroom-create">
        <Link
          to="/superadmin/patients"
          className="back-to-superadmin"
          style={{ textDecoration: "none", color: "#333" }}
        >
          <i
            className="fa-solid fa-chevron-left"
            style={{ marginRight: "10px" }}
          ></i>
          Super Admin / Patients
        </Link>
        <div className="top-addroom-create">
          <h1>Add Room</h1>
        </div>
        <div className="bottom-addroom-create">
          <form method="POST" onSubmit={(e) => handleSubmit(e)}>
            <div className="panel-body d-flex flex-column gap-4">
              <div className="form-group d-flex align-items-center justify-content-center">
                <label htmlFor="roomId" className="col-sm-3 control-label">
                  Room Number
                </label>
                <div className="col-sm-5">
                  <select
                    id="roomId"
                    className="form-control"
                    onChange={handleChange}
                    name="roomId"
                    value={selectRooom}
                  >
                    <option value="">Select Room: </option>
                    {room.filter((rooms)=>rooms.isDeleted===false).map((roomss, index) => (
                      <option key={index} value={roomss.id}>
                        {roomss.number}
                      </option>
                    ))}
                  </select>
                  {errorMessages.RoomId ? (
                    <div className="error-messages">
                      <p className="error-message">{errorMessages.RoomId}</p>
                    </div>
                  ) : (
                    <div className="error-messages">
                      <p className="error-message">
                        {exception && exception.includes("Available")
                          ? exception
                          : ""}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="add-btn-addroom">
                <button type="submit">
                  Add <i className="fa-solid fa-check"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Index