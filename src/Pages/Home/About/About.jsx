import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { Download } from 'lucide-react';

const About = ({ profileImage }) => {
    const fadeInUp = {
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const statsData = [
        { value: 4, label: 'Years Experience' },
        { value: 300, label: 'Completed Projects' },
        { value: 20, label: 'Ongoing Projects' }
    ];

    return (
        <section className="bg-[#1F1F1F] text-white" id="about">
            <div className="container mx-auto flex flex-col lg:flex-row py-20 px-4 items-center space-y-12 lg:space-y-0 lg:space-x-12">
                <motion.div
                    className="flex-1 text-center lg:text-left"
                    initial="initial"
                    animate="animate"
                    variants={fadeInUp}
                >
                    {profileImage && (
                        <div className="relative inline-block">
                            <motion.img
                                src={profileImage?.imageUrl}
                                alt="Profile"
                                className="rounded-full w-64 h-64 lg:w-96 lg:h-96 object-cover border-4 border-blue-600"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            />
                            <motion.div
                                className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold"
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
                                className="bg-blue-600/10 rounded-lg p-6 text-center"
                                whileHover={{ scale: 1.05, backgroundColor: '#2563EB' }}
                                transition={{ duration: 0.3 }}
                            >
                                <CountUp
                                    end={stat.value}
                                    prefix={stat.value >= 100 ? '+' : ''}
                                    className="text-4xl font-bold text-blue-600"
                                />
                                <p className="text-sm mt-2">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    className="flex-1 lg:pl-10 text-center lg:text-left"
                    initial="initial"
                    animate="animate"
                    variants={fadeInUp}
                >
                    <h2 className="text-4xl lg:text-6xl font-bold mb-6">About</h2>
                    <motion.p
                        className="text-lg mb-4"
                        variants={fadeInUp}
                    >
                        I'm Nusrat Jahan, I've had the opportunity to experience and develop in a creative environment since 2022.
                    </motion.p>
                    <motion.p
                        className="text-lg mb-4"
                        variants={fadeInUp}
                    >
                        I always desire to break from my limitations. By honing design skills through years of experience, I believe that my design can connect well with your audience.
                    </motion.p>
                    <motion.p
                        className="text-lg mb-6"
                        variants={fadeInUp}
                    >
                        Let's make it happen together!
                    </motion.p>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <button className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">
                            Download CV <Download className="ml-2 h-4 w-4" />
                        </button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;