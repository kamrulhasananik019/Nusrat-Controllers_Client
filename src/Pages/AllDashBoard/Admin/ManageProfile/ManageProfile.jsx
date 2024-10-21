import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import Swal from 'sweetalert2';  // Import SweetAlert
import useAxiosPublic from '../../../../Components/Hook/useAxiosPublic';
import useAuth from '../../../../Components/Hook/useAuth';

const ManageProfile = () => {
    const axiosPublic = useAxiosPublic();
    const [image, setImage] = useState(null);
    const [profile, setProfile] = useState(null);
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    // Function to handle image selection
    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    // Function to delete the current image from Firebase Storage
    const deletePreviousImage = async () => {
        if (profile && profile.imageUrl) {
            const storage = getStorage();
            const imageRef = ref(storage, profile.imageUrl);  // Use the image URL as reference

            try {
                await deleteObject(imageRef);
                console.log('Previous image deleted successfully');
            } catch (error) {
                console.error('Error deleting previous image: ', error);
            }
        }
    };

    // Function to handle image upload to Firebase Storage
    const uploadImage = async () => {
        if (!image) {
            return Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Please select an image first!',
            });
        }

        setIsLoading(true);  // Set loading state before starting the upload
        const storage = getStorage();
        const storageRef = ref(storage, `profile_image/${Date.now()}_${image.name}`); // Fix: changed imageFile to image

        try {
            // Delete the previous image first
            await deletePreviousImage();

            // Upload the new image
            await uploadBytes(storageRef, image);

            // Get the URL of the uploaded image
            const downloadURL = await getDownloadURL(storageRef);

            // Send the URL to MongoDB via Express backend
            await updateProfileImage(downloadURL);

        } catch (error) {
            console.error("Error uploading image: ", error);
            Swal.fire({
                icon: 'error',
                title: 'Upload Failed',
                text: 'There was an issue uploading your image. Please try again.',
            });
        } finally {
            setIsLoading(false);  // Reset loading state
        }
    };

    // Function to update profile image URL in MongoDB
    const updateProfileImage = async (downloadURL) => {
        try {
            const response = await axiosPublic.put('/updateprofile', {
                imageUrl: downloadURL,
                id: profile._id
            });

            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Profile Updated',
                    text: 'Profile image updated successfully!',
                });
                fetchProfile();  // Refresh profile after update
            }
        } catch (error) {
            console.error("Error updating profile: ", error);
            Swal.fire({
                icon: 'error',
                title: 'Update Failed',
                text: 'There was an issue updating your profile. Please try again.',
            });
        }
    };

    // Fetch the profile from the server
    const fetchProfile = async () => {
        try {
            const response = await axiosPublic.get('/getprofile');
            const profileData = response.data[0];  // Assuming it's an array, get the first item
            setProfile(profileData);
        } catch (error) {
            console.error("Error fetching profile: ", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Could not fetch profile data. Please try again.',
            });
        }
    };

    // Fetch profile data on component mount
    useEffect(() => {
        fetchProfile();
    }, []);

    return user ? (
        <div>
            <h2>Manage Profile</h2>
            {profile && (
                <div>
                    <img src={profile.imageUrl} alt="Profile" width="100" />
                </div>
            )}
            <input type="file" onChange={handleImageChange} />

            <input
                className={`mt-5 btn ${isLoading ? 'bg-gray-300' : 'bg-blue-100'}`}
                type="submit"
                value={isLoading ? "Submitting..." : "Submit"}
                disabled={isLoading}
                onClick={uploadImage}
            />
        </div>
    ) : <p>Loading...</p>;
};

export default ManageProfile;
