import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAuth from '../../../../Components/Hook/useAuth';
import { storage } from '../../../../firebase/firebase.config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import useAxiosSecure from '../../../../Components/Hook/useAxiosSecure';

const AddSlider = () => {
    const { user } = useAuth();
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const [isLoading, setIsLoading] = useState(false);

    const handleImageUpload = async (imageFile) => {
        if (!imageFile) return null;

        const uniqueImageName = `Slider-Collection/${Date.now()}_${imageFile.name}`;
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

    const handleAddSliderData = async (formData) => {
        setIsLoading(true);

        try {
            const imageFile = formData.image[0];
            const imageUrl = await handleImageUpload(imageFile);

            if (!imageUrl) {
                setIsLoading(false);
                return;
            }

            const response = await axiosSecure.post('/addslider', {
                category: formData.category,
                serialNumber: formData.serialNumber,
                email: user?.email,
                imageUrl
            });

            if (response.status === 200) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Slider added successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                reset();
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to add slider. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }

            setIsLoading(false);
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: `Error uploading slider: ${error.message}`,
                icon: 'error',
                confirmButtonText: 'OK'
            });
            setIsLoading(false);
        }
    };

    return user ? (
        <section className='container mx-auto mt-5'>
            <div>
                <h2 className='text-2xl font-semibold my-5'>Add Slider</h2>
            </div>
            <div>
                {isLoading && <p>Uploading... Please wait.</p>}

                <form onSubmit={handleSubmit(handleAddSliderData)} className=''>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                        <div className='grid'>
                            <label htmlFor="image">Image</label>
                            <input type="file" name="image" required {...register('image')} />
                        </div>

                        <div className='grid'>
                            <label htmlFor="category">Category</label>
                            <select name="category" required {...register('category')}>
                                <option value="slider1">Slider 1</option>
                                <option value="slider2">Slider 2</option>
                                <option value="slider3">Slider 3</option>
                            </select>
                        </div>

                        <div className='grid'>
                            <label htmlFor="serialNumber">Serial Number</label>
                            <input type="number" name="serialNumber" required {...register('serialNumber')} />
                        </div>
                    </div>

                    <input className='mt-5 btn bg-blue-100' type="submit" value="Submit" disabled={isLoading} />
                </form>
            </div>
        </section>
    ) : <p>Loading...</p>;
};

export default AddSlider;
