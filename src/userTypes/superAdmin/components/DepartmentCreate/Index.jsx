import React, { useEffect, useState } from "react";
import "./Index.css";
import { Link, useNavigate } from "react-router-dom";
import "select2";
import "select2/dist/css/select2.css";
import axios from "axios";

const Index = () => {
  const [service, setService] = useState([]);
  const [inputs, setInputs] = useState({
    name:"",
    description:"",
    iconFile:"",
    serviceId:""
  });
  const [selectedServices, setSelectedServices] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);
  const [exception, setException] = useState("");


  const nav = useNavigate();

  useEffect(() => {
    axios
      .get("https://localhost:7227/api/Services")
      .then((resp) => {
        setService(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file" && files != null && files.length > 0) {
      const selectedFile = files[0];

      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: selectedFile,
      }));
    } else if (type === "text") {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: value,
      }));
    }

    if (name === "serviceId") {
      setSelectedServices(parseInt(value, 10));
    }
  };

  console.log(inputs);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", inputs.name);
    formData.append("description", inputs.description);
    formData.append("iconFile", inputs.iconFile);
    formData.append("serviceId", selectedServices);

    axios
      .post("https://localhost:7227/api/Departments", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
    })
      .then((res) =>  nav("/superadmin"))
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
      <div className="all-department-create">
        <Link
          to="/superadmin/department"
          className="back-to-superadmin"
          style={{ textDecoration: "none", color: "#333" }}
        >
          <i
            className="fa-solid fa-chevron-left"
            style={{ marginRight: "10px" }}
          ></i>
          Super Admin / Department
        </Link>
        <div className="top-department-create">
          <h1>Add Department</h1>
        </div>
        <div className="bottom-department-create">
          <form method="POST" onSubmit={(e) => handleSubmit(e)}>
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
                    defaultValue=""
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
                      <p className="error-message">{exception.includes("name") ? exception : ""}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group d-flex align-items-center justify-content-center">
                <label htmlFor="desc" className="col-sm-3 control-label">
                  Description
                </label>
                <div className="col-sm-5">
                  <input
                    id="desc"
                    type="text"
                    defaultValue=""
                    onChange={handleChange}
                    className="form-control"
                    name="description"
                    placeholder="Description"
                    required=""
                  />
                  {errorMessages.Description ? (
                    <div className="error-messages">
                      <p className="error-message">
                        {errorMessages.Description}
                      </p>
                    </div>
                  ) : (
                    <div className="error-messages">
                      <p className="error-message">{exception.includes("description") ? exception : ""}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group d-flex align-items-center justify-content-center">
                <label htmlFor="icon" className="col-sm-3 control-label">
                  Icon
                </label>
                <div className="col-sm-5">
                  <input
                    id="icon"
                    type="file"
                    className="form-control"
                    name="iconFile"
                    placeholder="Icon"
                    onChange={handleChange}
                    required=""
                  />
                  {errorMessages.IconUrl ? (
                    <div className="error-messages">
                      <p className="error-message">
                        {errorMessages.IconUrl}
                      </p>
                    </div>
                  ) : (
                    <div className="error-messages">
                      <p className="error-message">{exception.includes("iconUrl") ? exception : ""}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group d-flex align-items-center justify-content-center">
                <label htmlFor="servId" className="col-sm-3 control-label">
                  Service
                </label>
                <div className="col-sm-5">
                  <select
                    id="servId"
                    className="form-control"
                    onChange={handleChange}
                    name="serviceId"
                    defaultValue={""}
                    required=""
                    value={selectedServices}
                  >
                    <option value="">Select Service: </option>
                    {service.map((services) => (
                      <option key={services.id} value={services.id}>
                        {services.id}
                      </option>
                    ))}
                  </select>
                  {errorMessages.ServiceId ? (
                    <div className="error-messages">
                      <p className="error-message">
                        {errorMessages.ServiceId}
                      </p>
                    </div>
                  ) : (
                    <div className="error-messages">
                      <p className="error-message">{exception.includes("serviceId") ? exception : ""}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="add-btn-department">
                <button type="submit">
                  Create <i className="fa-solid fa-check"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Index;
