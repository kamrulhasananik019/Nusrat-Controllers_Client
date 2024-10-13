import React from 'react';
import CountUp from 'react-countup';

const About = () => {
    return (
        <section className='bg-blue-100' id="about">
            <div className="container mx-auto flex flex-col md:flex-row py-20 px-4 items-center ">
                <div className="flex-1 text-center  mb-10 md:mb-0 ">

                    <img src="https://firebasestorage.googleapis.com/v0/b/nusrat-graphi.appspot.com/o/nusrat-hero-image%2Fnusratjahan.jpg?alt=media&token=78482093-c18d-42a5-a7b3-f93a502a2630" alt="Nusrat Jahan"
                        className="rounded-full w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 object-cover mx-auto border-4  border-blue-600" />


                    {/* Overlay for the counters */}
                    <div className="grid justify-items-center align-baseline  text-white  mt-5">

                        <div className=" w-full  md:w-6/6 xl:w-3/6 grid  grid-cols-12 py-5 px-2  mb-5 bg-blue-600 rounded-md  border-white border-4">
                            <p className='   text-3xl  col-span-4'>0<CountUp end={4} /></p>
                            <p className='   text-left text-2xl col-span-8'>Years  Experience</p>
                        </div>

                        <div className=" w-full  md:w-6/6  xl:w-3/6 grid  grid-cols-12 py-5 px-2  mb-5 bg-blue-600 rounded-md  border-white border-4">
                            <p className='   text-3xl  col-span-4 '>+<CountUp end={300} /></p>
                            <p className='   text-left text-2xl col-span-8'> Completed Projects</p>
                        </div>
                        <div className=" w-full  md:w-6/6 xl:w-3/6 grid  grid-cols-12 py-5 px-2  mb-5 bg-blue-600 rounded-md  border-white border-4">
                            <p className='   text-3xl  col-span-4'>+<CountUp end={20} /></p>
                            <p className='   text-left text-2xl col-span-8'>Ongoing Projects</p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 md:pl-10 text-center md:text-left ">
                    <h2 className="text-3xl md:text-5xl  lg:text-6xl font-bold mb-4">About</h2>
                    <p className="text-base md:text-2xl mb-6">
                        I’m Nusrat Jahan, I’ve had the opportunity to experience and develop in a creative environment since 2022.</p>
                    <p className="text-base md:text-2xl mb-6">I always desire to break from my limitations. By honing design skills through years of experience, I believe that my design can connect well with your audience.</p>
                    <p className="text-base md:text-2xl mb-6">
                        Let's make it happen together!</p>
                    <button className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">Download CV</button>
                </div>
            </div>
        </section>
    );
};

export default About;
