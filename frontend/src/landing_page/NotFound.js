import React from 'react';
import { Link } from 'react-router-dom';
function NotFound() {
    return (
        <div className='container'>
            <div className='row text-center fs-5' >
            <h1 className='text-center m-3'>404 Not Found </h1>
            <p className='text-center fs-5 m-3'>The page you are looking for does not exist.</p>
          <Link to="/"><button type="button" className="btn btn-primary fs-5 mt-3" style={{width:"15%",margin:"0 auto"}}>Go to Home</button></Link>
        </div>
        </div>
    );
}

export default NotFound;