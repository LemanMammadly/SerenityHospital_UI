import React, { useEffect, useState } from "react";
import "./Index.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import $ from "jquery";

const Index = () => {
  const { id } = useParams();
  const [inputs, setInputs] = useState({});
  const [prevImageUrl, setPrevImageUrl] = useState("");
  const [data, setData] = useState({});
  const [errorMessages, setErrorMessages] = useState([]);
  const [exception, setException] = useState("");
  const [selectType, setSelectType] = useState("");
  const [selectCapacity, setSelectCapacity] = useState("");
  const [departmentsall, setDepartmentsall] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState("");
  const [patientsAll, setPatientsAll] = useState([]);
  const [selectPatients, setSelectPatients] = useState([]);

  $(".js-example-basic-single").select2();

  const nav = useNavigate();

  useEffect(() => {
    axios
      .get(`https://localhost:7227/api/Departments/`)
      .then((res) => {
        setDepartmentsall(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`https://localhost:7227/api/PatientRooms/${id}`)
      .then((res) => {
        setData(res.data);
        setInputs(res.data);
        setSelectCapacity(res.data.capacity);
        setSelectPatients(
          res.data.patients && res.data.patients.map((pat) => pat.id)
        );
        setSelectType(res.data.type);
        setSelectedDepartments(res.data.departmentId);
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    axios
      .get(`https://localhost:7227/api/PatientAuths/`)
      .then((res) => {
        setPatientsAll(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files, options } = e.target;

    if (type === "file" && files != null && files.length > 0) {
      const selectedFile = files[0];
      const preview = URL.createObjectURL(selectedFile);

      if (name === "imageFile") {
        setPrevImageUrl(preview);
      }
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: selectedFile,
      }));
    } else if (
      type === "text" ||
      type === "tel" ||
      type === "email" ||
      type === "number"
    ) {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: value,
      }));
    }

    if (name === "departmentId") {
      setSelectedDepartments(parseInt(value, 10));
    }

    if (name === "capacity") {
      setSelectCapacity(parseInt(value, 10));
    }

    if (name === "type") {
      setSelectType(parseInt(value, 10));
    }

    if (name === "patientids") {
      const selectedPatient = Array.from(options)
        .filter((option) => option.selected && option.value !== "")
        .map((option) => option.value.toString());
      setSelectPatients(selectedPatient);
    }

  };

  const handleSubmit = async (e, id) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("number", inputs.number);
    formData.append("price", inputs.price);
    formData.append("imageFile", inputs.imageFile);
    formData.append("capacity", selectCapacity);
    formData.append("type", selectType);
    formData.append("departmentId", selectedDepartments);
    selectPatients.forEach((pat) => {
      formData.append("patientids", pat);
    });

    await axios
      .put(`https://localhost:7227/api/PatientRooms/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => nav("/superadmin/patientrooms"))
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
          to="/superadmin/patientrooms"
          className="back-to-superadmin"
          style={{ textDecoration: "none", color: "#333" }}
        >
          <i
            className="fa-solid fa-chevron-left"
            style={{ marginRight: "10px" }}
          ></i>
          Super Admin / Patient Rooms
        </Link>
        <div className="top-position-update">
          <h1>Update Room</h1>
        </div>
        <div className="bottom-position-update">
          <form method="POST" onSubmit={(e) => handleSubmit(e, data.id)}>
            <div className="panel-body d-flex flex-column gap-4">
              <div className="form-group d-flex align-items-center justify-content-center">
                <label htmlFor="number" className="col-sm-3 control-label">
                  Number
                </label>
                <div className="col-sm-5">
                  <input
                    id="number"
                    type="number"
                    className="form-control"
                    defaultValue={data.number}
                    onChange={handleChange}
                    name="number"
                    required=""
                    placeholder="Number"
                  />
                  {errorMessages.Number ? (
                    <div className="error-messages">
                      <p className="error-message">{errorMessages.Number}</p>
                    </div>
                  ) : (
                    <div className="error-messages">
                      <p className="error-message">
                        {exception.includes("Number") ? exception : ""}
                      </p>
                    </div>
                  )}
                </div>
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
                    name="departmentId"
                    value={selectedDepartments}
                  >
                    <option value="">Select Department: </option>
                    {departmentsall
                      .filter((data) => data.isDeleted === false)
                      .map((deps) => (
                        <option key={deps.id} value={deps.id}>
                          {deps.name}
                        </option>
                      ))}
                  </select>
                  {errorMessages.DepartmentId ? (
                    <div className="error-messages">
                      <p className="error-message">
                        {errorMessages.DepartmentId}
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
              <div className="form-group d-flex align-items-center justify-content-center">
                <label htmlFor="type" className="col-sm-3 control-label">
                  Type
                </label>
                <div className="col-sm-5">
                  <select
                    id="type"
                    className="form-control"
                    onChange={handleChange}
                    name="type"
                    value={selectType}
                  >
                    <option value="">Select Type: </option>
                    <option value={1}>Single</option>
                    <option value={2}>Double</option>
                    <option value={3}>Multibed</option>
                  </select>
                  {errorMessages.Type ? (
                    <div className="error-messages">
                      <p className="error-message">{errorMessages.Type}</p>
                    </div>
                  ) : (
                    <div className="error-messages">
                      <p className="error-message">
                        {exception.includes("type") ? exception : ""}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group d-flex align-items-center justify-content-center">
                <label htmlFor="capacity" className="col-sm-3 control-label">
                  Capacity
                </label>
                <div className="col-sm-5">
                  <select
                    id="capacity"
                    className="form-control"
                    onChange={handleChange}
                    name="capacity"
                    value={selectCapacity}
                  >
                    <option value="">Select Capacity: </option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                  </select>
                  {errorMessages.Capacity ? (
                    <div className="error-messages">
                      <p className="error-message">{errorMessages.Capacity}</p>
                    </div>
                  ) : (
                    <div className="error-messages">
                      <p className="error-message">
                        {exception.includes("capacity") ? exception : ""}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group d-flex align-items-center justify-content-center">
                <label htmlFor="price" className="col-sm-3 control-label">
                  Price
                </label>
                <div className="col-sm-5">
                  <input
                    id="price"
                    type="price"
                    className="form-control"
                    defaultValue={data.number}
                    onChange={handleChange}
                    name="price"
                    required=""
                    placeholder="Price"
                  />
                  {errorMessages.Price ? (
                    <div className="error-messages">
                      <p className="error-message">{errorMessages.Price}</p>
                    </div>
                  ) : (
                    <div className="error-messages">
                      <p className="error-message">
                        {exception.includes("price") ? exception : ""}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="image-url text-center">
                <img
                  style={{ width: "150px" }}
                  src={prevImageUrl || data.imageUrl}
                  alt=""
                />
              </div>
              <div className="form-group d-flex align-items-center justify-content-center">
                <label htmlFor="imageFile" className="col-sm-3 control-label">
                  Image
                </label>
                <div className="col-sm-5">
                  <input
                    id="imageFile"
                    type="file"
                    className="form-control"
                    name="imageFile"
                    placeholder="imageFile"
                    onChange={handleChange}
                    required=""
                  />
                  {errorMessages.ImageFile ? (
                    <div className="error-messages">
                      <p className="error-message">{errorMessages.ImageFile}</p>
                    </div>
                  ) : (
                    <div className="error-messages">
                      <p className="error-message">
                        {exception && exception.includes("image")
                          ? exception
                          : ""}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="w-50 m-auto">
                Patients:
                {data.patients && data.patients.length > 0 ? (
                  <div>
                    {data.patients.map((patient) => (
                      <div
                        key={patient.id}
                        className="department-span mx-5 my-2"
                        style={{
                          backgroundColor: "#E2E6EA",
                          color: "#333",
                          padding: "10px",
                          borderRadius: "10px",
                        }}
                      >
                        {patient.name} {patient.surname}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>No Patients</div>
                )}
              </div>
              <div className="form-group d-flex align-items-center justify-content-center">
                <label htmlFor="patientids" className="col-sm-3 control-label">
                  Patiens
                </label>
                <div className="col-sm-5">
                  <select
                    id="patientids"
                    className="form-control"
                    onChange={handleChange}
                    name="patientids"
                    multiple={true}
                    required=""
                    value={selectPatients}
                  >
                    <option value="">Select Patients: </option>
                    {patientsAll.map((pat) => (
                      <option key={pat.id} value={pat.id}>
                        {pat.name} {pat.surname} - {pat.phoneNumber}
                      </option>
                    ))}
                  </select>
                  {errorMessages.Patientids ? (
                    <div className="error-messages">
                      <p className="error-message">
                        {errorMessages.Patientids}
                      </p>
                    </div>
                  ) : (
                    <div className="error-messages">
                      <p className="error-message">
                        {exception.includes("Other") ? exception : ""}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="update-btn-position d-flex flex-column">
              {errorMessages.Patientids ? (
                    <div className="error-messages">
                      <p className="error-message">
                        {errorMessages.Patientids}
                      </p>
                    </div>
                  ) : (
                    <div className="error-messages">
                      <p className="error-message">
                        {exception.includes("Capacity") ? exception : ""}
                      </p>
                    </div>
                  )}
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
