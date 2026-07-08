import React from 'react';
function Stats() {
    return ( 
       
        <div className="container ">
            <div className="row mt-5">
                <div className="col-5 mt-5 p-5">
                    <h1 className='mb-3'>Trust with confidence</h1>

                    <h3 className='mb-3 '>Customer-first always</h3>
                    <p className='text-muted fs-5'>That's why 1.6+ crore customers trust Zerodha with ~ ₹6 lakh crores of equity investments, making us India’s largest broker; contributing to 15% of daily retail exchange volumes in India.</p>
                    <h3 className='mb-3 mt-5'>No spam or gimmicks</h3>
                    <p className='text-muted fs-5'>No gimmicks, spam, "gamification", or annoying push notifications. High quality apps that you use at your pace, the way you like. Our philosophies.</p>
                    <h3 className='mb-3 mt-5'>The Zerodha universe</h3>
                    <p className='text-muted fs-5'>Not just an app, but a whole ecosystem. Our investments in 30+ fintech startups offer you tailored services specific to your needs.</p>
                    <h3 className='mb-3 mt-5'>Do better with money</h3>
                    <p className='text-muted fs-5'>With initiatives like Nudge and Kill Switch, we don't just facilitate transactions, but actively help you do better with your money.</p>
                </div>
                <div className="col-7 mt-5">
                    <img src='media/ecosystem.png' className='pt-5' alt='Ecosystem' style={{width:"99%",margin:"0 auto"}}></img>
                      <div className='text-center'>
                    <a href='/products' className='text-decoration-none m-3'> Explore our products <i className="fa-solid fa-arrow-right" style={{ color: 'rgb(67, 67, 67)' }}></i></a>
                    <a href='/demo' className='text-decoration-none m-3'> Try kito demo <i className="fa-solid fa-arrow-right" style={{ color: 'rgb(67, 67, 67)' }}></i></a>
                </div>                  
                </div>
              
            </div>
        </div>
     );
}
export default Stats;