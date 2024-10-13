// Import necessary libraries and Firebase dependencies
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { storage } from '../../../../firebase/firebase.config'; // Ensure this is the correct path to your Firebase config
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import useAxiosSecure from '../../../../Components/Hook/useAxiosSecure';

const AddServices = () => {
    const { register, handleSubmit, reset } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const axiosSecure = useAxiosSecure();

    // Reusable function to upload the image to Firebase Storage and return the download URL
    const handleImageUpload = async (imageFile) => {
        if (!imageFile) return null;

        // Generate a unique image name using Date.now() and the original file name
        const uniqueImageName = `Service-Collection/${Date.now()}_${imageFile.name}`;
        const storageRef = ref(storage, uniqueImageName);

        try {
            const snapshot = await uploadBytes(storageRef, imageFile);
            const downloadURL = await getDownloadURL(snapshot.ref);
            return downloadURL;
        } catch (error) {
            console.error('Error uploading image:', error);
            Swal.fire({
                title: 'Error!',
                text: `Image upload failed: ${error.message}`,
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return null;
        }
    };

    const handleAddService = async (formData) => {
        setIsLoading(true);

        try {
            const imageFile = formData.image[0]; // Get the image file from form data
            const imageUrl = await handleImageUpload(imageFile); // Upload image to Firebase

            if (!imageUrl) {
                setIsLoading(false);
                return; // Stop execution if image upload fails
            }

            // Send the image URL and other form data to your backend
            const response = await axiosSecure.post('/addservice', {
                serviceName: formData.serviceName,
                description: formData.description,
                imageUrl // Include the image URL
            });

            if (response.status === 200) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Service added successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
                reset();
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to add service. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }

            setIsLoading(false);
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: `Failed to add service: ${error.message}`,
                icon: 'error',
                confirmButtonText: 'OK',
            });
            setIsLoading(false);
        }
    };

    return (
        <section className='container mx-auto mt-5'>
            <h2 className='text-2xl font-semibold my-5'>Add Services</h2>
            {isLoading && <p>Uploading... Please wait.</p>}
            <form onSubmit={handleSubmit(handleAddService)}>
                <div className='grid'>
                    <label htmlFor="serviceName">Service Name</label>
                    <input type="text" {...register('serviceName')} required />
                </div>
                <div className='grid my-4'>
                    <label htmlFor="description">Description</label>
                    <textarea {...register('description')} required />
                </div>
                <div className='grid my-4'>
                    <label htmlFor="image">Service Image</label>
                    <input type="file" name="image" required {...register('image')} />
                </div>
                <button type="submit" disabled={isLoading} className="mt-5 btn bg-blue-100">Add Service</button>
            </form>
        </section>
    );
};

export default AddServices;
