import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import axios from 'axios';
import useAxiosPublic from '../../../Components/Hook/useAxiosPublic';

const Sliders = () => {
    const axiosPublic=useAxiosPublic()
    // Fetch sliders
    const { data: sliders = [], isLoading } = useQuery({
        queryKey: ['sliders'],
        queryFn: async () => {
            const response = await axiosPublic.get('/sliders');
            return response.data;
        },
    });

    if (isLoading) return <div>Loading...</div>;

    // Assuming each slider has a category or type, filter them accordingly
    const slider1 = sliders.filter(slider => slider.category === 'slider1');
    const slider2 = sliders.filter(slider => slider.category === 'slider2');
    const slider3 = sliders.filter(slider => slider.category === 'slider3');

    return (
        <section className='bg-gray-100'>
            <div className='container mx-auto p-5 px-3'>
                <h2 className='text-3xl md:text-5xl text-center mb-5 font-semibold'>Carousel Design</h2>
                <div className='py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {/* Slider 1 */}
                    <div>
                        <Swiper
                            spaceBetween={20}
                            autoplay={{ delay: 3000 }}
                            pagination={{ clickable: true }}
                            modules={[Autoplay, Navigation, Pagination]}
                            slidesPerView={1}
                        >
                            {slider1.map(slider => (
                                <SwiperSlide key={slider.id}>
                                    <img src={slider.imageUrl} alt={slider.title} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    {/* Slider 2 */}
                    <div>
                        <Swiper
                            spaceBetween={20}
                            autoplay={{ delay: 3000 }}
                            pagination={{ clickable: true }}
                            modules={[Autoplay, Navigation, Pagination]}
                            slidesPerView={1}
                        >
                            {slider2.map(slider => (
                                <SwiperSlide key={slider.id}>
                                    <img src={slider.imageUrl} alt={slider.title} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    {/* Slider 3 */}
                    <div>
                        <Swiper
                            spaceBetween={20}
                            autoplay={{ delay: 3000 }}
                            pagination={{ clickable: true }}
                            modules={[Autoplay, Navigation, Pagination]}
                            slidesPerView={1}
                        >
                            {slider3.map(slider => (
                                <SwiperSlide key={slider.id}>
                                    <img src={slider.imageUrl} alt={slider.title} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Sliders;
