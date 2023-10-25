import React, { useEffect, useState } from "react";
import "./Index.css";
import axios from "axios";

const Index = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:7227/api/Departments")
      .then((resp) => {
        setData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section className="department-section">
      <div className="container-departments">
        <div className="all-departments">
          <h3>Departments</h3>
          <div className="department-boxes">
            {data.map((datas,index) => (
              <div key={index} className="dep-box col-lg-3">
                <img
                  src={datas.iconUrl}
                  alt="departmenticon"
                />
                <p>{datas.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Index;
