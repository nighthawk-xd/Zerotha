import React from "react";

function LeftSection({
  imageUrl,
  productName,
  productDescription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) {
  const handleTryDemo = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    
    // Product-specific routes
    const productRoutes = {
      "Kite": "http://localhost:3001",
      "Coin": "http://localhost:3001/coin",
      "Varsity": "http://localhost:3001/varsity",
      "Console": "http://localhost:3001/console",
      "Kite Connect API": "http://localhost:3001/kite-connect",
    };
    
    const targetRoute = productRoutes[productName] || "http://localhost:3001";
    
    if (token) {
      window.location.href = targetRoute;
    } else {
      window.location.href = "/login";
    }
  };

  return (
    <div className="container">
      <div className="row align-items-center">

        {/* Left Image */}
        <div className="col-md-7 p-3 text-center">
          <img
            src={imageUrl}
            alt={productName}
            className="img-fluid"
            style={{ maxWidth: "85%" }}
          />
        </div>

        {/* Right Content */}
        <div className="col-md-5 pt-5">

          <h2 className="mb-4">{productName}</h2>

          <p
            className="text-muted "
            style={{ lineHeight: "2" ,fontSize:"16px"}}
          >
            {productDescription}
          </p>

          <div className="mt-4 mb-4">

            <a
              href={tryDemo}
              onClick={handleTryDemo}
              className="text-decoration-none me-5 "
              style={{fontSize:"16px"}}
            >
              Try demo →
            </a>

            <a
              href={learnMore}
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none "
              style={{fontSize:"16px"}}
            >
              Learn more →
            </a>

          </div>

          <div className="d-flex align-items-center mt-4">

            <a
              href={googlePlay}
              target="_blank"
              rel="noopener noreferrer"
              className="me-3"
            >
              <img
                src="media/google-play-badge.svg"
                alt="Google Play"
                style={{ height: "55px" }}
              />
            </a>

            <a
              href={appStore}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="media/appstore-badge.svg"
                alt="App Store"
                style={{ height: "55px" }}
              />
            </a>

          </div>

        </div>

      </div>
    </div>
  );
}

export default LeftSection;