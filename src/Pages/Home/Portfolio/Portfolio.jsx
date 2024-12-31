import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useAxiosPublic from '../../../Components/Hook/useAxiosPublic';

const Portfolio = ({aos}) => {
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

    return ( /* [Ayan] -+- Cannot find the class for background color, adding className to section -+- */
        <section className='bg-bg-[#111111]'>
            <div className="container mx-auto pb-36 pt-16" id='portfolio'>
                <h2 className="text-3xl md:text-6xl font-semibold text-center text-white pb-24" data-aos={aos}>My Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 gap-10">
                    {displayedProjects.map((project, index) => (
                        <motion.a
                            key={index}
                            href={project?.projectlink}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            className="transform transition duration-300 ease-out"
                        >
                            <div className="bg-[#161616] p-5 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col"  data-aos={aos}>
                                <motion.img 
                                    src={project?.imageUrl} 
                                    alt={project?.title} 
                                    className="w-full h-80 object-cover rounded-3xl"  // Adjusted to fill card height
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                />
                                <div className="p-4 flex-1">
                                    <p className="my-2 text-gray-600 font-semibold">{project?.category}</p>
                                    <h3 className="text-2xl font-semibold hover:text-blue-600 transition-colors duration-300">
                                        {project?.titlename}
                                    </h3>
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>
                {projects.length > 6 && (
                    <div className="text-center mt-10">
                        <motion.button
                            onClick={() => setShowAll(!showAll)}
                            className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {showAll ? 'Show Less' : 'Show More'}
                        </motion.button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Portfolio;
