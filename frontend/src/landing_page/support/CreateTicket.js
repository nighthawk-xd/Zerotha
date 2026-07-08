import React from "react";

function CreateTicket() {
  return (
    <div className="container mt-5 mb-5">
      <h2 className="mb-4">To create a ticket, select a relevant topic</h2>

      <div className="accordion" id="supportAccordion">

        {/* Account Opening */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#accountOpening"
            >
              <i className="fa fa-plus-circle me-3 text-primary"></i>
              Account Opening
            </button>
          </h2>

          <div
            id="accountOpening"
            className="accordion-collapse collapse show"
            data-bs-parent="#supportAccordion"
          >
            <div className="accordion-body">

              <ul>
                <li><button type="button" className="btn btn-link p-0 text-decoration-none text-start">Resident individual</button></li>
                <li><button type="button" className="btn btn-link p-0 text-decoration-none text-start">Minor</button></li>
                <li><button type="button" className="btn btn-link p-0 text-decoration-none text-start">Non Resident Indian (NRI)</button></li>
                <li><button type="button" className="btn btn-link p-0 text-decoration-none text-start">Company, Partnership, HUF and LLP</button></li>
                <li><button type="button" className="btn btn-link p-0 text-decoration-none text-start">Glossary</button></li>
              </ul>

            </div>
          </div>
        </div>

        {/* Your Zerodha Account */}
        <div className="accordion-item mt-3">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#zerodhaAccount"
            >
              <i className="fa fa-user-circle me-3 text-primary"></i>
              Your Zerodha Account
            </button>
          </h2>

          <div
            id="zerodhaAccount"
            className="accordion-collapse collapse"
            data-bs-parent="#supportAccordion"
          >
            <div className="accordion-body">

              <ul>
                <li><button type="button" className="btn btn-link p-0 text-decoration-none text-start">Your Profile</button></li>
                <li><button type="button" className="btn btn-link p-0 text-decoration-none text-start">Account modification</button></li>
                <li><button type="button" className="btn btn-link p-0 text-decoration-none text-start">Client Master Report (CMR) and Depository Participant (DP)</button></li>
                <li><button type="button" className="btn btn-link p-0 text-decoration-none text-start">Nomination</button></li>
                <li><button type="button" className="btn btn-link p-0 text-decoration-none text-start">Transfer and conversion of securities</button></li>
              </ul>

            </div>
          </div>
        </div>

        {/* Kite */}
        <div className="accordion-item mt-3">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#kite"
            >
              <i className="fa fa-compass me-3 text-primary"></i>
              Kite
            </button>
          </h2>

          <div
            id="kite"
            className="accordion-collapse collapse"
            data-bs-parent="#supportAccordion"
          >
            <div className="accordion-body">

              <ul>
                <li><button type="button" className="btn btn-link p-0 text-decoration-none text-start">IPO</button></li>
                <li><button type="button" className="btn btn-link p-0 text-decoration-none text-start">Trading FAQs</button></li>
                <li><button type="button" className="btn btn-link p-0 text-decoration-none text-start">Charts and orders</button></li>
                <li><button type="button" className="btn btn-link p-0 text-decoration-none text-start">Funds</button></li>
                <li><button type="button" className="btn btn-link p-0 text-decoration-none text-start">Portfolio</button></li>
              </ul>

            </div>
          </div>
        </div>

        {/* Funds */}
        <div className="accordion-item mt-3">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#funds"
            >
              <i className="fa fa-inr me-3 text-primary"></i>
              Funds
            </button>
          </h2>

          <div
            id="funds"
            className="accordion-collapse collapse"
            data-bs-parent="#supportAccordion"
          >
            <div className="accordion-body">

              <ul>
                <li><button type="button" className="btn btn-link p-0 text-decoration-none text-start">Add money</button></li>
                <li><button type="button" className="btn btn-link p-0 text-decoration-none text-start">Withdraw money</button></li>
                <li><button type="button" className="btn btn-link p-0 text-decoration-none text-start">Fund statement</button></li>
                <li><button type="button" className="btn btn-link p-0 text-decoration-none text-start">Bank accounts</button></li>
              </ul>

            </div>
          </div>
        </div>

        {/* Console */}
        <div className="accordion-item mt-3">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#console"
            >
              <i className="fa fa-cog me-3 text-primary"></i>
              Console
            </button>
          </h2>

          <div
            id="console"
            className="accordion-collapse collapse"
            data-bs-parent="#supportAccordion"
          >
            <div className="accordion-body">

              <ul>
                <li><button type="button" className="btn btn-link p-0 text-decoration-none text-start">Tax P&L</button></li>
                <li><button type="button" className="btn btn-link p-0 text-decoration-none text-start">Ledger</button></li>
                <li><button type="button" className="btn btn-link p-0 text-decoration-none text-start">Reports</button></li>
                <li><button type="button" className="btn btn-link p-0 text-decoration-none text-start">Corporate actions</button></li>
              </ul>

            </div>
          </div>
        </div>

        {/* Coin */}
        <div className="accordion-item mt-3">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#coin"
            >
              <i className="fa-solid fa-coins" style={{ color: "rgb(67, 67, 67)" }}></i>
              Coin
            </button>
          </h2>

          <div
            id="coin"
            className="accordion-collapse collapse"
            data-bs-parent="#supportAccordion"
          >
            <div className="accordion-body">

              <ul>
                <li><button type="button" className="btn btn-link p-0 text-decoration-none text-start">Mutual Funds</button></li>
                <li><button type="button" className="btn btn-link p-0 text-decoration-none text-start">SIP</button></li>
                <li><button type="button" className="btn btn-link p-0 text-decoration-none text-start">ELSS</button></li>
                <li><button type="button" className="btn btn-link p-0 text-decoration-none text-start">Redemption</button></li>
              </ul>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default CreateTicket;