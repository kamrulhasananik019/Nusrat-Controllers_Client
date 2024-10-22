import React, { useEffect, useState } from 'react';
import Hero from '../Hero/Hero';
import About from '../About/About';
import Services from '../Services/Services';
import Expertise from '../Experience/Experience';
import Portfolio from '../Portfolio/Portfolio';
import Review from '../Review/Review';
import Sliders from '../Sliders/Sliders';
import useAxiosPublic from '../../../Components/Hook/useAxiosPublic';


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
            <div className='bg-gradient-to-r from-blue-300 to-blue-800 p-5 '>
                <Portfolio />
                <Sliders />
            </div>
            <Services />
            <Review />
            <Expertise />
        </div>
    );
};

export default Home;