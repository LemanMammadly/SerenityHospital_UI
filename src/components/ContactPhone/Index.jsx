import React, { useEffect, useState } from "react";
import "./Index.css";
import axios from "axios";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Index = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:7227/api/Settings")
      .then((resp) => {
        setData(resp.data);
      })
      .catch((error) => {
        console.log("error");
      });
  }, []);

  useEffect(() => {
    AOS.init();
  }, [])


  return (
    <section>
      <div className="container-contactPhone" data-aos="zoom-in-up">
        <h4>Contact Us For Help</h4>
        <p>
          Please Call Us Or Complete The Form Below And We Will Get To You
          Shortly
        </p>
        {data.map((datas, index) => (
          <button key={index}>
            <i class="fa-solid fa-mobile-screen"></i>
            {datas.phone}
          </button>
        ))}
      </div>
      <hr />
    </section>
  );
};

export default Index;
