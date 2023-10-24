import React from "react";
import "./Index.css";
import imageWelcome from "../../assets/imgs/welcomePage.png";

const Index = () => {
  return (
    <section>
      <div className="container-welcome">
       <div className="all-welcome">
       <div className="left col-lg-6">
          <div className="img-div">
            <img src={imageWelcome} alt="" />
          </div>
        </div>
        <div className="right">
          <h3>Welcome To Serenity Diagnostic Center</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris quisque
            adipiscing lobortis aptent cras et justo. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris quisque adipiscing lobortis aptent cras
            et justo.
          </p>
        </div>
       </div>
      </div>
    </section>
  );
};

export default Index;
