import React, { useEffect, useState } from "react";
import "./Index.css";
import { DatePicker } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import "select2";
import "select2/dist/css/select2.css";
import axios from "axios";
import $ from "jquery";

const Index = () => {
  const { id } = useParams();
  const [inputs, setInputs] = useState({});
  const [data, setData] = useState({});
  const [departmentsall, setDepartmentsall] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);
  const [exception, setException] = useState("");

  const nav = useNavigate();

  $(".js-example-basic-single").select2();

  useEffect(() => {
    axios
      .get(`https://localhost:7227/api/Services/${id}`)
      .then((res) => {
        setData(res.data);
        setInputs(res.data);
        setSelectedDepartments(res.data.departments || []);
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    axios
      .get(`https://localhost:7227/api/Departments/`)
      .then((res) => setDepartmentsall(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, options } = e.target;
    const newValue = type === "checkbox" ? e.target.checked : value;
  
    setInputs((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  
    setErrorMessages((prev) => ({
      ...prev,
      [name]: null,
    }));
  
    if (name === "departmentIds") {
      const selectedDepartments = Array.from(options)
        .filter((option) => option.selected && option.value !== "")
        .map((option) => Number(option.value));
  
      setSelectedDepartments(selectedDepartments);
    }
  };
  
  const handleSubmit = async (e, id) => {
    e.preventDefault();
  
    const filteredDepartmentIds = selectedDepartments.filter((id) => id != null);
  
    const dataValue = {
      name: inputs.name,
      description: inputs.description,
      serviceBeginning: inputs.serviceBeginning,
      serviceEnding: inputs.serviceEnding,
      minPrice: inputs.minPrice,
      maxPrice: inputs.maxPrice,
      departmentIds: filteredDepartmentIds,
    };
  
    await axios
      .put(`https://localhost:7227/api/Services/Put/${id}`, dataValue, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => nav("/superadmin"))
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
      <div className="all-service-update">
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
        <div className="top-service-update">
          <h1>Update Service</h1>
        </div>
        <div className="bottom-service-update">
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
                      <p className="error-message">
                        {errorMessages.Name}
                      </p>
                    </div>
                  ) : (
                    <div className="error-messages">
                      <p className="error-message">
                        {exception.includes("name") ? exception : ""}
                      </p>
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
                      <p className="error-message">
                        {exception.includes("description") ? exception : ""}
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
                    name="serviceBeginning"
                    format="YYYY-MM-DD HH:mm:ss"
                    placeholder="Select Date and Time"
                    defaultValue={data.serviceBeginning}
                    onChange={(date, dateString) =>
                      handleChange({
                        target: { name: "serviceBeginning", value: dateString },
                      })
                    }
                  />
                  {errorMessages.ServiceBeginning ? (
                    <div className="error-messages">
                      <p className="error-message">
                        {errorMessages.ServiceBeginning}
                      </p>
                    </div>
                  ) : (
                    <div className="error-messages">
                      <p className="error-message">
                        {exception.includes("servicebegin") ? exception : ""}
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
                    name="serviceEnding"
                    format="YYYY-MM-DD HH:mm:ss"
                    placeholder="Select Date and Time"
                    defaultValue={data.serviceEnding}
                    onChange={(date, dateString) =>
                      handleChange({
                        target: { name: "serviceEnding", value: dateString },
                      })
                    }
                  />
                   {errorMessages.ServiceEnding ? (
                    <div className="error-messages">
                      <p className="error-message">
                        {errorMessages.ServiceEnding}
                      </p>
                    </div>
                  ) : (
                    <div className="error-messages">
                      <p className="error-message">
                        {exception.includes("serviceend") ? exception : ""}
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
                    defaultValue={data.minPrice}
                    onChange={handleChange}
                    className="form-control"
                    name="minPrice"
                    placeholder="Minimum Price"
                    required=""
                  />
                   {errorMessages.MinPrice ? (
                    <div className="error-messages">
                      <p className="error-message">
                        {errorMessages.MinPrice}
                      </p>
                    </div>
                  ) : (
                    <div className="error-messages">
                      <p className="error-message">
                        {exception.includes("minprice") ? exception : ""}
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
                    defaultValue={data.maxPrice}
                    onChange={handleChange}
                    className="form-control"
                    name="maxPrice"
                    placeholder="Maximum Price"
                    required=""
                  />
                   {errorMessages.MaxPrice ? (
                    <div className="error-messages">
                      <p className="error-message">
                        {errorMessages.MaxPrice}
                      </p>
                    </div>
                  ) : (
                    <div className="error-messages">
                      <p className="error-message">
                        {exception.includes("maxprice") ? exception : ""}
                      </p>
                    </div>
                  )}
                </div>
              </div>
                <div className="w-50 m-auto">
                  Departments:
                  {data.departments && data.departments.length > 0 ? (
                    <div>
                      {data.departments.map((department) => (
                        <div
                          key={department.id}
                          className="department-span mx-5 my-2"
                          style={{
                            backgroundColor: "#E2E6EA",
                            color: "#333",
                            padding: "10px",
                            borderRadius: "10px",
                          }}
                        >
                          {department.name}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>No Departments</div>
                  )}
                </div>
              <div className="form-group d-flex align-items-center justify-content-center">
                <label htmlFor="depId" className="col-sm-3 control-label">
                  Departments
                </label>
                <div className="col-sm-5">
                  <select
                    id="depId"
                    className="form-control"
                    onChange={handleChange}
                    name="departmentIds"
                    multiple={true}
                    required=""
                    value={selectedDepartments}
                  >
                    <option value="">Select Departments: </option>
                    {departmentsall
                      .filter((data) => data.isDeleted === false)
                      .map((deps) => (
                        <option key={deps.id} value={deps.id}>
                          {deps.name}
                        </option>
                      ))}
                  </select>
                  {errorMessages.DepartmentIds ? (
                    <div className="error-messages">
                      <p className="error-message">
                        {errorMessages.DepartmentIds}
                      </p>
                    </div>
                  ) : (
                    <div className="error-messages">
                      <p className="error-message">
                        {exception.includes("Department") ? exception : ""}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="update-btn-service">
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
