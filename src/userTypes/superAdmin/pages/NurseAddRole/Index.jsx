import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Index = () => {
    const { username } = useParams();
    const [selectRole, setSelectRole] = useState("");
    const [role, setRole] = useState([]);
    const [errorMessages, setErrorMessages] = useState([]);
    const [exception, setException] = useState("");

    const user = JSON.parse(localStorage.getItem("user"));
  
    const nav = useNavigate();
  
    const handleChange = (e) => {
      const { name, value } = e.target;
  
      setErrorMessages((prev) => ({
        ...prev,
        [name]: null,
      }));
  
      if (name === "roleName") {
        setSelectRole(value);
      }
    };
  
    useEffect(() => {
      axios
        .get("https://localhost:7227/api/Roles", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((resp) => {
          setRole(resp.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const formData = new FormData();
      formData.append("userName", username);
      formData.append("roleName",selectRole)
  
      axios
        .post("https://localhost:7227/api/NurseAuths/AddRole", formData, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => nav("/superadmin/nurse"))
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
      <div className="all-addrole-create">
        <Link
          to="/superadmin/nurse"
          className="back-to-superadmin"
          style={{ textDecoration: "none", color: "#333" }}
        >
          <i
            className="fa-solid fa-chevron-left"
            style={{ marginRight: "10px" }}
          ></i>
          Super Admin / Nurse
        </Link>
        <div className="top-addrole-create">
          <h1>Add Role</h1>
        </div>
        <div className="bottom-addrole-create">
          <form method="POST" onSubmit={(e) => handleSubmit(e)}>
            <div className="panel-body d-flex flex-column gap-4">
              <div className="form-group d-flex align-items-center justify-content-center">
                <label htmlFor="roleName" className="col-sm-3 control-label">
                  Role Name
                </label>
                <div className="col-sm-5">
                  <select
                    id="roleName"
                    className="form-control"
                    onChange={handleChange}
                    name="roleName"
                    value={selectRole}
                  >
                    <option value="">Select Role: </option>
                    {role.map((roless, index) => (
                      <option key={index} value={roless.name}>
                        {roless.name}
                      </option>
                    ))}
                  </select>
                  {errorMessages.RoleName ? (
                    <div className="error-messages">
                      <p className="error-message">{errorMessages.RoleName}</p>
                    </div>
                  ) : (
                    <div className="error-messages">
                      <p className="error-message">
                        {exception && exception.includes("role")
                          ? exception
                          : ""}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="add-btn-addrole">
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