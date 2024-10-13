import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAuth from '../../../../Components/Hook/useAuth';
import { storage } from '../../../../firebase/firebase.config'; // Ensure this is the correct path to your Firebase config
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import useAxiosSecure from '../../../../Components/Hook/useAxiosSecure';

const AddPortfolio = () => {
    const { user } = useAuth();
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    
    const [isLoading, setIsLoading] = useState(false);

    if (!user) {
        return <p>Loading...</p>;
    }

    const handleImageUpload = async (imageFile) => {
        if (!imageFile) return null;

        // Generate a unique image name using Date.now() and the original file name
        const uniqueImageName = `Portfolio-Collection/${Date.now()}_${imageFile.name}`;
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

    const handleAddFormData = async (formData) => {
        if (!user) return;

        setIsLoading(true);

        try {
            const imageFile = formData.image[0];
            const imageUrl = await handleImageUpload(imageFile);

            if (!imageUrl) {
                setIsLoading(false);
                return;
            }

            const response = await axiosSecure.post('/addportfolio', {
                category: formData.category,
                titlename: formData.titlename,
                email: user.email,
                displayName: user.displayName,
                imageUrl
            });

            if (response.status === 200) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Portfolio added successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                reset();
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to add portfolio. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }

            setIsLoading(false);
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: `Error uploading portfolio: ${error.message}`,
                icon: 'error',
                confirmButtonText: 'OK'
            });
            setIsLoading(false);
        }
    };

    return user ? (
        <section className='container mx-auto mt-5'>
            <div>
                <h2 className='text-2xl font-semibold my-5'>Add Portfolio</h2>
            </div>
            <div>
                {isLoading && <p>Uploading... Please wait.</p>}

                <form onSubmit={handleSubmit(handleAddFormData)} className=''>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                        <div className='grid'>
                            <label htmlFor="image">Image</label>
                            <input type="file" name="image" required {...register('image')} />
                        </div>

                        <div className='grid'>
                            <label htmlFor="category">Category</label>
                            <input type="text" name="category" required {...register('category')} />
                        </div>
                    </div>
                    <div>
                        <div className='grid my-5'>
                            <label htmlFor="titlename">Title Name</label>
                            <input type="text" name="titlename" required {...register('titlename')} />
                        </div>
                    </div>

                    <input className='mt-5 btn bg-blue-100' type="submit" value="Submit" disabled={isLoading} />
                </form>
            </div>
        </section>
    ) : <p>Loading...</p>;
};

export default AddPortfolio;
