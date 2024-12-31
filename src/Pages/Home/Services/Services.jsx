import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../../Components/Hook/useAxiosPublic';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';

const Services = ({aos}) => {
    const [services, setServices] = useState([]);
    const axiosPublic = useAxiosPublic();

    // Fetch services data
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axiosPublic.get('/services');
                setServices(response.data);
            } catch (error) {
                console.error('Error fetching services data:', error);
            }
        };

        fetchProjects();
    }, [axiosPublic]);

    return (
        <section className="py-20 bg-[#111111]">
            <div className="container mx-auto">
                <h2 className="text-3xl md:text-6xl font-semibold text-center mb-12 text-white" data-aos={aos}>
                    My Services
                </h2>

                <Swiper
                    spaceBetween={20}
                    autoplay={{ delay: 3000 }}
                    pagination={{ clickable: true }}
                    modules={[Autoplay, Navigation, Pagination]}
                    breakpoints={{
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        1321: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                    }}
                    data-aos={aos}
                >
                    {services.map((service, index) => (
                        <SwiperSlide key={index}>
                            <motion.div
                                className="bg-[#161616] p-6 m-2 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="text-center mb-4">
                                    <img className="w-24 h-24 rounded-full border-4 border-blue-600 mx-auto" src={service?.imageUrl} alt={service?.serviceName} />
                                </div>
                                <h3 className="text-2xl font-semibold text-center mb-2">{service?.serviceName}</h3>
                                <p className="text-gray-500 text-center my-5">{service?.description}</p>
                                <div className="text-center">
                                    <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded transition-colors duration-300">
                                        Get Started &rarr;
                                    </button>
                                </div>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Services;
