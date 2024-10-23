import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaUsers, FaBook, FaHome } from 'react-icons/fa';
import useRole from '../Components/Hook/useRole'; // Updated to use useRole

const Dashboard = () => {
    const [isAdmin, isAdminLoading] = useRole(); // Use updated hook

    // Loading state
    if (isAdminLoading) {
        return <div>Loading...</div>; // You can replace with a spinner if needed
    }

    return (
        <section>
            <div className="drawer lg:drawer-open ">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content mt-10">
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
                        Open drawer
                    </label>
                    <Outlet />
                </div>

                <div className="drawer-side bg-gradient-to-r to-[#001731] from-teal-100 ">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 h-full text-base-content">
                        <div className="divider"></div>

                        <ul>
                            {isAdmin ? (
                                <>
                                    <li>
                                        <NavLink to="/dashboard/allusers">
                                            <FaUsers className="mr-2" /> All Users
                                        </NavLink>
                                    </li>
                                    <div className="divider"></div>
                                    <li>
                                        <NavLink to="/dashboard/manageprofile">
                                            <FaBook className="mr-2" /> Manage Profile
                                        </NavLink>
                                    </li>

                                    <div className="divider"></div>

                                    <li>
                                        <NavLink to="/dashboard/addexperience">
                                            <FaBook className="mr-2" /> Add Experience
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink to="/dashboard/deleteexperience">
                                            <FaBook className="mr-2" /> Delete Experience
                                        </NavLink>
                                    </li>

                                    <div className="divider"></div>

                                    <li>
                                        <NavLink to="/dashboard/addservices">
                                            <FaBook className="mr-2" /> Add Services
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink to="/dashboard/deleteservices">
                                            <FaBook className="mr-2" /> Delete Services
                                        </NavLink>
                                    </li>

                                    <div className="divider"></div>

                                    <li>
                                        <NavLink to="/dashboard/addportfolio">
                                            <FaBook className="mr-2" /> Add Portfolio
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/deletedportfolio">
                                            <FaBook className="mr-2" /> Delete Portfolio
                                        </NavLink>
                                    </li>
                                    <div className="divider"></div>

                                    <li>
                                        <NavLink to="/dashboard/addslider">
                                            <FaBook className="mr-2" /> Add Slider 
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/deletedslider">
                                            <FaBook className="mr-2" /> Delete slider 
                                        </NavLink>
                                    </li>
                                    <div className="divider"></div>
                                    <li>
                                        <NavLink to="/dashboard/addreview">
                                            <FaBook className="mr-2" />Add Review
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/deletereview">
                                            <FaBook className="mr-2" /> Delete Review
                                        </NavLink>
                                    </li>
                                </>
                            ) : (
                                <>
                                    {/* <li>
                                        <NavLink to="/">
                                            <FaHome className="mr-2" /> Home
                                        </NavLink>
                                    </li> */}
                                </>
                            )}
                            <div className="divider"></div>
                            <li>
                                <NavLink to="/">
                                    <FaHome className="mr-2" /> Home
                                </NavLink>
                            </li>
                        </ul>




                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
