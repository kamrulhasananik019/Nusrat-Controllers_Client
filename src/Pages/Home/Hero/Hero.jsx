import React from 'react';
// import fiver from '../assets/icons/Fiverr.png';
// import freelancer from '../assets/icons/freelancer.png';
// import linkedIn from '../assets/icons/linkedIn.png';

const Hero = ({profileImage}) => {
    return (
        <section className=' bg-gray-100' id="Home">
            <div className="container mx-auto  md:py-32 lg:py-32  py-16 px-8">
                <div className='flex flex-col-reverse md:flex-row '>
                    <div className="flex-1 pr-0 md:pr-10 text-center md:text-left mb-10 md:mb-0 md:pt-4 lg:pt-10">
                        <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4">YOUR VISION,<br /> MY MISSION</h2>
                        <p className="text-base md:text-lg mb-6">Ready to Make Your Brand Shine? Let's Bring Your Vision to Life!  </p>
                        <div className="flex justify-center md:justify-start space-x-4">
                            <button className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">Contact Me</button>
                            <button className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white">See My Work</button>
                        </div>
                    </div>
                    <div className="flex-1 text-center md:text-left md:mb-0 mb-10">
                    {profileImage && (
                <img src={profileImage?.imageUrl} alt="Profile" className="rounded-full w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 object-cover mx-auto" />
            )}
                    </div>
                </div>
                <h3 className='text-xl font-semibold md:mt-10 text-center md:text-start'>
                    A Few Of The Places I Work
                </h3>
                <div className='flex md:w-40 gap-5 mt-2 justify-center md:justify-start'>
                    {/* <img src={linkedIn} alt="" className='h-5 md:h-8'/>
                    <img src={fiver} alt=""  className='h-5 md:h-8'/>
                    <img src={freelancer} alt="" className='h-6 md:h-10'/> */}
                </div>
            </div>
        </section>
    );
};

export default Hero;
