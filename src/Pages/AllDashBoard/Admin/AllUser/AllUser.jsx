import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../../Components/Hook/useAxiosSecure';
import Swal from 'sweetalert2';
import useAuth from '../../../../Components/Hook/useAuth';

const AlldbUser = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: dbUsers = [], refetch, isLoading, isError } = useQuery({
        queryKey: ['dbUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const handleMakeAdmin = async (dbUser) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: `Do you want to make ${dbUser.displayName} an admin?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, make admin!',
                cancelButtonText: 'Cancel'
            });

            if (result.isConfirmed) {
                const res = await axiosSecure.patch(`/users/admin/${dbUser._id}`, {}, { withCredentials: true });
                if (res.data.modifiedCount > 0) {
                    Swal.fire('Success!', 'user has been promoted to admin.', 'success');
                    refetch();
                }
            }
        } catch (error) {
            Swal.fire('Error!', 'Error making user admin. Please try again.', 'error');
            console.error('Error making dbUser admin:', error);
        }
    };

    const handleRevertToDbUser = async (dbUser) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: `Do you want to revert ${dbUser.displayName} to a dbUser?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, revert!',
                cancelButtonText: 'Cancel'
            });

            if (result.isConfirmed) {
                const res = await axiosSecure.patch(`/users/revert/${dbUser._id}`, {}, { withCredentials: true });
                if (res.data.modifiedCount > 0) {
                    Swal.fire('Success!', 'User role reverted to dbUser.', 'success');
                    refetch();
                }
            }
        } catch (error) {
            Swal.fire('Error!', 'Error reverting dbUser role. Please try again.', 'error');
            console.error('Error reverting dbUser role:', error);
        }
    };

    return (
        <div className='container mx-auto p-1'>
            <h2 className='font-semibold text-3xl mb-5'>ALL Users : {dbUsers.length}</h2>

            {/* Error Handling */}
            {isError && <p>Failed to load dbUsers. Please try again later.</p>}

            {/* Loader */}
            {isLoading ? (
                <div className="flex justify-center items-center">
                    <div className="loader">Loading...</div>
                </div>
            ) : (
                <div>
                    {dbUsers.map(dbUser => (
                        <div key={dbUser._id} className='border border-slate-400 rounded-md p-2 my-2'>
                            <div className='flex justify-between px-2'>
                                <div>
                                    <h3 className='text-2xl font-semibold'>{dbUser?.displayName}</h3>
                                    <p className='text-base font-semibold'>{dbUser?.email}</p>
                                </div>

                                <div className='flex gap-5'>
                                    <div>
                                        <p className={`${dbUser?.role === "admin" ? 'text-red-600' : 'text-blue-600'} px-5 py-2 text-xl font-semibold`}>{dbUser?.role}</p>
                                    </div>
                                    <div className='flex gap-5'>
                                        {dbUser.role === 'admin' ? (
                                            <button
                                                onClick={() => handleRevertToDbUser(dbUser)}
                                                className={`${user.email == dbUser.email ? 'hidden' : ''} font-semibold btn`}
                                            >
                                                Revert to User
                                            </button>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => handleMakeAdmin(dbUser)}
                                                    className='font-semibold btn'
                                                >
                                                    Make Admin
                                                </button>

                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AlldbUser;
