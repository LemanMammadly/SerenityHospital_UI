import React, { useEffect, useState } from 'react'
import "./Index.css"
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

const Index = () => {
  const { id } = useParams();
  const [inputs, setInputs] = useState({});
  const [data, setData] = useState({});
  const [errorMessages, setErrorMessages] = useState([]);
  const [exception, setException] = useState("");

  const nav = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));


  useEffect(() => {
    axios
      .get(`https://localhost:7227/api/Positions/${id}`)
      .then((res) => {
        setData(res.data);
        setInputs(res.data)
      })
      .catch((err) => console.log(err));
  }, [id]);


  const handleChange = (e) => {
    const { name, value, type, } = e.target;

     if (type === "text" ) {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e, id) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", inputs.name);

    await axios
      .put(`https://localhost:7227/api/Positions/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => nav("/superadmin/position"))
      .catch((e) => {
        if (e.response && e.response.data && e.response.data.errors) {
          setErrorMessages(e.response.data.errors);
        } else {
          setException(e.response.data.message);
        }
      });
  };

  return (
    <section>
      <div className="all-position-update">
        <Link
          to="/superadmin/position"
          className="back-to-superadmin"
          style={{ textDecoration: "none", color: "#333" }}
        >
          <i
            className="fa-solid fa-chevron-left"
            style={{ marginRight: "10px" }}
          ></i>
          Super Admin / Positions
        </Link>
        <div className="top-position-update">
          <h1>Update Position</h1>
        </div>
        <div className="bottom-position-update">
          <form method="POST" onSubmit={(e) => handleSubmit(e, data.id)}>
            <div className="panel-body d-flex flex-column gap-4">
              <div className="form-group d-flex align-items-center justify-content-center">
                <label htmlFor="name" className="col-sm-3 control-label">
                  Name
                </label>
                <div className="col-sm-5">
                  <input
                    id="name"
                    type="text"
                    className="form-control"
                    defaultValue={data.name}
                    onChange={handleChange}
                    name="name"
                    required=""
                    placeholder="Name"
                  />
                  {errorMessages.Name ? (
                    <div className="error-messages">
                      <p className="error-message">{errorMessages.Name}</p>
                    </div>
                  ) : (
                    <div className="error-messages">
                      <p className="error-message">{exception && exception.includes("name") ? exception : ""}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="update-btn-position">
                <button type="submit">
                  Update <i className="fa-solid fa-check"></i>
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