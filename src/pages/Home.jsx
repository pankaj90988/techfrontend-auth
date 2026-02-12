import React, { useEffect } from 'react'
import '../pages/Home.css'
import HeroImage from '../assets/home.png'
import HeroSecondImage from '../assets/web-development.png'
import Analytic from '../components/Analytic'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
gsap.registerPlugin(ScrollTrigger);

const Home = () => {


  useGSAP(() => {
    gsap.from(".home-part-one p, .home-part-one h1, .home-part-one span, .home-part-one button, .home-part-one img", {
      y: 20,
      scale: 1.5,
      duration: 0.6,
      delay: 0.2,
      opacity: 0,
      stagger: 0.4,
      scrollTrigger: {
        trigger: ".home-container",
        scroller: "body",
        // markers: true,
        scrub: 3,
        toggleActions: "play none none reverse",
        start: "-68% 20%",
        end: "bottom 90%"
      }
    })

  });


  useGSAP(() => {
    gsap.from(".home-part-two p, .home-part-two h1, .home-part-two span, .home-part-two button, .home-part-two img", {
      y: 20,
      scale: 1.4,
      duration: 0.5,
      delay: 0.2,
      opacity: 0,
      stagger: 0.3,
      scrollTrigger: {
        trigger: ".home-part-two",
        scroller: "body",
        // markers: true,
        scrub: 5,
        toggleActions: "play none none reverse",
        start: "top 80%",
        end: "bottom 90%",
      }
    })

  });

  return (
    <>
      <section className='home-page-section'>
        <div className="home-container home-part-one">
          <div className="hero-left-content ">

            <p>Lets Connect with our IT Community</p>
            <h1>Welcome to My Community
              <br />
              <span>Panku IT Services</span>
            </h1>

            <p className='about-company'>
              Panku Tech Company is your go-to partner for innovative solutions. We specialize in FARM (FastAPI ASGI(Asynchronous Server Gateway Interface) React MongoDB) stack development, creating dynamic web applications tailored to your needs.

              From software development to IT consulting, we cover all areas of technology. Our FARM full-stack developers are proficient in React, FastAPI, Python and MongoDB ensuring seamless integration and functionality. We believe in collaboration, working closely with you to understand your goals.
            </p>

            <div className="btn-box">
              <Link to="/contact">
                <button className='connect-now'>Connect Now</button>
              </Link>
              <Link to="/services">
                <button className='learn-more'>Learn More</button>
              </Link>
            </div>

          </div>

          <div className="hero-right-content">
            <img src={HeroImage} alt="Code together" />
          </div>

        </div>
      </section>


      {/* Analytic Start */}
      <Analytic />
      {/* Analytic End */}


      <section className='home-page-section'>
        <div className="home-container home-part-two">

          <div className="hero-right-content">
            <img src={HeroSecondImage} alt="Code together" />
          </div>

          <div className="hero-left-content">
            <p>We are here to help you</p>
            <h1>Get Started Today
              <br />
              <span>With Us</span>
            </h1>

            <p>
              "Join us for an exciting journey! Be part of our community and explore endless possibilities. Together, we can achieve great things!

              We offer you the chance to learn new experiences and skills. Together, we can turn our goals into reality. Join us today and become part of this new adventure!"
            </p>

            <div className="btn-box">
              <Link to="/contact">
                <button className='connect-now'>Get Started</button>
              </Link>
              <Link to="/services">
                <button className='learn-more'>Explore</button>
              </Link>
            </div>

          </div>
        </div>
      </section>



    </>
  )
}

export default Home