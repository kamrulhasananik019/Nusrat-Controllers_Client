import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../../Components/Hook/useAxiosSecure';
import DeleteItem from '../../../../Components/DeleteItem/DeleteItem';

const DeleteSlider = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [editingSlider, setEditingSlider] = useState(null);

    // Fetch sliders
    const { data: sliders = [], isLoading } = useQuery({
        queryFn: async () => {
            const response = await axiosSecure.get('/sliders');
            return response.data;
        },
        queryKey: ['sliders'],
    });

    // Mutation for updating a slider
    const updateSliderMutation = useMutation({
        mutationFn: async (updatedSlider) => {
            const response = await axiosSecure.put(`/updateslider/${updatedSlider._id}`, updatedSlider);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['sliders']);
            setEditingSlider(null);
        },
    });

    // Handle update form submission
    const handleUpdate = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updatedSlider = {
            ...editingSlider,
            category: formData.get('category'),
            serialNumber: parseInt(formData.get('serialNumber'), 10),
        };
        updateSliderMutation.mutate(updatedSlider);
    };

    if (isLoading) return <p>Loading sliders...</p>;

    return (
        <section className='container mx-auto mt-5 '>
            <div className='sticky top-0 bg-white'>
                <h2 className='text-2xl font-semibold my-5'>Manage Sliders</h2>
                {editingSlider && (
                    <form onSubmit={handleUpdate} className='p-4 bg-gray-100 rounded-md '>
                        <h3 className='text-xl font-semibold mb-3'>Update Slider</h3>
                        <div className='flex my-10 '>
                            <div>
                                <img className='' src={editingSlider.imageUrl} width={100} alt="" />
                            </div>
                            <div>
                                <div className='mb-3 '>
                                    <label className='px-5' htmlFor="category">Category</label>
                                    <select
                                        name="category"
                                        defaultValue={editingSlider.category}
                                        className='form-select'
                                        required
                                    >
                                        <option value="slider1">Slider 1</option>
                                        <option value="slider2">Slider 2</option>
                                        <option value="slider3">Slider 3</option>
                                    </select>
                                </div>
                                <div className='mb-3'>
                                    <label className='px-5' htmlFor="serialNumber">Serial Number</label>
                                    <input
                                        type="number"
                                        name="serialNumber"
                                        defaultValue={editingSlider.serialNumber}
                                        className='form-input'
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='flex'>
                            <button type="submit" className='btn bg-green-100 mr-2'>
                                Save Changes
                            </button>
                            <button
                                type="button"
                                className='btn bg-red-100'
                                onClick={() => setEditingSlider(null)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>
            <div>
                {sliders.map((slider) => (
                    <div key={slider._id}>
                        <div className='flex justify-between items-center'>
                            <div className='flex justify-between gap-5'>
                                {slider.imageUrl && (
                                    <img src={slider.imageUrl} alt={slider.category} width="100" />
                                )}
                                <div >
                                    <p className='my-2 font-semibold'>Category: {slider.category}</p>
                                    <p>Serial Number: {slider.serialNumber}</p>
                                </div>
                            </div>
                            <div className='flex'>
                                <button
                                    className='btn bg-yellow-100 mr-2'
                                    onClick={() => setEditingSlider(slider)}
                                >
                                    Update
                                </button>
                                <DeleteItem
                                    item={slider}
                                    endpoint="/deleteslider"
                                    queryKey="sliders"
                                />
                            </div>
                        </div>
                        <div className="divider"></div>
                    </div>
                ))}


            </div>
        </section>
    );
};

export default DeleteSlider;
