import React from 'react';
import { FaLinkedin, FaInstagram, FaBehanceSquare } from "react-icons/fa";
import { TbBrandFiverr } from "react-icons/tb";

const ContactUs = () => {
    return (
        <section className='bg-gradient-to-b from-blue-200 to-blue-100'>
            <div className='container mx-auto px-5 pb-10'>
                <div className='text-center py-10'>
                    <h2 className='text-4xl font-bold text-gray-800'>Let's Connect!</h2>
                    <p className='pt-2 text-lg text-gray-600'>Let’s create something unique together! Here’s how you can reach out to me:</p>
                    <div className='flex gap-5 text-3xl text-blue-600 justify-center py-5'>
                        <a href="https://www.linkedin.com/in/nusratjahangraphi-/" aria-label="LinkedIn" className='transition-transform transform hover:scale-110'>
                            <FaLinkedin />
                        </a>
                        <a href="https://www.instagram.com/nusrat_graphi/?hl=en" aria-label="Instagram" className='transition-transform transform hover:scale-110'>
                            <FaInstagram />
                        </a>
                        <a href="https://www.fiverr.com/nusratjahan04" aria-label="Fiverr" className='transition-transform transform hover:scale-110'>
                            <TbBrandFiverr />
                        </a>
                        <a href="https://www.behance.net/nusratjahangraphi-" aria-label="Behance" className='transition-transform transform hover:scale-110'>
                            <FaBehanceSquare />
                        </a>
                    </div>
                    <a 
                        href='https://calendly.com/isratjahantanny15/consultation-support' 
                        className='border text-lg px-6 py-3 hover:bg-blue-600 hover:text-white border-blue-600 text-blue-600 rounded-md transition duration-300 ease-in-out'
                    >
                        Book a Call
                    </a>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;
