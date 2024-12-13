import React from 'react';
import { motion } from 'framer-motion';

const Hero = ({ profileImage, aosAttributes }) => {

    return (
        <section
            className="bg-[#111111] text-white py-20"
            // className="bg-gradient-to-t from-blue-800 to-slate-900 text-white py-20"
            // className="bg-gradient-to-b from-blue-800 to-blue-900 text-white py-20"
            id="Home"
        >
            <div className="container mx-auto md:py-32 lg:py-40 py-20 px-8">
                <div className='flex flex-col-reverse md:flex-row ' >

                    {/* Text Section */}
                    <div
                        className="flex-1 pr-0 md:pr-10 text-center md:text-left mb-10 md:mb-0 md:pt-4 lg:pt-10"
                        {...aosAttributes}
                    >
                        <motion.h2
                            className="text-3xl md:text-5xl lg:text-7xl font-extrabold mb-4 bg-gradient-to-tr to-blue-500 from-blue-700 text-transparent bg-clip-text stroke-white"
                            // className="text-3xl md:text-5xl lg:text-7xl font-extrabold mb-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-transparent bg-clip-text"
                            whileHover={{ scale: 1.05 }}
                        >
                            YOUR VISION,<br /> MY MISSION
                        </motion.h2>
                        <motion.p
                            className="text-base md:text-lg lg:text-xl text-white-700 mb-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                        >
                            Ready to Make Your Brand Shine? Let's Bring Your Vision to Life!
                        </motion.p>
                        <div className="flex justify-center md:justify-start space-x-4">
                            <motion.button
                                // className="bg-white  font-bold py-2 px-4 rounded-full hover:bg-blue-800 hover:text-white"
                                className="px-6 py-3 bg-blue-600 text-blue-200 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:bg-blue-500 hover:text-white focus:outline-none"
                                whileHover={{ scale: 1.1, boxShadow: '0px 0px 20px rgba(59, 130, 246, 0.5)', backgroundColor: '#2563eb' }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Contact Me
                            </motion.button>
                            <motion.button
                                className="px-6 py-3 border-2 border-blue-200 text-blue-200 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:bg-blue-600 hover:text-white hover:scale-105 hover:shadow-xl focus:outline-none"
                                whileHover={{ scale: 1.1, boxShadow: '0px 0px 20px rgba(59, 130, 246, 0.5)' }}
                                whileTap={{ scale: 0.95 }}
                            >
                                See My Work
                            </motion.button>
                        </div>
                    </div>

                    {/* Image Section */}
                    <motion.div
                        className="flex-1 text-center md:text-left md:mb-0 mb-10"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                    >
                        {profileImage && (
                            <motion.img
                                src={profileImage?.imageUrl}
                                alt="Profile"
                                className="rounded-full w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 object-cover mx-auto border-4 border-white shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
                                whileHover={{ scale: 1.1, rotate: 5, boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)" }}
                            />
                        )}
                    </motion.div>
                </div>

                {/* Footer Text */}
                <motion.h3
                    className='text-xl md:text-2xl lg:text-3xl font-semibold text-white-800 md:mt-10 text-center md:text-start'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                >
                    A Few Of The Places I Work
                </motion.h3>

                {/* Company Logos */}
                <motion.div
                    className='flex md:w-40 gap-5 mt-2 justify-center md:justify-start'
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                >
                    {/* <img src="/path/to/your/logo1.png" alt="Logo 1" className='h-5 md:h-8'/>
                    <img src="/path/to/your/logo2.png" alt="Logo 2" className='h-5 md:h-8'/>
                    <img src="/path/to/your/logo3.png" alt="Logo 3" className='h-6 md:h-10'/> */}
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
