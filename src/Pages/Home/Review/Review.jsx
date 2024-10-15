import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Review = () => {
    return (
        <section className='container mx-auto'>
            <Swiper
                spaceBetween={0}
                autoplay={{ delay: 2000 }}
                pagination={{ clickable: true }}
                modules={[Autoplay, Navigation, Pagination]}
                breakpoints={{
                    640: {
                        slidesPerView: 2, // Mobile
                    },
                    768: {
                        slidesPerView: 2, // Tablet
                    },
                    1024: {
                        slidesPerView: 3, // Small Desktop
                    },

                }}
            >

                <SwiperSlide>
                   <div>
                    <img src="" alt="" />
                    <h3></h3>
                    <p></p>
                    <div className="divider"></div>
                    <div>
                        <div></div>
                        <div>
                            <h4></h4>
                            <p></p>
                        </div>
                    </div>
                   </div>
                </SwiperSlide>

            </Swiper>

        </section>
    );
};

export default Review;