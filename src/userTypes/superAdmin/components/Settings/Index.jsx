import React, { useEffect, useState } from "react";
import "./Index.css";
import axios from "axios";

const Index = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:7227/api/Settings")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="all-settings">
      <div className="setting-container">
        <div className="setting-top">
          <h1>System Settings</h1>
        </div>
        <div className="setting-bottom margin-auto w-100">
          <h4>General Settings</h4>
          {data.map((datas, index) => (
            <form action="">
              <div class="panel-body d-flex flex-column gap-4">
              <div class="form-group d-flex align-items-center justify-content-center">
                <label htmlFor="address" class="col-sm-3 control-label">
                  System Address
                </label>
                <div class="col-sm-5">
                  <input
                    id="address"
                    type="text"
                    class="form-control"
                    defaultValue={datas.address}
                    name="address"
                    required=""
                  />
                </div>
              </div>
              <div class="form-group d-flex align-items-center justify-content-center">
                <label htmlFor="phone" class="col-sm-3 control-label">
                  System Phone
                </label>
                <div class="col-sm-5">
                  <input
                    id="phone"
                    type="tel"
                    defaultValue={datas.phone}
                    class="form-control"
                    name="phone"
                    required=""
                  />
                </div>
              </div>
              <div class="form-group d-flex align-items-center justify-content-center">
                <label htmlFor="email" class="col-sm-3 control-label">
                  System Email
                </label>
                <div class="col-sm-5">
                  <input
                    id="email"
                    type="phone"
                    defaultValue={datas.email}
                    class="form-control"
                    name="email"
                    required=""
                  />
                </div>
              </div>
              <div className="header-logo-img text-center">
                <img
                  style={{ width: "150px" }}
                  src={datas.headerLogoUrl}
                  alt=""
                />
              </div>
              <div class="form-group d-flex align-items-center justify-content-center">
                <label htmlFor="logoheader" class="col-sm-3 control-label">
                  System Header Logo
                </label>
                <div class="col-sm-5">
                  <input
                    id="logoheader"
                    type="file"
                    class="form-control"
                    name="headerlogo"
                    required=""
                  />
                </div>
              </div>
              <div className="header-logo-img text-center">
                <img
                  style={{ width: "150px" }}
                  src={datas.headerLogoUrl}
                  alt=""
                />
              </div>
              <div class="form-group d-flex align-items-center justify-content-center">
                <label htmlFor="logofooter" class="col-sm-3 control-label">
                  System Footer Logo
                </label>
                <div class="col-sm-5">
                  <input
                    id="logofooter"
                    type="file"
                    class="form-control"
                    name="footerlogo"
                    required=""
                  />
                </div>
              </div>
              <div className="update-btn">
                <button>
                  Update <i class="fa-solid fa-check"></i>
                </button>
              </div>
            </div>
            </form>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Index;
