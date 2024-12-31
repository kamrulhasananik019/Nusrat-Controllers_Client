import React, { useEffect, useState } from 'react';
import Hero from '../Hero/Hero';
import About from '../About/About';
import Services from '../Services/Services';
import Portfolio from '../Portfolio/Portfolio';
import Review from '../Review/Review';
import Sliders from '../Sliders/Sliders';
import useAxiosPublic from '../../../Components/Hook/useAxiosPublic';
import ContactUs from '../ContactUs/ContactUs';
import AOS from 'aos';
import 'aos/dist/aos.css';


const Home = () => {
    const axiosPublic = useAxiosPublic()
    const [profileImage, setProfileImage] = useState([]);

    useEffect(() => {
        AOS.init({ duration: 1500 }); // Initialize AOS with a duration of 1 second
    }, []);


    // Fetch portfolio data
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axiosPublic.get('/getprofile');
                setProfileImage(response.data);
            } catch (error) {
                console.error('Error fetching portfolio data:', error);
            }
        };

        fetchProjects();
    }, [axiosPublic]);

    return (
        <div>
            {profileImage.length > 0 && profileImage.map((profile, index) => (
                <div key={index}>
                    {/* Pass each profile object to Hero and About */}
                    <Hero profileImage={profile} aosAttributes={{ "data-aos": "fade-right" }} />
                    <About profileImage={profile} aosAttributes={{
                        "data-aos": "fade-up",
                        "data-aos-anchor-placement": "top-bottom",
                        "data-aos": "fade-right"
                    }} />
                </div>))}
            <div className='bg-[#111111]'>
                <Portfolio aos="fade-up" />

            </div>
            <div className="bg-[#111111] text-white py-20">
                <Sliders aos="fade-up" />
            </div>

            <Services aos="fade-up" />
            <Review aos="fade-up" />
            <ContactUs aos="fade-up" />

        </div>
    );
};

export default Home;