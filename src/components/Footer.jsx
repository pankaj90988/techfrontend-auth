import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaFacebook } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import './Footer.css'
import Logo from '../assets/panku.jpeg'

const Footer = () => {
  const current_year = new Date().getFullYear();

  return (
    <>
      <footer>
        <div className="row">
          <div className="col">
            <img src={Logo}
              width="70"
              alt="Logo"
            />
            <p>Panku is a vibrant IT community dedicated to fostering collaboration, knowledge sharing, and innovation among tech enthusiasts.</p>
          </div>
          <div className="col">
            <h3>Office <div className="underline"><span></span></div></h3>
            <p>Amaniganj Road</p>
            <p>Ayodhya, Uttar Pradesh</p>
            <p>Sant Nagar, Ayodhya Uttar Pradesh</p>
            <p className='email-id'>pankajjnv@005@gmail.com</p>
            <h4>+91 8953224298</h4>
          </div>
          <div className="col">
            <h3>Links<div className="underline"><span></span></div></h3>
            <ul>
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/about">About</NavLink></li>
              <li><NavLink to="/service">Services</NavLink></li>
              <li><NavLink to="/feature">Feartures</NavLink></li>
              <li><NavLink to="/contact">Contact</NavLink></li>
            </ul>
          </div>
          <div className="col">
            <h3>Social Media<div className="underline"><span></span></div></h3>
            <div className="social-icons">
              <a href="https://github.com/pankaj90988" className='github-a'>
                <FaGithub className='icon github' />
              </a>
              <a href="" className='linkeden-a'>
                <FaLinkedin className='icon linkeden' />
              </a>
              <a href="" className='instagram-a'>
                <FaInstagram className='icon instagram' />
              </a>
              <a href="" className='facebook-a'>
                <FaFacebook className='icon facebook' />
              </a>
              <a href="" className='whatsapp-a'>
                <FaWhatsapp className='icon whatsapp' />
              </a>
            </div>
            <MdEmail className='email-icon' />
            {/* <input type="text" placeholder='Send Your Feedback Here..' />
            <button type='submit'>Send</button> */}
          </div>
        </div>
        <hr />
        <p className='copy-right'>Panku IT Services Community &copy; {current_year} - All Rights Reserved</p>
      </footer>
    </>
  )
}

export default Footer