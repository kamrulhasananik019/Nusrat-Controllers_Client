import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import useAxiosPublic from '../../../Components/Hook/useAxiosPublic';

const Review = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const axiosPublic = useAxiosPublic();

    // Fetch review data
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axiosPublic.get('/reviews');
                setReviews(response.data);
            } catch (error) {
                console.error('Error fetching review data:', error);
                setError('Failed to load reviews. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [axiosPublic]);

    return (
        <section className="pt-16 pb-36 bg-gradient-to-b from-blue-500 to-blue-300">
            <div className="container mx-auto">
                <h2 className="text-3xl md:text-6xl font-semibold text-center mb-20 text-white">
                    Trusted by Global <span className="text-blue-600">Customers</span>
                </h2>
                {loading && (
                    <div className="text-center text-gray-300 text-xl">Loading reviews...</div>
                )}
                {error && (
                    <div className="text-center text-red-500 text-xl">{error}</div>
                )}
                {!loading && !error && (
                    <Swiper
                        spaceBetween={30}
                        autoplay={{ delay: 2000 }}
                        pagination={{ clickable: true }}
                        modules={[Autoplay, Navigation, Pagination]}
                        breakpoints={{
                            640: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        className="mySwiper"
                    >
                        {reviews.map((review) => (
                            <SwiperSlide key={review._id}>
                                <div className="bg-white p-6 rounded-xl shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 border-2 border-blue-400">
                                    <div className="flex items-center justify-between mb-4">
                                        <img src={review.imageUrl} alt={review.name} className="object-cover w-12 h-12 rounded-full bg-gray-500" />
                                        <div className="flex items-center space-x-2 text-yellow-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current">
                                                <path d="M494,198.671a40.536,40.536,0,0,0-32.174-27.592L345.917,152.242,292.185,47.828a40.7,40.7,0,0,0-72.37,0L166.083,152.242,50.176,171.079a40.7,40.7,0,0,0-22.364,68.827l82.7,83.368-17.9,116.055a40.672,40.672,0,0,0,58.548,42.538L256,428.977l104.843,52.89a40.69,40.69,0,0,0,58.548-42.538l-17.9-116.055,82.7-83.368A40.538,40.538,0,0,0,494,198.671Zm-32.53,18.7L367.4,312.2l20.364,132.01a8.671,8.671,0,0,1-12.509,9.088L256,393.136,136.744,453.3a8.671,8.671,0,0,1-12.509-9.088L144.6,312.2,50.531,217.37a8.7,8.7,0,0,1,4.778-14.706L187.15,181.238,248.269,62.471a8.694,8.694,0,0,1,15.462,0L324.85,181.238l131.841,21.426A8.7,8.7,0,0,1,461.469,217.37Z"></path>
                                            </svg>
                                            <span className="text-xl font-bold px-2">{review.rating} </span>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2 text-gray-800">{review?.name}</h3>
                                    <p className="text-gray-700 mb-4">{review.reviewText}</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </section>
    );
};

export default Review;
