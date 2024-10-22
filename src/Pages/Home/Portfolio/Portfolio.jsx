import React, { useState, useEffect } from 'react';
import useAxiosPublic from '../../../Components/Hook/useAxiosPublic';

const Portfolio = () => {
    const [projects, setProjects] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const axiosPublic = useAxiosPublic();

    // Fetch portfolio data
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axiosPublic.get('/portfolio');
                setProjects(response.data);
            } catch (error) {
                console.error('Error fetching portfolio data:', error);
            }
        };

        fetchProjects();
    }, [axiosPublic]);

    // Determine the number of projects to display based on showAll state
    const displayedProjects = showAll ? [...projects].reverse() : [...projects].reverse().slice(0, 6);

    return (
        <section className='bg-gradient-to-r from-blue-300 to-blue-800 p-5 '>
            <div className="container mx-auto pb-36 pt-16" id='portfolio'>
                <h2 className="text-3xl md:text-6xl font-semibold text-center text-white pb-24">My Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 gap-5">
                    {displayedProjects.map((project, index) => (
                        <a href={project?.projectlink} target="_blank" rel="noopener noreferrer">
                            <div key={index} className="bg-white p-5 rounded-3xl shadow-lg">
                                <img src={project?.imageUrl} alt={project?.title} className="w-full h-auto rounded-3xl" />
                                <div className="p-4">
                                    <p className="my-2 text-gray-600 font-semibold">{project?.category}</p>
                                    <h3 className="text-2xl font-semibold hover:text-blue-600">{project?.titlename}</h3>
                                </div>
                            </div>
                        </a>

                    ))}
                </div>
                {projects.length > 6 && (
                    <div className="text-center mt-10">
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition duration-300"
                        >
                            {showAll ? 'Show Less' : 'Show More'}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Portfolio;
