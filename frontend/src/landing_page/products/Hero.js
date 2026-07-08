import React from 'react';
import { Link } from 'react-router-dom';
function Hero() {
    return ( <div className="row align-items-center">
<h3 className='text-center text-muted m-3 fs-2' style={{paddingTop:"100px"}}>Zerodha Products</h3>
<p className='text-center text-muted m-1 fs-5'>Sleek, modern, and intuitive trading platforms</p>
<p className='text-center text-muted m-1 fs-5' style={{paddingBottom:"150px"}}>Check out our <Link to="/investment-offerings" className='text-decoration-none'>investment offerings →</Link></p>
<hr></hr> </div> );
}

export default Hero;