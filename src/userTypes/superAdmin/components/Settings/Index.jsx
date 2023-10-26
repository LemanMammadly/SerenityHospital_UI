import React, { useEffect, useState } from "react";
import "./Index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [data, setData] = useState([]);
  const [inputs, setInputs] = useState({});
  const [previewHeaderLogo, setPreviewHeaderLogo] = useState("");
  const [previewFooterLogo, setPreviewFooterLogo] = useState("");

  const nav = useNavigate();

  useEffect(() => {
    axios
      .get("https://localhost:7227/api/Settings")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  console.log(inputs);

  const handleSubmit = async (e, id) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("address", inputs.address);
    formData.append("phone", inputs.phone);
    formData.append("email", inputs.email);
    formData.append("headerLogoFile", inputs.headerLogoFile);
    formData.append("footerLogoFile", inputs.footerLogoFile);

    try {
      await axios
        .put(`https://localhost:7227/api/Settings/Put/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          nav("/superadmin");
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file" && files != null && files.length > 0) {
      const selectedFile = files[0];
      const preview = URL.createObjectURL(selectedFile);

      if (name === "headerLogoFile") {
        setPreviewHeaderLogo(preview);
      } else if (name === "footerLogoFile") {
        setPreviewFooterLogo(preview);
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
  };

  return (
    <section className="all-settings">
      <div className="setting-container">
        <div className="setting-top">
          <h1>System Settings</h1>
        </div>
        <div className="setting-bottom margin-auto w-100">
          <h4>General Settings</h4>
          {data.map((datas, index) => (
            <form key={index} onSubmit={(e) => handleSubmit(e, datas.id)}>
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
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                      type="email"
                      defaultValue={datas.email}
                      class="form-control"
                      name="email"
                      required=""
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="header-logo-img text-center">
                  <img
                    style={{ width: "150px" }}
                    src={previewHeaderLogo || datas.headerLogoUrl}
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
                      name="headerLogoFile"
                      required=""
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="header-logo-img text-center">
                  <img
                    style={{ width: "150px" }}
                    src={previewFooterLogo || datas.footerLogoUrl}
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
                      name="footerLogoFile"
                      required=""
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="update-btn">
                  <button type="submit">
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