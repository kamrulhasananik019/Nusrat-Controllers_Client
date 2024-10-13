import axios from 'axios';
import  { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true // Ensures cookies are sent with requests
});

const useAxiosSecure = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Request interceptor: Adds Authorization header for secure API calls
        axiosSecure.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('access-token');
                if (token) {
                    config.headers.authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error); // Handle request errors
            }
        );

        // Response interceptor: Handles 401 and 403 errors, logs out the user
        axiosSecure.interceptors.response.use(
            (response) => {
                return response; // Pass through if the response is successful
            },
            async (error) => {
                const status = error.response?.status;
                if (status === 401 || status === 403) {
                    try {
                        await logOut(); // Logout the user
                        navigate('/login'); // Redirect to login page
                    } catch (logoutError) {
                        console.error('Logout error:', logoutError);
                    }
                }
                return Promise.reject(error); // Forward the error for further handling
            }
        );
    }, [logOut, navigate]); // Dependencies to ensure logOut and navigate are up-to-date

    return axiosSecure;
};

export default useAxiosSecure;
