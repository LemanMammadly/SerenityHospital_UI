import React, { useEffect } from "react";
import "./Index.css";
import imageWelcome from "../../assets/imgs/cursive-slider-img.webp";
import AOS from "aos";
import "aos/dist/aos.css";

const Index = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section>
      <div className="container-welcome py-5">
        <div className="all-welcome">
          <div className="left col-lg-6" data-aos="fade-right">
            <div className="img-div">
              <img src={imageWelcome} alt="" />
            </div>
          </div>
          <div className="right" data-aos="fade-left">
            <h3>Welcome To Serenity Diagnostic Center</h3>
            <p>
              Healthy living is the main factor of everyone. We strive to
              restore health to everyone who benefits from the medical services
              provided by our professional staff. Our clinic was established to
              bring health care according to world health standards to our
              country. Our main mission is to organize a high-level medical
              service that fully complies with international standards.We strive to
              restore health to everyone who benefits from the medical services
              provided by our professional staff.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Index;
