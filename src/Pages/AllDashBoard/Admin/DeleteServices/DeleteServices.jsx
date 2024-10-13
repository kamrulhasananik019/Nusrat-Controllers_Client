import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { storage } from '../../../../firebase/firebase.config'; // Your Firebase config path
import { ref, deleteObject } from 'firebase/storage';
import axios from 'axios';
import useAxiosSecure from '../../../../Components/Hook/useAxiosSecure';
import useAxiosPublic from '../../../../Components/Hook/useAxiosPublic';

const DeleteServices = () => {
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();


    // Fetch all services on component mount
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axiosPublic.get('/services');
                setServices(response.data);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };
        fetchServices();
    }, []);

    // Function to delete a service
    const handleDeleteService = async (serviceId, imageUrl) => {
        setIsLoading(true);

        try {
            // Delete the image from Firebase Storage
            const imageRef = ref(storage, imageUrl);
            await deleteObject(imageRef);

            // Delete the service from the backend
            const response = await axiosSecure.delete(`/deleteservices/${serviceId}`);
            if (response.status === 200) {
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Service deleted successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                setServices(services.filter(service => service._id !== serviceId)); // Remove from local state
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to delete service. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: `Failed to delete service: ${error.message}`,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className='container mx-auto mt-5'>
            <h2 className='text-2xl font-semibold my-5'>Manage Services</h2>
            {isLoading && <p>Processing... Please wait.</p>}

            <ul>
                {services.map(service => (
                    <div key={service._id} >
                        <div className='flex justify-between items-center'>
                            <div>
                                <img src={service.imageUrl} alt={service.serviceName} width="100" />
                                <h3 className='my-3 font-semibold'>{service.serviceName}</h3>
                                <p>{service.description}</p>
                            </div>
                            {/* Delete button */}
                            <div>
                                <button
                                    onClick={() => handleDeleteService(service._id, service.imageUrl)}
                                    className="btn bg-red-500 text-white"
                                    disabled={isLoading}
                                >
                                    Delete 
                                </button>
                            </div>
                        </div>
                        <div className="divider"></div>
                    </div>

                ))}
            </ul>
        </section>
    );
};

export default DeleteServices;
