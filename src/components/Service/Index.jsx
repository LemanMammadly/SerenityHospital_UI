// import React, { useEffect, useState } from "react";
// import "./Index.css";
// import axios from "axios";
// import AOS from 'aos';
// import 'aos/dist/aos.css';

// const Index = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     axios
//       .get("https://localhost:7227/api/Services")
//       .then((resp) => {
//         setData(resp.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   useEffect(() => {
//     AOS.init();
//   }, [])

//   const openText = () =>{

//   }

//   return (
//     <section>
//       <div className="container-service">
//         <div className="all-service">
//           <div className="service">
//             <h2>Our World Class Services</h2>
//           </div>
//           <div className="boxes col-lg-12 row">
//             {data.filter((datas) => datas.isDeleted === false).map((datas, index) => (
//               <div key={index} className="box col-lg-5" data-aos="flip-up">
//                 <h3 className="text-center">{datas.name}</h3>
//                 <p onClick={openText} className="text-center w-100">
//                  {datas.description.slice(0,200)}..
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Index;


import React, { useEffect, useState } from "react";
import "./Index.css";
import axios from "axios";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Index = () => {
  const [data, setData] = useState([]);
  const [expandedText, setExpandedText] = useState({});

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

  const toggleText = (id) => {
    setExpandedText((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

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
                <h3 className="text-center">{datas.name}</h3>
                <p className="text-center w-100">
                  {expandedText[datas.id] ? datas.description : `${datas.description.slice(0, 200)}...`}
                  <button style={{fontSize:"13px",color:"#333",backgroundColor:"transparent",border:"none",padding:"1px 5px",fontStyle:"italic",fontWeight:"bold"}} onClick={() => toggleText(datas.id)}>
                    {expandedText[datas.id] ? "Read less" : "Read more"}
                  </button>
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
