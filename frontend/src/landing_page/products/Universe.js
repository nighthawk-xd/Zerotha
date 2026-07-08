import React from "react";
import { Link } from "react-router-dom";

function Universe() {
  return (
    <div className="container my-5" style={{paddingLeft:"200px",paddingRight:"200px"}}>

      {/* Top Text */}
      <p className="text-center text-muted mb-5">
        Want to know more about our technology stack? Check out the{" "}
        <a href="/" className="text-decoration-none">
          Zerodha.tech
        </a>{" "}
        blog.
      </p>

      {/* Heading */}
      <h2 className="text-center text-muted">The Zerodha Universe</h2>

      <p className="text-center text-muted mb-5">
        Extend your trading and investment experience even further with our
        partner platforms
      </p>

      {/* First Row */}
      <div className="row text-center mb-5">

        <div className="col-md-4">
          <img
            src="media/zerodhafundhouse.png"
            alt="Fund House"
            className="img-fluid mb-3"
            style={{ height: "60px" }}
          />
          <p className="text-muted" style={{fontSize:"12px"}}>
            Our asset management venture that is creating simple and transparent
            index funds to help you save for your goals.
          </p>
        </div>

        <div className="col-md-4">
          <img
            src="media/sensibull-logo.svg"
            alt="Sensibull"
            className="img-fluid mb-3"
            style={{ height: "60px" }}
          />
          <p className="text-muted" style={{fontSize:"12px"}}>
            Options trading platform that lets you create strategies, analyze
            positions, and examine data points like open interest, FII/DII, and
            more.
          </p>
        </div>

        <div className="col-md-4">
          <img
            src="media/tijori.svg"
            alt="Tijori"
            className="img-fluid mb-3"
            style={{ height: "60px" }}
          />
          <p className="text-muted" style={{fontSize:"12px"}}>
            Investment research platform that offers detailed insights on
            stocks, sectors, supply chains, and more.
          </p>
        </div>

      </div>

      {/* Second Row */}
      <div className="row text-center mb-5">

        <div className="col-md-4">
          <img
            src="media/streak-logo.png"
            alt="Streak"
            className="img-fluid mb-3"
            style={{ height: "60px" }}
          />
          <p className="text-muted" style={{fontSize:"12px"}}>
            Systematic trading platform that allows you to create and backtest
            strategies without coding.
          </p>
        </div>

        <div className="col-md-4">
          <img
            src="media/smallcase-logo.png"
            alt="Smallcase"
            className="img-fluid mb-3"
            style={{ height: "60px" }}
          />
          <p className="text-muted" style={{fontSize:"12px"}}>
            Thematic investing platform that helps you invest in diversified
            baskets of stocks on ETFs.
          </p>
        </div>

        <div className="col-md-4">
          <img
            src="media/ditto-logo.png"
            alt="Ditto"
            className="img-fluid mb-3"
            style={{ height: "60px" }}
          />
          <p className="text-muted" style={{fontSize:"12px"}}>
            Personalized advice on life and health insurance. No spam and no
            mis-selling.
          </p>
        </div>

      </div>

      {/* Button */}
      <div className="text-center">
        <Link to="/signup" className="text-decoration-none">
          <button className="btn btn-primary btn-lg px-5">
            Sign up for free
          </button>
        </Link>
      </div>

    </div>
  );
}

export default Universe;