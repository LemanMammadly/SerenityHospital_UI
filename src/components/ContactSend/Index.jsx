import React, {useEffect, useState} from "react";
import "./Index.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import AOS from 'aos';
import 'aos/dist/aos.css';


const Index = () => {
  const [inputs, setInputs] = useState({});
  const [errorMessages, setErrorMessages] = useState([]);
  const [exception, setException] = useState("");


  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setErrorMessages((prev) => ({
      ...prev,
      [name]: null,
    }));
  
    if (
      type === "text" ||
      type === "tel" ||
      type === "email"
    ) {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: value,
      }));

    } else if (type === "textarea") {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: value,
      }));
    }
  };
  
  useEffect(() => {
    setErrorMessages({});
  }, [inputs]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", inputs.name);
    formData.append("email", inputs.email);
    formData.append("phone", inputs.phone);
    formData.append("address", inputs.address);
    formData.append("message", inputs.message);

    axios
      .post("https://localhost:7227/api/Contacts", formData)
      .then((res) => {
        if (res.status === 204) {
          setInputs({
            name: "",
            email: "",
            phone: "",
            address: "",
            message: "",
          });
          document.querySelector("#name").value="";
          document.querySelector("#email").value="";
          document.querySelector("#phone").value="";
          document.querySelector("#address").value="";
          document.querySelector("#message").value="";
          toast.success("Message sent successfully!");
        }
      })
      .catch((e) => {
        toast.error("Message could not be sent!")
        if (e.response && e.response.data && e.response.data.errors) {
          setErrorMessages(e.response.data.errors);
        } else {
          setException(e.response && e.response.data && e.response.data.message);
        }
      });
  };

  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <section>
      <div className="container-contactSend"  data-aos="zoom-in-up">
        <form method="POST" onSubmit={(e) => handleSubmit(e)}>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group has-feedback">
                <label htmlFor="name" class="text-uppercase c-gray-light">
                  Your Name{" "}
                </label>
                <input
                  type="text"
                  name="name"
                  class="form-control form-control-lg"
                  required=""
                  id="name"
                  defaultValue=""
                  onChange={handleChange}
                />
                {errorMessages.Name ? (
                  <div className="error-messages">
                    <p className="error-message">{errorMessages.Name}</p>
                  </div>
                ) : (
                  <div className="error-messages">
                    <p className="error-message">
                      {exception && exception.includes("name") ? exception : ""}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group has-feedback">
                <label htmlFor="email" class="text-uppercase c-gray-light">
                  Your Email{" "}
                </label>
                <input
                  type="email"
                  name="email"
                  class="form-control form-control-lg"
                  required=""
                  id="email"
                  defaultValue=""
                  onChange={handleChange}
                />
                {errorMessages.Email ? (
                  <div className="error-messages">
                    <p className="error-message">{errorMessages.Email}</p>
                  </div>
                ) : (
                  <div className="error-messages">
                    <p className="error-message">
                      {exception && exception.includes("email")
                        ? exception
                        : ""}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <div class="form-group has-feedback">
                <label
                  htmlFor="phone"
                  class="text-uppercase c-gray-light"
                >
                  Phone{" "}
                </label>
                <input
                  type="tel"
                  name="phone"
                  class="form-control form-control-lg"
                  required=""
                  id="phone"
                  defaultValue=""
                  onChange={handleChange}
                />
                {errorMessages.Phone ? (
                  <div className="error-messages">
                    <p className="error-message">{errorMessages.Phone}</p>
                  </div>
                ) : (
                  <div className="error-messages">
                    <p className="error-message">
                      {exception && exception.includes("phone")
                        ? exception
                        : ""}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div class="col-sm-6">
              <div class="form-group has-feedback">
                <label htmlFor="address" class="text-uppercase c-gray-light">
                  Address{" "}
                </label>
                <input
                  type="text"
                  name="address"
                  class="form-control form-control-lg"
                  required=""
                  id="address"
                  defaultValue=""
                  onChange={handleChange}
                />
                {errorMessages.Address ? (
                  <div className="error-messages">
                    <p className="error-message">{errorMessages.Address}</p>
                  </div>
                ) : (
                  <div className="error-messages">
                    <p className="error-message">
                      {exception && exception.includes("address")
                        ? exception
                        : ""}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12">
              <div class="form-group has-feedback">
                <label htmlFor="message" class="text-uppercase c-gray-light">
                  Message{" "}
                </label>
                <textarea
                  name="message"
                  class="form-control no-resize"
                  rows="5"
                  required=""
                  id="message"
                  type="text"
                  defaultValue=""
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
          </div>
          <div class="row">
            {errorMessages.Message ? (
              <div className="error-messages">
                <p className="error-message">{errorMessages.Message}</p>
              </div>
            ) : (
              <div className="error-messages">
                <p className="error-message">
                  {exception && exception.includes("null") ? exception : ""}
                </p>
              </div>
            )}
            <button
              type="submit"
              className="btn btn-styled btn-base-1 mt-4 sendBtn"
              style={{ cursor: "pointer" }}
            >
              Send Message{" "}
            </button>
          </div>
        </form>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4059213.171903782!2d-1.5213623875000282!3d6.512145200000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8c384cb9c4ed%3A0xee72f80fb1993836!2sSerenity%20Hospital!5e0!3m2!1sen!2saz!4v1698250273277!5m2!1sen!2saz"
        width="100%"
        height="450"
        style={{ border: "0" }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </section>
  );
};

export default Index;
