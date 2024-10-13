import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../../Components/Hook/useAxiosPublic';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Services = () => {

    const [services, setServices] = useState([]);
    const axiosPublic = useAxiosPublic();

    // Fetch portfolio data
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axiosPublic.get('/services');
                setServices(response.data);
            } catch (error) {
                console.error('Error fetching portfolio data:', error);
            }
        };

        fetchProjects();
    }, [axiosPublic]);

    return (
        <section className=" pt-16 pb-36 bg-gray-100">
            <div className='  container mx-auto'>

                    <h2 className="text-3xl md:text-6xl font-semibold  text-center  mb-20">
                        My <span className="text-blue-600">Services</span>
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
                        1321:{
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                    }}
                    >
                    
                        {services.map((service, index) => (
                            <SwiperSlide>
                                <div key={index} className="bg-white p-6 m-2 rounded-xl shadow-lg  ">
                                    <div className="text-5xl mb-4">

                                        <img className=" w-24 h-24 rounded-full border border-blue-600" src={service?.imageUrl} alt="" />

                                    </div>
                                    <h3 className="text-2xl font-semibold mb-2">{service?.serviceName}</h3>
                                    <p className="text-gray-600  my-5">{service?.description}</p>
                                    <button href="#" className="text-blue-600 font-semibold hover:text-indigo-400 text-lg">
                                        Get Started &rarr;
                                    </button>
                                </div>
                            </SwiperSlide>
                        ))}
                </Swiper>
            </div>

        </section>
    );
};

export default Services;
