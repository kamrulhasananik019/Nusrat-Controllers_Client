import React, { useEffect, useState } from 'react';
import Hero from '../Hero/Hero';
import About from '../About/About';
import Services from '../Services/Services';
import Expertise from '../Experience/Experience';
import Portfolio from '../Portfolio/Portfolio';
import Review from '../Review/Review';
import Sliders from '../Sliders/Sliders';
import useAxiosPublic from '../../../Components/Hook/useAxiosPublic';
import ContactUs from '../ContactUs/ContactUs';


const Home = () => {
    const axiosPublic = useAxiosPublic()
    const [profileImage, setProfileImage] = useState([]);


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
                    <Hero profileImage={profile} />
                    <About profileImage={profile} />
                </div>))}
            <div className='bg-gradient-to-r from-blue-600 via-purple-500 to-blue-300'>
                <Portfolio />

            </div>
            <div  className="bg-gradient-to-b from-blue-500 to-blue-300 text-white py-20">
                <Sliders />
            </div>

            <Services />
            <Review />
            <ContactUs/>
            
        </div>
    );
};

export default Home;