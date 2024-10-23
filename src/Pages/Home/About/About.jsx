import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { Download } from 'lucide-react';

const About = ({ profileImage, aosAttributes }) => {
    // Destructure AOS attributes
    const { 'data-aos': fadeRight, 'data-aos': fadeUp, 'data-aos-delay': dataAosDelay, 'data-aos-anchor-placement': dataAosAnchorPlacement } = aosAttributes || {};

    // Motion variants for fade-up animation
    const fadeInUp = {
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    // Data for statistics
    const statsData = [
        { value: 4, label: 'Years Experience' },
        { value: 300, label: 'Completed Projects' },
        { value: 20, label: 'Ongoing Projects' }
    ];

    return (
        <section
            className="bg-gradient-to-b from-blue-900 to-blue-600 text-white py-20"
            id="about"
        >
            <div className="container mx-auto flex flex-col lg:flex-row py-20 px-4 items-center space-y-12 lg:space-y-0 lg:space-x-12">

                {/* Profile Section with fade-right AOS animation */}
                <div
                    className="flex-1 text-center lg:text-left"
                    data-aos="fade-right"                    // Use fade-right for AOS animation
                    data-aos-delay={dataAosDelay}             // Optional delay
                    data-aos-anchor-placement={dataAosAnchorPlacement}
                >
                    {profileImage && (
                        <div className="relative inline-block">
                            <motion.img
                                src={profileImage?.imageUrl}
                                alt="Profile"
                                className="rounded-full w-64 h-64 lg:w-96 lg:h-96 object-cover border-4 border-blue-300 shadow-lg"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            />
                            <motion.div
                                className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-400 rounded-full flex items-center justify-center text-white text-xl font-bold"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
                            >
                                Hello!
                            </motion.div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                        {statsData.map((stat, index) => (
                            <motion.div
                                key={index}
                                className="bg-blue-500/10 rounded-lg p-6 text-center"
                                whileHover={{ scale: 1.05, backgroundColor: '#2563EB' }}
                                transition={{ duration: 0.3 }}
                            >
                                <CountUp
                                    end={stat.value}
                                    prefix={stat.value >= 100 ? '+' : ''}
                                    className="text-4xl font-bold text-blue-300"
                                />
                                <p className="text-sm mt-2 text-white">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Text Section with fade-up AOS animation */}
                <div
                    className="flex-1 lg:pl-10 text-center lg:text-left"
                    data-aos="fade-up"                       // Use fade-up for AOS animation
                    data-aos-delay={dataAosDelay}             // Optional delay
                    data-aos-anchor-placement={dataAosAnchorPlacement}
                >
                    <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-blue-100">About Me</h2>
                    <p className="text-lg mb-4 text-blue-100" variants={fadeInUp}>
                        I'm Nusrat Jahan, I've had the opportunity to experience and develop in a creative environment since 2022.
                    </p>
                    <p className="text-lg mb-4 text-blue-100" variants={fadeInUp}>
                        I always desire to break from my limitations. By honing design skills through years of experience, I believe that my design can connect well with your audience.
                    </p>
                    <p className="text-lg mb-6 text-blue-100" variants={fadeInUp}>
                        Let's make it happen together!
                    </p>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <button className="px-6 py-3 flex bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition ease-in-out duration-300">
                            Download CV <Download className="ml-2 h-4 w-4" />
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
