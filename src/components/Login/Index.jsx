import React from "react";
import "./Index.css";
import bgLogin from "../../assets/imgs/bg-login.jpeg";
import loginPage from "../../assets/imgs/loginPage.png"

const Index = () => {
  return (
    <section className="login-section">
      <div className="all-login col-lg-12">
        <div className="left-login col-lg-6">
          <img className="img-fluid" style={{width:"70px",margin:"30px 0"}} src={loginPage} alt="" />
          <h2>
            Serenity Hospital <br /> Management System
          </h2>
          <form action="">
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Login</button>
          </form>
          <p>Forgot Your Password?</p>
        </div>
        <div className="right-login col-lg-6">
          <div className="img-div"> <img className="img-fluid" style={{height:"100vh",objectFit:"cover"}} src={bgLogin} alt="" /></div>
        </div>
      </div>
    </section>
  );
};

export default Index;
