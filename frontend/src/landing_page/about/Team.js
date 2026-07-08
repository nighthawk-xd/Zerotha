import React from "react";

function Team() {
  return (
    <div className="container py-5">
      <div className="row">

        {/* Member 1 */}
        <div className="col-lg-4 text-center mb-5">
          <img
            src="/media/Nikhil.jpg"
            alt="Nikhil Kamath"
            className="rounded-circle"
            style={{ width: "220px", height: "220px", objectFit: "cover" }}
          />
          <h4 className="mt-4">Nikhil Kamath</h4>
          <p className="text-muted">Co-founder & CFO</p>
          <a href="/" className="text-decoration-none text-dark">
            Bio <i className="fa-solid fa-chevron-down"></i>
          </a>
        </div>

        {/* Member 2 */}
        <div className="col-lg-4 text-center mb-5">
          <img
            src="/media/Kailash.jpg"
            alt="Dr. Kailash Nadh"
            className="rounded-circle"
            style={{ width: "220px", height: "220px", objectFit: "cover" }}
          />
          <h4 className="mt-4">Dr. Kailash Nadh</h4>
          <p className="text-muted">CTO</p>
          <a href="/" className="text-decoration-none text-dark">
            Bio <i className="fa-solid fa-chevron-down"></i>
          </a>
        </div>

        {/* Member 3 */}
        <div className="col-lg-4 text-center mb-5">
          <img
            src="/media/Venu.jpg"
            alt="Venu Madhav"
            className="rounded-circle"
            style={{ width: "220px", height: "220px", objectFit: "cover" }}
          />
          <h4 className="mt-4">Venu Madhav</h4>
          <p className="text-muted">COO</p>
          <a href="/" className="text-decoration-none text-dark">
            Bio <i className="fa-solid fa-chevron-down"></i>
          </a>
        </div>

        {/* Member 4 */}
        <div className="col-lg-4 text-center mb-5">
          <img
            src="/media/Seema.jpg"
            alt="Seema Patil"
            className="rounded-circle"
            style={{ width: "220px", height: "220px", objectFit: "cover" }}
          />
          <h4 className="mt-4">Seema Patil</h4>
          <p className="text-muted">Director</p>
          <a href="/" className="text-decoration-none text-dark">
            Bio <i className="fa-solid fa-chevron-down"></i>
          </a>
        </div>

        {/* Member 5 */}
        <div className="col-lg-4 text-center mb-5">
          <img
            src="/media/karthik.jpg"
            alt="Karthik Rangappa"
            className="rounded-circle"
            style={{ width: "220px", height: "220px", objectFit: "cover" }}
          />
          <h4 className="mt-4">Karthik Rangappa</h4>
          <p className="text-muted">Chief of Education</p>
          <a href="/" className="text-decoration-none text-dark">
            Bio <i className="fa-solid fa-chevron-down"></i>
          </a>
        </div>

        {/* Member 6 */}
        <div className="col-lg-4 text-center mb-5">
          <img
            src="/media/Austin.jpg"
            alt="Austin Prakash"
            className="rounded-circle"
            style={{ width: "220px", height: "220px", objectFit: "cover" }}
          />
          <h4 className="mt-4">Austin Prakash</h4>
          <p className="text-muted">Director Strategy</p>
          <a href="/" className="text-decoration-none text-dark">
            Bio <i className="fa-solid fa-chevron-down"></i>
          </a>
        </div>

      </div>
    </div>
  );
}

export default Team;