import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAuth from '../../../../Components/Hook/useAuth';
import { storage } from '../../../../firebase/firebase.config'; // Make sure this is your Firebase config path
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import useAxiosSecure from '../../../../Components/Hook/useAxiosSecure';

const AddExperience = () => {
    const { user } = useAuth();
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();

    const [isLoading, setIsLoading] = useState(false);

    if (!user) {
        return <p>Loading...</p>;
    }

    const handleImageUpload = async (imageFile) => {
        if (!imageFile) return null;

        const storageRef = ref(storage, `/Experience-Collection/${Date.now()}_${imageFile.name}`);
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

            const response = await axiosSecure.post('/addexperience', {
                title: formData.title,
                email: user.email,
                displayName: user.displayName,
                imageUrl
            });

            if (response.status === 200) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Experience added successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });

                reset();
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to add experience. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }

            setIsLoading(false);
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: `Error adding experience: ${error.message}`,
                icon: 'error',
                confirmButtonText: 'OK'
            });

            setIsLoading(false);
        }
    };

    return user ? (
        <section className='container mx-auto mt-5'>
            <div>
                <h2 className='text-2xl font-semibold my-5'>Add Experience</h2>
            </div>
            <div>
                {isLoading && <p>Uploading... Please wait.</p>}

                <form onSubmit={handleSubmit(handleAddFormData)} className=''>
                    <div className=''>
                        <div className='grid'>
                            <label htmlFor="image">Image</label>
                            <input type="file" name="image" required {...register('image')} />
                        </div>

                        <div className='grid w-9/12 my-10'>
                            <label htmlFor="title">Title</label>
                            <input type="text" name="title" required {...register('title')} />
                        </div>
                    </div>

                    <input className='mt-5 btn bg-blue-100' type="submit" value="Submit" disabled={isLoading} />
                </form>
            </div>
        </section>
    ) : <p>Loading...</p>;
};

export default AddExperience;
