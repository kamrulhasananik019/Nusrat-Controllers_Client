import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../../Components/Hook/useAuth';

const Header = () => {
    const { user, logOut } = useAuth();
    // Dependency array to trigger when user changes

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error))
    }

    return (
        <section className='bg-[#001731] text-white  font-semibold '>
            <div className='md:mx-28'>
                <div className="navbar  ">
                    <div className="navbar-start">
                        <div className="dropdown ">
                            <label tabIndex={0} className="btn btn-ghost xl:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow  rounded-box w-52 bg-slate-400">
                                <li className='hover:text-blue-400'>
                                    <Link to='/'  >Home</Link>
                                </li>
                                <li><a href="#about" className=" hover:text-blue-400">About</a></li>
                                <li><a href="#experience" className=" hover:text-blue-400">Experience</a></li>
                                <li><a href="#services" className=" hover:text-blue-400">Services</a></li>
                                <li><a href="#portfolio" className=" hover:text-blue-400">Portfolio</a></li>
                                <li><a href="#clients" className=" hover:text-blue-400">Clients</a></li>
                                <li><a href="#contact" className=" hover:text-blue-400">Contact</a></li>
                                {user ? <li>
                                    <Link to='/dashboard'>Dashboard</Link>
                                </li> : <></>}
                            </ul>
                        </div >
                        <h1 className="text-2xl font-bold">Nusrat Jahan</h1>
                    </div>
                    <div className="navbar-center hidden xl:flex">
                        <ul className="menu menu-horizontal px-1 text-base">
                            <li className='hover:text-blue-400'>
                                <Link to='/' >Home</Link>
                            </li>
                            <li><a href="#about" className=" hover:text-blue-400">About</a></li>
                            <li><a href="#experience" className=" hover:text-blue-400">Experience</a></li>
                            <li><a href="#services" className=" hover:text-blue-400">Services</a></li>
                            <li><a href="#portfolio" className=" hover:text-blue-400">Portfolio</a></li>
                            <li><a href="#clients" className=" hover:text-blue-400">Clients</a></li>
                            <li><a href="#contact" className=" hover:text-blue-400">Contact</a></li>
                            {user ? <li>
                                <Link to='dashboard/allusers'>Dashboard</Link>
                            </li> : <></>}
                        </ul>
                    </div>
                    <div className="navbar-end">
                        <div className="dropdown dropdown-end">
                            {
                                user ? <>
                                    <div className='flex'>
                                        <button onClick={handleLogOut} className="btn btn-ghost">Log Out</button>
                                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                            <div className="w-10 rounded-full">
                                                <img src={user?.photoURL} alt="User Avatar" />
                                            </div>
                                        </label>
                                    </div>
                                </> : <>
                                    <Link to='/login' >LogIn</Link>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Header;
