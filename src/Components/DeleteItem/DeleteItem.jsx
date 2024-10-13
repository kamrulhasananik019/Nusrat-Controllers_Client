import React from 'react';
import Swal from 'sweetalert2';
import { ref, deleteObject } from 'firebase/storage';
import { storage } from '../../firebase/firebase.config';

import useAxiosSecure from '../Hook/useAxiosSecure';
import { useMutation, useQueryClient } from '@tanstack/react-query';


const DeleteItem = ({ item, endpoint, queryKey }) => {


    console.log(item)
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // Use mutation for delete operation
    const deleteMutation = useMutation(

        {
            mutationFn: async () => {
                // Delete the item from the database
                await axiosSecure.delete(`${endpoint}/${item._id}`);
                // Delete image from Firebase if it exists
                if (item.imageUrl) {
                    const imageRef = ref(storage, item.imageUrl);
                    await deleteObject(imageRef);
                }
            },
            onSuccess: () => {
                // Invalidate the query to refetch the data
                queryClient.invalidateQueries(queryKey);
                Swal.fire('Deleted!', `${item.title} has been deleted.`, 'success');
            },
            onError: (error) => {
                Swal.fire('Error!', `Error deleting ${item.title}: ${error.message}`, 'error');
            },
        }
    );

    const handleDelete = async () => {
        // Confirm deletion
        const result = await Swal.fire({
            title: `Delete ${item.title}?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        });

        if (result.isConfirmed) {
            deleteMutation.mutate();
        }
    };

    return (
        <button
            className='btn bg-red-500 text-white'
            onClick={handleDelete}
            disabled={deleteMutation.isLoading}
        >
            {deleteMutation.isLoading ? 'Processing...' : 'Delete'}
        </button>
    );
};

export default DeleteItem;
