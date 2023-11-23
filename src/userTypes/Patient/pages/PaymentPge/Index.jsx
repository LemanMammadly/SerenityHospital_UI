import React, { useEffect, useState } from "react";

const Index = () => {
  const [clientToken, setClientToken] = useState("");

  useEffect(() => {
    async function getClientToken() {
      try {
        const response = await fetch("https://localhost:7227/api/Braintree/GetClientToken");
        const token = await response.text();
        setClientToken(token);
      } catch (error) {
        console.error("Error fetching client token:", error);
      }
    }

    getClientToken();
  }, []);

  useEffect(() => {
    const form = document.querySelector("#payment-form");

    async function initializeBraintree() {
      try {
        const instance = await window.braintree.dropin.create({
          authorization: clientToken,
          container: "#bt-dropin",
        });

        form.addEventListener("submit", async function (event) {
          event.preventDefault();

          try {
            const payload = await instance.requestPaymentMethod();
            console.log(payload);

            document.querySelector("input[name='Nonce']").value = payload.nonce;
            form.submit();
          } catch (error) {
            console.error("Error processing payment:", error);
          }
        });
      } catch (error) {
        console.error("Error initializing Braintree:", error);
      }
    }

    initializeBraintree();
  }, [clientToken]);

  return (
    <div className="wrapper">
      <div className="checkout container">
        <form
          id="payment-form"
          method="post"
          action={`https://localhost:7227/api/Braintree/Create?amount=10`}
        >
          <div className="card">
            <div className="card-body">
              <h5 className="card-title" name="Title">
                Title
              </h5>
              <p className="card-text">Description</p>
              <p className="card-text">
                <small className="text-muted">Price: $10</small>
              </p>
            </div>
            <img
              style={{ width: "50%" }}
              className="card-img-bottom"
              src="#"
              alt=""
            />
          </div>
          <section>
            <div className="bt-drop-in-wrapper">
              <div id="bt-dropin"></div>
            </div>
          </section>
          <input type="hidden" name="Nonce" />
          <hr />
          <button className="btn btn-success" type="submit">
            <span>Confirm payment - $10</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Index;