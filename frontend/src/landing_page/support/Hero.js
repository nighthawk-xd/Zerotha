import React from "react";

function Hero() {
  return (
    <section className="container-fluid" id="supportHero">
      <div className="container py-5">

        {/* Top Row */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fw-bold">Support Portal</h1>

          <button className="btn btn-primary px-4 py-2">
            My tickets
          </button>
        </div>

        {/* Search Bar */}
        <div className="input-group mb-5">
          <span className="input-group-text bg-white">
            <i className="fa fa-search"></i>
          </span>

          <input
            type="text"
            className="form-control"
            placeholder="Eg: How do I open my account, How do I activate F&O..."
          />
        </div>

        {/* Bottom Section */}
        <div className="row">

          {/* Left */}
          <div className="col-lg-8">

            <h4 className="mb-4">
              Search for an answer or browse help topics to create a ticket
            </h4>

            <div className="row">

              <div className="col-md-6 mb-3">
                <button type="button" className="btn btn-link p-0 text-decoration-none text-start">
                  Track account opening
                </button>
              </div>

              <div className="col-md-6 mb-3">
                <button type="button" className="btn btn-link p-0 text-decoration-none text-start">
                  Track segment activation
                </button>
              </div>

              <div className="col-md-6 mb-3">
                <button type="button" className="btn btn-link p-0 text-decoration-none text-start">
                  Intraday margins
                </button>
              </div>

              <div className="col-md-6 mb-3">
                <button type="button" className="btn btn-link p-0 text-decoration-none text-start">
                  Kite user manual
                </button>
              </div>

            </div>

          </div>

          {/* Right */}
          <div className="col-lg-4">

            <div className="border-start border-4 border-warning bg-light p-3">

              <ul className="mb-0">

                <li className="mb-3">
                  <button type="button" className="btn btn-link p-0 text-decoration-none text-start">
                    Surveillance measure on scrips - July 2026
                  </button>
                </li>

                <li>
                  <button type="button" className="btn btn-link p-0 text-decoration-none text-start">
                    Current Buybacks - July 2026
                  </button>
                </li>

              </ul>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;