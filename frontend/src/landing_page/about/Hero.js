import React from 'react';
import { Link } from 'react-router-dom';
function Hero() {
    return ( <div className="container">
<div className="row align-items-center"><br></br><br></br><br></br><br></br><br></br>
<h3 className='text-center text-muted m-3'>We pioneered the discount broking model in India.<br></br>
Now, we are breaking ground with our technology.</h3>
<br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
<hr></hr>
<div className="row ">
<div className="col-md-6 ">

<p className='' style={{paddingLeft:"200px", fontSize:"17px"}}>We kick-started operations on the 15th of August, 2010 with the goal of breaking all barriers that traders and investors face in India in terms of cost, support, and technology. We named the company Zerodha, a combination of Zero and "Rodha", the Sanskrit word for barrier.<br></br><br></br>
Today, our disruptive pricing models and in-house technology have made us the biggest stock broker in India.<br></br><br></br> Over 1.6+ crore clients place billions of orders every year through our powerful ecosystem of investment platforms, contributing over 15% of all Indian retail trading volumes.</p>
</div>
<div className="col-md-6">

<p className='' style={{paddingRight:"200px", fontSize:"17px"}}>In addition, we run a number of popular open online educational and community initiatives to empower retail traders and investors.<br></br><br></br>
<Link to="/rainmatter" className='text-decoration-none' >Rainmatter</Link>, our fintech fund and incubator, has invested in several fintech startups with the goal of growing the Indian capital markets.<br></br><br></br>
And yet, we are always up to something new every day. Catch up on the latest updates on our<Link to="/blog" className='text-decoration-none' > blog</Link> or see what the media is <Link to="/media" className='text-decoration-none' >saying about us </Link>or learn more about our business and product<Link to="/philosophy" className='text-decoration-none' > philosophies</Link>.</p>
</div>
</div>
<br></br><br></br><br></br>

</div>
<div className="container my-5">
  <h1 className="text-center mb-5">People</h1>

  <div className="row align-items-center">

    {/* Left Side */}
    <div className="col-md-5 text-center">

      <img
        src="media/nithin-kamath.jpg"
        alt="Nithin Kamath"
        className="img-fluid rounded-circle"
        style={{
          width: "320px",
          height: "320px",
          objectFit: "cover"
        }}
      />

      <h4 className="mt-4">Nithin Kamath</h4>

      <p className="text-muted">Founder, CEO</p>

    </div>

    {/* Right Side */}
    <div className="col-md-7">

      <p className="text-muted " style={{ lineHeight: "2" }}>
        Nithin bootstrapped and founded Zerodha in 2010 to overcome the
        hurdles he faced during his decade long stint as a trader.
        Today, Zerodha has changed the landscape of the Indian broking
        industry.
      </p>

      <p className="text-muted " style={{ lineHeight: "2" }}>
        He is a member of the SEBI Secondary Market Advisory Committee
        (SMAC) and the Market Data Advisory Committee (MDAC).
      </p>

      <p className="text-muted ">
        Playing basketball is his zen.
      </p>

      <p className="">
        Connect on{" "}
        <Link to="/homepage" className="text-decoration-none">
          Homepage
        </Link>{" "}
        /{" "}
        <Link to="/tradingqna" className="text-decoration-none">
          TradingQnA
        </Link>{" "}
        /{" "}
        <Link to="/twitter" className="text-decoration-none">
          Twitter
        </Link>
      </p>

    </div>

  </div>
</div>

    </div>
    

    );
}

export default Hero;