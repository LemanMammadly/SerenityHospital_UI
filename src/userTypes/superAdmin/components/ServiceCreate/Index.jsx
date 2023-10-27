import React, { useState } from "react";
import "./Index.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { DatePicker } from "antd";
import { error } from "jquery";

const Index = () => {
  const [inputs, setInputs] = useState({});
  const [errorMessages, setErrorMessages] = useState([]);
  const [exception, setException] = useState("");

  const handleChange = (name, value) => {
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrorMessages((prev) => ({
      ...prev,
      [name]: null,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataValue = {
      name: inputs.name,
      description: inputs.desc,
      serviceBeginning: inputs.servb,
      serviceEnding: inputs.serve,
      minPrice: inputs.minp,
      maxPrice: inputs.maxp,
    };

    axios
      .post("https://localhost:7227/api/Services", dataValue)
      .then((res) => console.log(res.data))
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
      <div className="all-service-create">
        <Link
          to="/superadmin/service"
          className="back-to-superadmin"
          style={{ textDecoration: "none", color: "#333" }}
        >
          <i
            className="fa-solid fa-chevron-left"
            style={{ marginRight: "10px" }}
          ></i>
          Super Admin / Service
        </Link>
        <div className="top-service-create">
          <h1>Add Service</h1>
        </div>
        <div className="bottom-service-create">
          <form method="POST" onSubmit={handleSubmit}>
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
                    onChange={(e) => handleChange("name", e.target.value)}
                    name="name"
                    required=""
                    placeholder="Name"
                  />
                  {errorMessages.Name ? (
                    <div className="error-messages">
                      <p className="error-message">{errorMessages.Name[0]}</p>
                    </div>
                  ) : (
                    <div className="error-messages">
                      <p className="error-message">{exception}</p>
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
                    onChange={(e) => handleChange("desc", e.target.value)}
                    className="form-control"
                    name="desc"
                    placeholder="Description"
                    required=""
                  />
                  {errorMessages.Description && (
                    <div className="error-messages">
                      <p className="error-message">
                        {errorMessages.Description[0]}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group d-flex align-items-center justify-content-center">
                <label className="col-sm-3 control-label">Service Begin</label>
                <div className="col-sm-5">
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    placeholder="Select Date and Time"
                    onChange={(value) => handleChange("servb", value)}
                  />
                  {errorMessages.ServiceBeginning && (
                    <div className="error-messages">
                      <p className="error-message">
                        {errorMessages.ServiceBeginning[0]}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group d-flex align-items-center justify-content-center">
                <label className="col-sm-3 control-label">Service End</label>
                <div className="col-sm-5">
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    placeholder="Select Date and Time"
                    onChange={(value) => handleChange("serve", value)}
                  />
                  {errorMessages.ServiceEnding && (
                    <div className="error-messages">
                      <p className="error-message">
                        {errorMessages.ServiceEnding[0]}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group d-flex align-items-center justify-content-center">
                <label htmlFor="minp" className="col-sm-3 control-label">
                  Minimum Price
                </label>
                <div className="col-sm-5">
                  <input
                    id="minp"
                    type="number"
                    defaultValue=""
                    onChange={(e) => handleChange("minp", e.target.value)}
                    className="form-control"
                    name="minp"
                    placeholder="Minimum Price"
                    required=""
                  />
                  {errorMessages.MinPrice && (
                    <div className="error-messages">
                      <p className="error-message">
                        {errorMessages.MinPrice[0]}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group d-flex align-items-center justify-content-center">
                <label htmlFor="maxp" className="col-sm-3 control-label">
                  Maximum Price
                </label>
                <div className="col-sm-5">
                  <input
                    id="maxp"
                    type="number"
                    defaultValue=""
                    onChange={(e) => handleChange("maxp", e.target.value)}
                    className="form-control"
                    name="maxp"
                    placeholder="Maximum Price"
                    required=""
                  />
                  {errorMessages.MaxPrice && (
                    <div className="error-messages">
                      <p className="error-message">
                        {errorMessages.MaxPrice[0]}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="add-btn-service">
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
