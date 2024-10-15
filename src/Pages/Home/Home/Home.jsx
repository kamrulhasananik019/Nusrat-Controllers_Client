import React from 'react';
import Hero from '../Hero/Hero';
import About from '../About/About';
import Services from '../Services/Services';
import Expertise from '../Experience/Experience';
import Portfolio from '../Portfolio/Portfolio';
import Review from '../Review/Review';


const Home = () => {
    return (
        <div>
            <Hero />
            <About/>
            <Portfolio/>
            <Services/>
            <Review/>
            <Expertise/>
            
        </div>
    );
};

export default Home;