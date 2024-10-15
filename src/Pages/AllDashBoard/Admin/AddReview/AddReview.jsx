import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAuth from '../../../../Components/Hook/useAuth';
import { storage } from '../../../../firebase/firebase.config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import useAxiosSecure from '../../../../Components/Hook/useAxiosSecure';

const AddReview = () => {
    const { user } = useAuth();
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const [isLoading, setIsLoading] = useState(false);

    if (!user) {
        return <p>Loading...</p>;
    }

    const handleImageUpload = async (imageFile) => {
        if (!imageFile) return null;

        const uniqueImageName = `Review-Images/${Date.now()}_${imageFile.name}`;
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

    const handleAddReview = async (formData) => {
        setIsLoading(true);

        try {
            let imageUrl = '';
            if (formData.image && formData.image.length > 0) {
                imageUrl = await handleImageUpload(formData.image[0]);
            }

            const response = await axiosSecure.post('/addreview', {
                email: user.email,
                displayName: user.displayName,
                reviewText: formData.reviewText,
                rating: formData.rating,
                name: formData.name,
                imageUrl,
            });

            if (response.status === 200) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Review added successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                reset();
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to add review. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: `Error submitting review: ${error.message}`,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className='container mx-auto mt-5'>
            <div>
                <h2 className='text-2xl font-semibold my-5'>Add Review</h2>
            </div>
            <form onSubmit={handleSubmit(handleAddReview)} className=''>
                <div className='grid grid-cols-1 gap-5'>
                    <div className='grid'>
                        <label htmlFor="reviewText">Review</label>
                        <textarea 
                            id="reviewText" 
                            name="reviewText" 
                            rows="4" 
                            required 
                            {...register('reviewText')}
                            className='border rounded p-2'
                        />
                    </div>
                    <div className='grid'>
                        <label htmlFor="rating">Rating</label>
                        <input 
                            type="number" 
                            id="rating" 
                            name="rating" 
                            min="1" 
                            max="5" 
                            required 
                            {...register('rating')}
                            className='border rounded p-2'
                        />
                    </div>
                    <div className='grid'>
                        <label htmlFor="name">Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            required 
                            {...register('name')}
                            className='border rounded p-2'
                        />
                    </div>
                    <div className='grid'>
                        <label htmlFor="image">Image </label>
                        <input 
                            type="file" 
                            id="image" 
                            name="image"
                            required  
                            {...register('image')}
                            className='border rounded p-2'
                        />
                    </div>
                </div>
                <input 
                    className='mt-5 btn bg-blue-100' 
                    type="submit" 
                    value={isLoading ? "Submitting..." : "Submit"} 
                    disabled={isLoading} 
                />
                {isLoading && <p className="text-blue-500 mt-2">Submitting your review, please wait...</p>}
            </form>
        </section>
    );
};

export default AddReview;
