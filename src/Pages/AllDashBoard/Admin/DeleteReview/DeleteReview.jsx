import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../Components/Hook/useAxiosSecure';
import DeleteItem from '../../../../Components/DeleteItem/DeleteItem';

const DeleteReview = () => {
    const axiosSecure = useAxiosSecure();

    // Use TanStack Query for fetching reviews
    const { data: reviews = [], isLoading } = useQuery({
        queryFn: async () => {
            const response = await axiosSecure.get('/reviews');
            return response.data;
        },
        queryKey: ['reviews'],
    });

    if (isLoading) return <p>Loading reviews...</p>;

    return (
        <section className='container mx-auto mt-5'>
            <h2 className='text-2xl font-semibold my-5'>Delete Review</h2>
            <div>
                {reviews.map((review) => (
                    <div key={review._id}>
                        <div className='flex justify-between items-center'>
                            <div>
                                {review.imageUrl && (
                                    <img src={review.imageUrl} alt={review.title} width="100" />
                                )}
                                <p className='my-2 font-semibold'>{review?.reviewText}</p>
                                <p>Rating: {review?.rating}</p>
                            </div>
                            <DeleteItem
                                item={review}
                                endpoint="/deletereview"
                                queryKey="reviews" // Used to invalidate query after delete
                            />
                        </div>
                        <div className="divider"></div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default DeleteReview;
