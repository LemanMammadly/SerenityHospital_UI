import React, { useEffect, useState } from "react";
import "./Index.css";
import axios from "axios";

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

  return (
    <section>
      <div className="container-contactPhone">
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
