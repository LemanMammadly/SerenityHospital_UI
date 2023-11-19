import React, { useEffect, useState } from "react";
import "./Index.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import $ from "jquery";
import axios from "axios";

const Index = () => {
  const { id } = useParams();
  const [inputs, setInputs] = useState({});
  const [data, setData] = useState({});
  const [previewIcon, setPreviewIcon] = useState("");
  const [service, setService] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);
  const [exception, setException] = useState("");

  const nav = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  $(".js-example-basic-single").select2();

  useEffect(() => {
    axios
      .get(`https://localhost:7227/api/Departments/${id}`)
      .then((res) => {
        setData(res.data);
        setInputs(res.data)
        setSelectedService(res.data.serviceId || []);
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    axios
      .get(`https://localhost:7227/api/Services`)
      .then((res) => setService(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file" && files != null && files.length > 0) {
      const selectedFile = files[0];
      const preview = URL.createObjectURL(selectedFile);

      if (name === "iconFile") {
        setPreviewIcon(preview);
      }
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: selectedFile,
      }));
    } else if (type === "text" || type === "tel" || type === "email") {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: value,
      }));
    }

    if (name === "serviceId") {
      setSelectedService(value);
    }

    setErrorMessages((prev) => ({
      ...prev,
      [name]: null,
    }));
  
    setException("");
  };

  const handleSubmit = async (e, id) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", inputs.name);
    formData.append("description", inputs.description);
    formData.append("iconFile", inputs.iconFile);
    formData.append("serviceId", selectedService);

    await axios
      .put(`https://localhost:7227/api/Departments/Put/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => nav("/superadmin/department"))
      .catch((e) => {
        if (e.response && e.response.data && e.response.data.errors) {
          setErrorMessages(e.response.data.errors);
        } else {
          setException(e.response.data.message);
        }
      });
  };

  useEffect(() => {
    setErrorMessages({});
  }, [inputs]);

  return (
    <section>
      <div className="all-department-update">
        <Link
          to="/superadmin/department"
          className="back-to-superadmin"
          style={{ textDecoration: "none", color: "#333" }}
        >
          <i
            className="fa-solid fa-chevron-left"
            style={{ marginRight: "10px" }}
          ></i>
          Super Admin / Departments
        </Link>
        <div className="top-department-update">
          <h1>Update Department</h1>
        </div>
        <div className="bottom-department-update">
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
              <div className="form-group d-flex align-items-center justify-content-center">
                <label htmlFor="desc" className="col-sm-3 control-label">
                  Description
                </label>
                <div className="col-sm-5">
                  <input
                    id="desc"
                    type="text"
                    defaultValue={data.description}
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
                   <p className="error-message">{exception &&  exception.includes("description") ? exception : ""}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="icon-url text-center">
                <img
                  style={{ width: "150px" }}
                  src={previewIcon || data.iconUrl}
                  alt=""
                />
              </div>
              <div class="form-group d-flex align-items-center justify-content-center">
                <label htmlFor="iconUrl" class="col-sm-3 control-label">
                  Icon
                </label>
                <div class="col-sm-5">
                  <input
                    id="iconUrl"
                    type="file"
                    class="form-control"
                    name="iconFile"
                    required=""
                    onChange={handleChange}
                  />
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
                    required=""
                    value={selectedService}
                  >
                    <option value="">Select Service: </option>
                    {service.filter((data)=>data.isDeleted===false).map((services) => (
                      <option key={services.id} value={services.id}>
                        {services.name}
                      </option>
                    ))}
                  </select>
                  {errorMessages.ServiceId ? (
                    <div className="error-messages">
                      <p className="error-message">{errorMessages.ServiceId}</p>
                    </div>
                  ) : (
                    <div className="error-messages">
                      <p className="error-message">
                        {exception &&  exception.includes("serviceId") ? exception : ""}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="update-btn-department">
                <button type="submit">
                  Update <i className="fa-solid fa-check"></i>
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
