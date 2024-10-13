import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../Components/Hook/useAxiosSecure';
import DeleteItem from '../../../../Components/DeleteItem/DeleteItem';
// Assuming you have a reusable DeleteItem component

const DeletedPortfolio = () => {
    const axiosSecure = useAxiosSecure();

    // Use TanStack Query for fetching data
    const { data: portfolios = [], isLoading, isError, error } = useQuery({
        queryKey: ['portfolios'],
        queryFn: async () => {
            const response = await axiosSecure.get('/portfolio');
            return response.data;
        },
        retry: false, // Optional: Don't retry on failure
        staleTime: 5000 // Optional: Data stays fresh for 5 seconds
    });

    if (isLoading) return <p>Loading experiences...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    return (
        <section className='container mx-auto mt-5'>
            <h2 className='text-2xl font-semibold my-5'>Delete portfolios</h2>
            <div>
                {portfolios.map((portfolio) => (
                    <div key={portfolio._id} >
                        <div className='flex justify-between items-center'>
                            <div >
                                {portfolio.imageUrl && (
                                    <img src={portfolio.imageUrl} alt={portfolio.title} width="100" />
                                )}
                                <p className='my-2 font-semibold'>{portfolio?.titlename}</p>

                            </div>
                            <DeleteItem
                                item={portfolio}
                                endpoint="/deleteportfolio"
                                queryKey="portfolios" // Used to invalidate query after delete
                            />
                        </div>
                        <div className="divider"></div>
                    </div>

                ))}
            </div>
        </section>
    );
};

export default DeletedPortfolio;


