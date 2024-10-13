import React from 'react';
import { useQuery } from '@tanstack/react-query';

import useAxiosSecure from '../../../../Components/Hook/useAxiosSecure';
import DeleteItem from '../../../../Components/DeleteItem/DeleteItem';
// Import the reusable component

const DeleteExperience = () => {
    const axiosSecure = useAxiosSecure();

    // Use TanStack Query for fetching data
    const { data: experiences = [], isLoading } = useQuery(
        {
            queryFn:
                async () => {
                    const response = await axiosSecure.get('/experience');
                    return response.data;
                },
            queryKey: ['experiences'],
        }
    );

    if (isLoading) return <p>Loading experiences...</p>;

    return (
        <section className='container mx-auto mt-5'>
            <h2 className='text-2xl font-semibold my-5'>Delete Experience</h2>
            <div>
                {experiences.map((experience) => (
                    <div key={experience._id} >
                        <div className='flex justify-between items-center'>
                            <div >
                                {experience.imageUrl && (
                                    <img src={experience.imageUrl} alt={experience.title} width="100" />
                                )}
                                <p className='my-2 font-semibold'>{experience?.title}</p>

                            </div>
                            <DeleteItem
                            item={experience}
                            endpoint="/deleteexperience"
                            queryKey="experiences" // Used to invalidate query after delete
                        />
                        </div>
                        <div className="divider"></div>
                    </div>

                ))}
            </div>
        </section>
    );
};

export default DeleteExperience;
