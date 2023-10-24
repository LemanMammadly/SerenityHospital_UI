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
    </section>
  );
};

export default Index;
