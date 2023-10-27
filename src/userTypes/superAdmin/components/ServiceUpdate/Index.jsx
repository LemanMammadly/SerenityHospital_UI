import React, { useEffect, useState } from "react";
import "./Index.css";
import { DatePicker } from "antd";
import { Link, useParams } from "react-router-dom";
import "select2";
import "select2/dist/css/select2.css";
import axios from "axios";

const Index = () => {
  const { id } = useParams();
  const [inputs, setInputs] = useState({});
  const [data, setData] = useState({});
  const [departmentsall, setDepartmentsall] = useState([]);

  useEffect(() => {
    axios
      .get(`https://localhost:7227/api/Services/${id}`)
      .then((res) =>{
        setData(res.data)
        setInputs(res.data)
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
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? e.target.checked : value;
  
    setInputs((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };
  
  

  const handleSubmit = async (e, id) => {
    e.preventDefault();

    const dataValue = {
      name: inputs.name,
      description: inputs.desc,
      serviceBeginning: inputs.serviceBegin,
      serviceEnding: inputs.serviceEnd,
      minPrice: inputs.minp,
      maxPrice: inputs.maxp,
      departments: inputs.depIds,
    };

    console.log(inputs);
    console.log(dataValue);

    await
    axios
      .put(`https://localhost:7227/api/Services/Put/${id}`, dataValue, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => console.log(res.data))
      .catch((e) => {
        console.log(e);
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
                    name="desc"
                    placeholder="Description"
                    required=""
                  />
                </div>
              </div>
              <div className="form-group d-flex align-items-center justify-content-center">
                <label className="col-sm-3 control-label">Service Begin</label>
                <div className="col-sm-5">
                  <DatePicker
                    showTime
                    name="serviceBegin"
                    format="YYYY-MM-DD HH:mm:ss"
                    placeholder="Select Date and Time"
                    defaultValue={data.serviceBeginning}
                    onChange={(date, dateString) => handleChange({ target: { name: 'serviceBegin', value: dateString } })}
                  />
                </div>
              </div>
              <div className="form-group d-flex align-items-center justify-content-center">
                <label className="col-sm-3 control-label">Service End</label>
                <div className="col-sm-5">
                  <DatePicker
                    showTime
                    name="serviceEnd"
                    format="YYYY-MM-DD HH:mm:ss"
                    placeholder="Select Date and Time"
                    defaultValue={data.serviceEnding}
                    onChange={(date, dateString) => handleChange({ target: { name: 'serviceEnd', value: dateString } })}
                  />
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
                    name="minp"
                    placeholder="Minimum Price"
                    required=""
                  />
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
                    name="maxp"
                    placeholder="Maximum Price"
                    required=""
                  />
                </div>
              </div>
              <div className="form-group d-flex align-items-center justify-content-center">
                <label htmlFor="depIds" className="col-sm-3 control-label">
                  Departments
                </label>
                <div className="col-sm-5">
                  <div>
                    Your Departments:
                    {data.departments && data.departments.length > 0 ? (
                      <div>
                        {data.departments.map((department) => (
                          <div
                            key={department.id}
                            className="department-span mx-3"
                          >
                            {department.name}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div>No departments selected</div>
                    )}
                  </div>
                  <select
                    id="depIds"
                    className="form-control"
                    multiple
                    name="depIds"
                    required=""
                    value={data.selectedDepartmentId}
                  >
                    {departmentsall.map((department) => (
                      <option key={department.id} value={department.id}>
                        {department.name}
                      </option>
                    ))}
                  </select>
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
