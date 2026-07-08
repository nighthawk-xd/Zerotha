import React from "react";

function Footer() {
  return (
    <footer className="border-top mt-5 pt-5 bg-white">
      <div className="container">

        <div className="row">

          {/* Left */}
          <div className="col-md-3">
            <img
              src="media/logo.svg"
              alt="Zerodha"
              style={{ width: "170px" }}
            />

            <p className="text-muted mt-3 small">
              © 2010 - 2026, Zerodha Broking Ltd.
              <br />
              All rights reserved.
            </p>

            <div className="fs-4 d-flex gap-3 text-secondary mb-4">
              <i className="fa-brands fa-x-twitter"></i>
              <i className="fa-brands fa-instagram"></i>
              <i className="fa-brands fa-linkedin-in"></i>
            </div>

            <hr />

            <div className="fs-4 d-flex gap-3">
              <i className="fa-brands fa-youtube"></i>
              <i className="fa-brands fa-whatsapp"></i>
              <i className="fa-brands fa-telegram"></i>
            </div>
          </div>

          {/* Account */}
          <div className="col-md-3">
            <h5>Account</h5>

            <ul className="list-unstyled">
              <li><a href="/" className="text-decoration-none text-dark">Open demat account</a></li>
              <li><a href="/" className="text-decoration-none text-dark">Minor demat account</a></li>
              <li><a href="/" className="text-decoration-none text-dark">NRI demat account</a></li>
              <li><a href="/" className="text-decoration-none text-dark">HUF demat account</a></li>
              <li><a href="/" className="text-decoration-none text-dark">Commodity</a></li>
              <li><a href="/" className="text-decoration-none text-dark">Dematerialisation</a></li>
              <li><a href="/" className="text-decoration-none text-dark">Fund transfer</a></li>
              <li><a href="/" className="text-decoration-none text-dark">MTF</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-md-3">
            <h5>Support</h5>

            <ul className="list-unstyled">
              <li><a href="/" className="text-decoration-none text-dark">Contact us</a></li>
              <li><a href="/" className="text-decoration-none text-dark">Support portal</a></li>
              <li><a href="/" className="text-decoration-none text-dark">How to file a complaint?</a></li>
              <li><a href="/" className="text-decoration-none text-dark">Status of complaints</a></li>
              <li><a href="/" className="text-decoration-none text-dark">Bulletin</a></li>
              <li><a href="/" className="text-decoration-none text-dark">Circular</a></li>
              <li><a href="/" className="text-decoration-none text-dark">Z-Connect blog</a></li>
              <li><a href="/" className="text-decoration-none text-dark">Downloads</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="col-md-3">
            <h5>Company</h5>

            <ul className="list-unstyled">
              <li><a href="/" className="text-decoration-none text-dark">About</a></li>
              <li><a href="/" className="text-decoration-none text-dark">Philosophy</a></li>
              <li><a href="/" className="text-decoration-none text-dark">Press & media</a></li>
              <li><a href="/" className="text-decoration-none text-dark">Careers</a></li>
              <li><a href="/" className="text-decoration-none text-dark">Zerodha Cares (CSR)</a></li>
              <li><a href="/" className="text-decoration-none text-dark">Zerodha.tech</a></li>
              <li><a href="/" className="text-decoration-none text-dark">Open source</a></li>
              <li><a href="/" className="text-decoration-none text-dark">Referral program</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Text */}

        <div className="mt-5">
          <p className="text-muted small">
            Zerodha Broking Ltd.: Member of NSE, BSE, MCX & NSE – SEBI
            Registration No.: INZ000031633.
          </p>

          <p className="text-muted small">
            Investments in securities market are subject to market risks.
            Read all related documents carefully before investing.
          </p>

          <p className="text-muted small">
            Prevent unauthorised transactions in your account. Update your
            mobile number and email IDs with your stock broker.
          </p>
        </div>
        <div className="mt-5">
  <p className="text-muted small">
    Zerodha Broking Ltd.: Member of NSE, BSE, MCX & MSEI – SEBI Registration no.:
    INZ000031633 CDSL/NSDL: Depository services through Zerodha Broking Ltd. –
    SEBI Registration no.: IN-DP-431-2019 Registered Address: Zerodha Broking
    Ltd., #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public School,
    J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India. For any
    complaints pertaining to securities broking please write to
    <a href="/" className="text-decoration-none"> complaints@zerodha.com</a>,
    for DP related to
    <a href="/" className="text-decoration-none"> dp@zerodha.com</a>. Please
    ensure you carefully read the Risk Disclosure Document as prescribed by SEBI
    | ICF.
  </p>

  <p className="text-muted small">
    Procedure to file a complaint on SEBI SCORES: Register on SCORES portal.
    Mandatory details for filing complaints on SCORES: Name, PAN, Address,
    Mobile Number, E-mail ID. Benefits: Effective Communication, Speedy
    redressal of the grievances.
  </p>

  <p className="small">
    <a href="/" className="text-decoration-none">
      Smart Online Dispute Resolution
    </a>{" "}
    &nbsp;|&nbsp;
    <a href="/" className="text-decoration-none">
      Grievances Redressal Mechanism
    </a>
  </p>

  <p className="text-muted small">
    Investments in securities market are subject to market risks; read all the
    related documents carefully before investing.
  </p>

  <p className="text-muted small">
    Attention investors:
    <br />
    1) Stock brokers can accept securities as margins from clients only by way
    of pledge in the depository system w.e.f September 01, 2020.
    <br />
    2) Update your e-mail and phone number with your stock broker/depository
    participant and receive OTP directly from depository on your e-mail and/or
    mobile number to create pledge.
    <br />
    3) Check your securities / MF / bonds in the consolidated account statement
    issued by NSDL/CDSL every month.
  </p>

  <p className="small">
    India's largest broker based on networth as per NSE.
    <a href="/" className="text-decoration-none">
      {" "}
      NSE broker factsheet
    </a>
  </p>

  <p className="text-muted small">
    "Prevent unauthorised transactions in your account. Update your mobile
    numbers/email IDs with your stock brokers/depository participants. Receive
    information of your transactions directly from Exchange/Depositories on your
    mobile/email at the end of the day. Issued in the interest of investors.
    KYC is one time exercise while dealing in securities markets - once KYC is
    done through a SEBI registered intermediary (broker, DP, Mutual Fund etc.),
    you need not undergo the same process again when you approach another
    intermediary."
  </p>

  <p className="text-muted small">
    Dear Investor, if you are subscribing to an IPO, there is no need to issue
    a cheque. Please write the Bank account number and sign the IPO application
    form to authorize your bank to make payment in case of allotment. In case
    of non-allotment the funds will remain in your bank account. As a business
    we don't give stock tips, and have not authorized anyone to trade on behalf
    of others. If you find anyone claiming to be part of Zerodha and offering
    such services,
    <a href="/" className="text-decoration-none">
      {" "}
      please create a ticket here.
    </a>
  </p>

  <p className="text-muted small">
    *Customers availing insurance advisory services offered by Ditto (Tactical
    Consulting Private Limited | IRDAI Registered Corporate Agent (Composite)
    License No. CA0738) will not have access to the exchange investor grievance
    redressal forum, SEBI SCORES/ODR, or arbitration mechanism for such
    products.
  </p>

  <p className="text-muted small">
    Fixed deposit products offered on this platform are third-party products
    (TPP) and are not Exchange traded products. These are offered through
    Blostem Fintech Private Limited. Zerodha Broking Ltd. (SEBI Registration
    No.: INZ000031633) is acting solely as a distributor for these products. Any
    disputes arising with respect to such distribution activity will not have
    access to SEBI SCORES/ODR, Exchange Investor Grievance Redressal Forum, or
    Arbitration mechanism. Fixed deposits are regulated by the Reserve Bank of
    India (RBI).
  </p>
</div>

        {/* Bottom Links */}

        <div className="border-top pt-3 mt-4 pb-3">
          <div className="d-flex justify-content-center gap-4 flex-wrap small">

            <a href="/" className="text-decoration-none text-secondary">NSE</a>
            <a href="/" className="text-decoration-none text-secondary">BSE</a>
            <a href="/" className="text-decoration-none text-secondary">MCX</a>
            <a href="/" className="text-decoration-none text-secondary">Terms & Conditions</a>
            <a href="/" className="text-decoration-none text-secondary">Privacy Policy</a>
            <a href="/" className="text-decoration-none text-secondary">Disclosure</a>
            <a href="/" className="text-decoration-none text-secondary">Investor Charter</a>
            <a href="/" className="text-decoration-none text-secondary">Sitemap</a>

          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;