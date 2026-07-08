import React from 'react';

function Awards() {
    return ( 
       <div className='container mt-5'>
        <div className='row p-5'>
<div className='col-6 mt-5' style={{margin: "0 auto"}}>
    <img src='media/Awards.png' alt='Loading'  style={{width:"80%", margin:"0 auto"}}></img>
    </div>
    <div className='col-6 mt-5 fs-5' style={{margin: "0 auto"}}>
 
    <h1>Largest stock broker in India</h1>

    <p className="subtitle">
      2+ million Zerodha clients contribute to over 15% of all retail order
      volumes in India daily by trading and investing in:
    </p>
<div className='row'>
    <div className='col-6 p-4'>
      <ul>
        <li><p>Futures and Options</p></li>
        <li><p>Commodity derivatives</p></li>
        <li><p>Currency derivatives</p></li>
      </ul>
</div>
    <div className='col-6 p-4'>
      <ul>
        <li><p>Stocks &amp; IPOs</p></li>
        <li><p>Direct mutual funds</p></li>
        <li><p>Bonds and Govt. Securities</p></li>
      </ul>
    </div>
    </div>
    </div>
   
        </div>
       </div>
     );
}

export default Awards;