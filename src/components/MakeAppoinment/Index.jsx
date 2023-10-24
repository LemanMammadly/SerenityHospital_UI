import React from "react";
import "./Index.css";

const Index = () => {
  return (
    <section className="makeAppoinmetn-section">
      <h1>Make An Appoinment</h1>
      <hr />
      <div className="container-makeAppoinment">
        <div className="appoinment-form">
          <form action="">
            <form />
            <div class="form-group">
              <label for="" class="text-uppercase c-gray-light">
                Date{" "}
              </label>
              <div class="flatpickr-wrapper">
                <input
                  type="text"
                  class="form-control input-lg datepicker flatpickr-input"
                  placeholder="Select Date"
                  name="timestamp"
                  readonly="readonly"
                />
              </div>
            </div>

            <div class="form-group">
              <label for="" class="text-uppercase c-gray-light">
                Department{" "}
              </label>
              <select
                class="form-control"
                name="department_id"
                id="dept_select"
                onchange="get_doctors(this.value)"
              >
                <option value="0">Select A Department</option>
                <option value="1">Anesthetics </option>
                <option value="2">Cardiology </option>
                <option value="3">Gastroenterology </option>
              </select>
            </div>

            <div class="form-group">
              <label for="" class="text-uppercase c-gray-light">
                Doctor{" "}
              </label>
              <div id="doctor_list">
                <input
                  type="text"
                  class="form-control input-lg"
                  value="Select A Department First"
                  disabled=""
                />
              </div>
            </div>

            <div class="form-group">
              <label for="" class="text-uppercase c-gray-light">
                Message{" "}
              </label>
              <textarea
                class="form-control no-resize"
                rows="5"
                name="message"
                placeholder="Your Message To The Doctor"
              ></textarea>
            </div>

            <button
              type="submit"
              class="btn btn-styled btn-base-1 book-now"
              style={{ cursor: "pointer" }}
            >
              <i class="fa fa-calendar mr-1"></i> Book Now{" "}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Index;
