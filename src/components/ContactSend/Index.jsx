import React from "react";
import "./Index.css";

const Index = () => {
  return (
    <section>
        <div className="container-contactSend">
        <form>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group has-feedback">
              <label for="" class="text-uppercase c-gray-light">
                Your Name{" "}
              </label>
              <input
                type="text"
                name="name"
                class="form-control form-control-lg"
                required=""
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group has-feedback">
              <label for="" class="text-uppercase c-gray-light">
                Your Email{" "}
              </label>
              <input
                type="email"
                name="email"
                class="form-control form-control-lg"
                required=""
              />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <div class="form-group has-feedback">
              <label for="" class="text-uppercase c-gray-light">
                Phone{" "}
              </label>
              <input
                type="text"
                name="phone"
                class="form-control form-control-lg"
                required=""
              />
            </div>
          </div>
          <div class="col-sm-6">
            <div class="form-group has-feedback">
              <label for="" class="text-uppercase c-gray-light">
                Address{" "}
              </label>
              <input
                type="text"
                name="address"
                class="form-control form-control-lg"
                required=""
              />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="form-group has-feedback">
              <label for="" class="text-uppercase c-gray-light">
                Message{" "}
              </label>
              <textarea
                name="message"
                class="form-control no-resize"
                rows="5"
                required=""
              ></textarea>
            </div>
          </div>
        </div>

        <div class="row">
          <button
            type="submit"
            className="btn btn-styled btn-base-1 mt-4 sendBtn"
            style={{ cursor: "pointer;" }}
          >
            Send Message{" "}
          </button>
        </div>
      </form>
        </div>
        <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4059213.171903782!2d-1.5213623875000282!3d6.512145200000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8c384cb9c4ed%3A0xee72f80fb1993836!2sSerenity%20Hospital!5e0!3m2!1sen!2saz!4v1698250273277!5m2!1sen!2saz"
        width="100%"
        height="450"
        style={{border:"0"}}
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </section>
  );
};

export default Index;
