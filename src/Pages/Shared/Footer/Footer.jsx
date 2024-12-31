import React, { useEffect } from 'react';
import { FaLinkedin, FaInstagram, FaBehanceSquare } from "react-icons/fa";
import { TbBrandFiverr } from "react-icons/tb";


const Footer = () => {



    return (
        <footer className='bg-[#111111] text-white py-10'>
            <div className='container mx-auto px-5'>
                <div className='flex justify-between items-center flex-col md:flex-row'>
                    <div className='text-center md:text-left mb-5 md:mb-0' >
                        <h3 className='text-2xl font-bold'>Get In Touch</h3>
                        <p className='text-lg'>Let's create something unique together!</p>
                    </div>
                    <div className='flex gap-5 text-3xl justify-center' >
                        <a href="https://www.linkedin.com/in/nusratjahangraphi-/" aria-label="LinkedIn" className='hover:text-blue-200 transition-colors duration-300'>
                            <FaLinkedin />
                        </a>
                        <a href="https://www.instagram.com/nusrat_graphi/?hl=en" aria-label="Instagram" className='hover:text-blue-200 transition-colors duration-300'>
                            <FaInstagram />
                        </a>
                        <a href="https://www.fiverr.com/nusratjahan04" aria-label="Fiverr" className='hover:text-blue-200 transition-colors duration-300'>
                            <TbBrandFiverr />
                        </a>
                        <a href="https://www.behance.net/nusratjahangraphi-" aria-label="Behance" className='hover:text-blue-200 transition-colors duration-300'>
                            <FaBehanceSquare />
                        </a>
                    </div>
                </div>
                <div className='text-center mt-5' >
                    <p className='text-sm'>Â© {new Date().getFullYear()} Your Name. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;