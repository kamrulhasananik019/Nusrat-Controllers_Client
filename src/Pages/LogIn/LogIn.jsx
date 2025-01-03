import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AiFillEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import axios from 'axios';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';

const LogIn = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const [showPassword, setShowPassword] = useState(false);

    const from = location.state?.from?.pathname || "/";

    const onSubmit = data => {
        const email = data.email;
        const password = data.password;
        signIn(email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                const user = { email };
                // axios.post('http://localhost:5000/jwt', user, { withCredentials: true })
                //     .then(res => {
                //         console.log('JWT Token set in cookies:', res.data);
                //     })
                //     .catch(error => {
                //         console.error('Error fetching JWT token:', error);
                //     });
                Swal.fire({
                    title: 'User Login Successful.',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
                navigate(from, { replace: true });
            })
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className='bg-[#111111]'>
            <div className="hero-content grid grid-cols-1 md:grid-cols-2 mx-auto">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold py-5">Login now!</h1>
                    <img src="https://img.freepik.com/free-vector/app-development-concept-with-flat-deisng_23-2147852845.jpg?w=826&t=st=1686763904~exp=1686764504~hmac=f515ab351b6bb59f4dd99d77049a9fc70a6ce248ed78b2ef889ea25c5b458b50" alt="" />
                </div>
                <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
                            {errors.email && <span className="text-red-600">Email is required</span>}
                        </div>
                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                                })}
                                placeholder="password"
                                className="input input-bordered"
                            />
                            {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                            {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                            {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                            {errors.password?.type === 'pattern' && (
                                <p className="text-red-600">
                                    Password must have one uppercase letter, one lowercase letter, one number, and one special character.
                                </p>
                            )}
                            <button
                                type="button"
                                className="absolute top-10 right-3 z-10"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? (
                                    <AiOutlineEyeInvisible className="text-2xl" />
                                ) : (
                                    <AiFillEye className="text-2xl" />
                                )}
                            </button>
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn bg-[#FFBE4E]" type="submit" value="Login" />
                        </div>
                    </form>
                    <p><small>New Here? <Link to="/signup">Create an account</Link></small></p>
                </div>
                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default LogIn;
