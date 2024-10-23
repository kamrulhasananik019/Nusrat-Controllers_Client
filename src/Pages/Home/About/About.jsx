import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { Download } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import useAxiosPublic from '../../../Components/Hook/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const About = ({ profileImage, aosAttributes }) => {
    const axiosPublic = useAxiosPublic()

    const { data: experience = [], isLoading } = useQuery({
        queryKey: ['experience'],
        queryFn: async () => {
            const response = await axiosPublic.get('/experience');
            return response.data;
        },
    });

    if (isLoading) return <div>Loading...</div>;
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
            <div className='container mx-auto '>
                <div className="flex flex-col lg:flex-row py-20 px-4 items-center space-y-12 lg:space-y-0 lg:space-x-12">

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
                            <button className="px-6 py-3  bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition ease-in-out duration-300">
                                <span className='flex'>
                                    Download CV <Download className="ml-2 h-4 w-4" />
                                </span>
                            </button>
                        </motion.div>
                    </div>
                </div>

                <div>
                    <div>
                        <Swiper
                            spaceBetween={15}
                            autoplay={{ delay: 3000 }}
                            pagination={{ clickable: true }}
                            modules={[Autoplay, Navigation, Pagination]}
                            breakpoints={{
                                768: {
                                    slidesPerView: 3,
                                    spaceBetween: 20,
                                },
                                1321: {
                                    slidesPerView: 4,
                                    spaceBetween: 20,
                                },
                            }}
                        >
                            {experience.map((skill) => (
                                <SwiperSlide key={skill._id} >
                                <motion.div
                                    key={skill.title}
                                    className="relative group overflow-hidden border-2 m-2 border-blue-500 rounded-lg shadow-lg flex flex-col items-center p-6 transition-all duration-300 bg-gradient-to-br from-blue-600 via-blue-500"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    {/* Skill Image with hover effect */}
                                    <motion.img
                                        src={skill.imageUrl}
                                        alt={skill.title}
                                        className="w-20 h-20 object-cover rounded-full transition-transform duration-300"
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.5 }}
                                    />
                            
                                    {/* Skill Title */}
                                    <p className="mt-4 text-center text-white text-lg font-semibold group-hover:scale-105 transition-transform duration-300">
                                        {skill.title}
                                    </p>
                            
                                    {/* Hover overlay */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                                    >
                                    </motion.div>
                                </motion.div>
                            </SwiperSlide>
                            
                            ))}
                        </Swiper>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default About;
