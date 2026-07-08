import React from 'react';
import Hero from './Hero';

import LeftSection from './LeftSection';
import RightSection from './RightSection';
import Universe from './Universe';

function ProductsPage() {
    return ( <>
   
    <Hero />
    <LeftSection 
    imageUrl="media/products-kite.png"
    productName="Kite"
    productDescription="Our ultra-fast flagship trading platform with streaming market data, advanced charts, an elegant UI, and more. Enjoy the Kite experience seamlessly on your Android and iOS devices."
    tryDemo="/try-kite"
    learnMore="/learn-more-kite"
    googlePlay="/google-play"
    appStore="/app-store"
    />


<RightSection 
 imageUrl="media/products-console.png"
    productName="Console"
    productDescription="The central dashboard for your Zerodha account. Gain insights into your trades and investments with in-depth reports and visualisations."
    tryDemo="/try-console"
    learnMore="/learn-more-console"
    googlePlay="/google-play"
    appStore="/app-store" />


     <LeftSection 
    imageUrl="media/products-coin.png"
    productName="Coin"
    productDescription="Buy direct mutual funds online, commission-free, delivered directly to your Demat account. Enjoy the investment experience on your Android and iOS devices."
    tryDemo="/try-coin"
    learnMore="/learn-more-coin"
    googlePlay="/google-play"
    appStore="/app-store"
    />


<RightSection
 imageUrl="media/kite-API.svg"
    productName="Kite Connect API"
    productDescription="Build powerful trading platforms and experiences with our super simple HTTP/JSON APIs. If you are a startup, build your investment app and showcase it to our clientbase."
    tryDemo="/try-kite-connect"
    learnMore="/learn-more-kite-connect"
    googlePlay="/google-play"
    appStore="/app-store" />


     <LeftSection 
    imageUrl="media/varsity-products.svg"
    productName="Varsity"
    productDescription="An easy to grasp, collection of stock market lessons with in-depth coverage and illustrations. Content is broken down into bite-size cards to help you learn on the go."
    tryDemo="/try-varsity"
    learnMore="/learn-more-varsity"
    googlePlay="/google-play"
    appStore="/app-store"
    />
    
    <Universe />
   
    </> );
}

export default ProductsPage;