import React from 'react';
function Pricing() {
    return ( 
        <div className='container p-5'>
            <div className='row p-5'>
                <div className='col-6'>
                <h1 className='text-muted fs-2'>Unbeatable pricing</h1>
                <p className='text-muted fs-5'>We pioneered the concept of discount broking and price transparency in India. Flat fees and no hidden charges.</p>

<br></br><br></br>
<a href='/Pricing' className='text-decoration-none m-3'> See pricing <i className="fa-solid fa-arrow-right" style={{ color: 'rgb(67, 67, 67)' }}></i></a>
                    </div>
                <div className='col-6'>
                    <div className='row'>
                       
               <div className="col-6">
      <div className="d-flex align-items-center mb-5">
        <img
          src="media/pricing0.svg"
          alt=""
          style={{ width: "120px" }}
        />
        <p className="text-muted ms-3 mb-0">
          Free account <br /> opening
        </p>
      </div>

      <div className="d-flex align-items-center">
        <img
          src="media/pricing20.svg"
          alt=""
          style={{ width: "120px" }}
        />
        <p className="text-muted ms-3 mb-0">
          Intraday and <br /> F&amp;O
        </p>
      </div>
    </div>

    <div className="col-6">
      <div className="d-flex align-items-center mb-5">
        <img
          src="media/pricing0.svg"
          alt=""
          style={{ width: "120px" }}
        />
        <p className="text-muted ms-3 mb-0">
          Free equity delivery <br />
          and direct mutual funds
        </p>
      </div>
    </div>

  </div>
</div>
</div>
</div>
     );
}
export default Pricing;