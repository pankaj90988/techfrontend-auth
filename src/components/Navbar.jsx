import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { RiMenu3Line } from "react-icons/ri";
import { RiCloseLargeFill } from "react-icons/ri";
import { PiUserCircleThin } from "react-icons/pi";
import { FaCamera } from "react-icons/fa";
import { Link, NavLink, useNavigate } from 'react-router-dom'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './Navbar.css'
import Logo from '../assets/panku.jpeg'
import { toast } from 'react-toastify';
import { useAuth } from '../store/AuthContextAPI';

const Navbar = () => {

    const { role } = useAuth();
    const [preview, setPreview] = useState("");
    const { isLogin, logoutUser } = useAuth();
    const [menu, setMenu] = useState(false);
    const [navWidth, setNavWidth] = useState(false);
    const navigate = useNavigate();

    const hanglePicker = (e) => {

        const file = e.target.files[0];
        URL.revokeObjectURL(preview)
        if (file) {
            const imgUrl = URL.createObjectURL(file)
            setPreview(imgUrl)
        }
        return
    }

    const handleLogout = () => {
        logoutUser()
        setMenu(!menu)
        toast.success("Logout successfully");
        navigate("/login");
    }
    useGSAP(() => {
        gsap.from(".brand-logo img", {
            y: -70,
            duration: 0.6,
            delay: 0.1,
            transition: 2,
            opacity: 0
        })
    })
    useGSAP(() => {
        gsap.from("ul li", {
            y: 50,
            duration: 0.5,
            delay: 0.01,
            opacity: 0,
            stagger: -0.15
        })
    })


    return (
        <>
            <header>
                <div className="container">
                    <div className="brand-logo">
                        <Link to="/"><img src={Logo} alt="Brand Logo" /></Link>
                    </div>

                    <nav>
                        <div className={menu ? ("main-menu-cont-open") : ("main-menu-cont")}>
                            <ul className={!menu ? "nav navWidth" : "nav"}>
                                {
                                    role == 'admin' && <li><NavLink onClick={() => setMenu(!menu)} to="/admin-dashboard">Admin Panel</NavLink></li>
                                }

                                {
                                    !isLogin ? (
                                        <>
                                            <li><NavLink onClick={() => setMenu(!menu)} to="/register">Register</NavLink></li>
                                            <li><NavLink onClick={() => setMenu(!menu)} to="/login">Login</NavLink></li>
                                        </>
                                    ) : (
                                        <>
                                            <li><NavLink onClick={() => setMenu(!menu)} to="/">Home</NavLink></li>
                                            <li><NavLink onClick={() => setMenu(!menu)} to="/about">About</NavLink></li>
                                            <li><NavLink onClick={() => setMenu(!menu)} to="/service">Services</NavLink></li>
                                            <li><NavLink onClick={() => setMenu(!menu)} to="/contact">Contact</NavLink></li>
                                            <button className='log-out' style={{
                                                fontSize: "18px", background: "#ef4444", color: "white",
                                                padding: '5px 10px', borderRadius: "5px", marginLeft: "8px",
                                                cursor: 'pointer'
                                            }}
                                                onClick={handleLogout} >Log out</button>
                                        </>
                                    )
                                }

                            </ul>
                        </div>
                    </nav>

                    <div className="search-icon-menu-icon-main-cont">
                        <div className="search-icon-menu-icon">

                            <div className="menu-icon" onClick={() => {
                                setMenu(!menu)
                            }}>
                                {
                                    !menu ? (<RiMenu3Line className='menu-cross-bar-search' />) : (<RiCloseLargeFill className='menu-cross-bar-search' />)
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </header>
        </>
    )

}
export default Navbar