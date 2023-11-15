import React, { useEffect, useState } from "react";
import "./Index.css";
import axios from "axios";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Index = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:7227/api/Services")
      .then((resp) => {
        setData(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <section>
      <div className="container-service">
        <div className="all-service">
          <div className="service">
            <h2>Our World Class Services</h2>
          </div>
          <div className="boxes col-lg-12 row">
            {data.filter((datas) => datas.isDeleted === false).map((datas, index) => (
              <div key={index} className="box col-lg-5" data-aos="flip-up">
                <h3>{datas.name}</h3>
                <p>
                 {datas.description.slice(0,200)}..
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Index;
