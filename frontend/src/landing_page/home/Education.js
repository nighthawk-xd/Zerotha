import React from 'react';

function Education() {
    return ( 
        <div className='container p-5'>
            <div className='row p-5'>
                <div className='col-6'>
<img src='media/Varsity.svg' alt='Loading' className='mb-5' style={{width:"80%", margin:"0 auto"}}></img>
                    </div>
                
               <div className="col-6" p-5>
            <h1 className='text-muted fs-2'>Free and open market education</h1>
            <p className='text-muted fs-5'>Varsity, the largest online stock market education book in the world covering everything from the basics to advanced trading.</p>
            <a href='/Education' className='text-decoration-none m-3'>Varsity <i className="fa-solid fa-arrow-right" style={{ color: 'rgb(67, 67, 67)' }}></i></a>
            <br></br>
            <p className='text-muted fs-5'>TradingQ&A, the most active trading and investment community in India for all your market related queries.</p>
            <a href='/Education' className='text-decoration-none m-3'>TradingQ&A <i className="fa-solid fa-arrow-right" style={{ color: 'rgb(67, 67, 67)' }}></i></a>
                    </div>
</div>
</div>
     );
}

export default Education;