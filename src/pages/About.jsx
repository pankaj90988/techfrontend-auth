import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";
import HeroSecondImage from '../assets/web-development.png'

import swiperData from '../swiperData.js'

import './About.css'
import Analytic from '../components/Analytic'
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { Keyboard, Pagination, Navigation } from 'swiper/modules';

// scrollTrigger
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Gallery from '../components/Gallery.jsx';
gsap.registerPlugin(ScrollTrigger);



const About = () => {


  const [lastscrollTop, setLastscrollTop] = useState(0);
  const [screenWidth, setscreenWidth] = useState(1448);

  useEffect(() => {
    const currentWidth = window.innerWidth;
    setscreenWidth(currentWidth);
  }, [screenWidth])

  useEffect(() => {
    const scrollHandler = (dets) => {
      setLastscrollTop(lastscrollTop);
      if (dets.deltaY > 0) {
        gsap.to(".text-container", {
          transform: "translateX(-200%)",
          duration: 5,
          repeat: -1,
          ease: 'none'
        })

        gsap.to(".text-container .arrow-left", {
          rotate: 0,
        })
      } else {
        gsap.to(".text-container", {
          transform: "translateX(0%)",
          duration: 5,
          repeat: -1,
          ease: 'none'
        })

        gsap.to(".text-container .arrow-left", {
          rotate: 180,
        })

      }
    }

    window.addEventListener('wheel', scrollHandler)
  }, [lastscrollTop]);



  useGSAP(() => {
    gsap.from(".about-left-content h1, .about-left-content p, .about-left-content .btn-box button", {
      y: -50,
      scale: 0.4,
      duration: 0.5,
      delay: 0.2,
      opacity: 0,
      // transition: 3,
      stagger: 0.3,
      scrollTrigger: {
        trigger: ".about-container",
        scroller: "body",
        // markers: true,
        scrub: 5,
        toggleActions: "play none none reverse",
        start: "top 80%",
        end: "bottom 90%",

      }
    })
  });

  useGSAP(() => {
    gsap.from(".about-right-content img", {
      x: -400,
      scale: 0.4,
      duration: 0.5,
      delay: 0.2,
      opacity: 0,
      // transition: 3,
      stagger: 0.3,
    })
  })

  return (
    <>
      <main>
        <section className='about-section-warpper'>
          <div className="about-container">
            <div className="about-left-content">
              <h1>Why Choose Us?</h1>
              <p>
                <span style={{ fontWeight: 'bolder' }}>1. Expert Help:</span> Our team knows MongoDB, FastAPI, React, and Python inside and out.
              </p>
              <p>
                <span style={{ fontWeight: 'bolder' }}>2. Hands-On Practice:</span> We offer workshops where you can work on real projects to build your skills.
              </p>
              <p>
                <span style={{ fontWeight: 'bold' }}>3. Latest Knowledge:</span> We keep up with the newest updates in the FARM stack, so you learn what's current.
              </p>
              <p>
                <span style={{ fontWeight: 'bold' }}>4. Team Projects:</span> You can team up with others on projects, gaining experience and building your portfolio.
              </p>
              <p>
                <span style={{ fontWeight: 'bold' }}>5. Helpful Resources:</span> Get access to useful materials like tutorials and code examples for MERN development.
              </p>
              <p>
                <span style={{ fontWeight: 'bold' }}>6. Supportive Community:</span> Join a friendly group where you can ask questions and share ideas.
              </p>
              <div className="btn-box">
                <NavLink to="/contact">
                  <button className='first-btn'>Connect Now</button>
                </NavLink>
                <NavLink to="/service">
                  <button className='second-btn'>Learn More</button>
                </NavLink>
              </div>
            </div>
            <div className="about-right-content">
              <img src={HeroSecondImage}
                alt="About Image"
                width="500"
              />
            </div>
          </div>
        </section>
      </main>



      <section>
        <div className="left-move-text-cont">

          <div className={screenWidth < 721 ? ("text-container text-keyFrame") : ("text-container")}>
            <FaArrowLeftLong className='arrow-left' />
            <h1>JOIN US FOR CODE TOGETHER</h1>
          </div>

          <div className={screenWidth < 721 ? ("text-container text-keyFrame") : ("text-container")}>
            <FaArrowLeftLong className='arrow-left' />
            <h1>JOIN US FOR CODE TOGETHER </h1>
          </div>

          <div className={screenWidth < 721 ? ("text-container text-keyFrame") : ("text-container")}>
            <FaArrowLeftLong className='arrow-left' />
            <h1>JOIN US FOR CODE TOGETHER</h1>
          </div>

          <div className={screenWidth < 721 ? ("text-container text-keyFrame") : ("text-container")}>
            <FaArrowLeftLong className='arrow-left' />
            <h1>JOIN US FOR CODE TOGETHER</h1>
          </div>

          <div className={screenWidth < 721 ? ("text-container text-keyFrame") : ("text-container")}>
            <FaArrowLeftLong className='arrow-left' />
            <h1>JOIN US FOR CODE TOGETHER</h1>
          </div>

          <div className={screenWidth < 721 ? ("text-container text-keyFrame") : ("text-container")}>
            <FaArrowLeftLong className='arrow-left' />
            <h1>JOIN US FOR CODE TOGETHER</h1>
          </div>
        </div>
      </section>


      <section className="analytics-section">
        <Analytic />
      </section>

      <section className='project-swiper'>
        <div className="swiper-container">
          <Swiper
            slidesPerView={screenWidth < 721 ? (1) : (2)}
            spaceBetween={30}
            grabCursor={true}
            keyboard={{
              enabled: true,
            }}
            pagination={{
              clickable: true,
            }}
            loop={true}
            navigation={screenWidth < 721 ? (false) : (true)}
            modules={[Keyboard, Pagination, Navigation]}
            className="mySwiper"
          >
            {
              swiperData.map((data) => (
                <SwiperSlide key={data.id}>
                  <div className="swiper-card">
                    <a href={data.link} target='_blank'>
                      <img src={data.image} height="250" alt="" />
                    </a>
                    <h3>{data.title}</h3>
                    <p>{data.description}</p>
                  </div>
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
      </section >


      <section>
        <div className="left-move-text-cont">

          <div className={screenWidth < 721 ? ("text-container text-keyFrame") : ("text-container")}>
            <FaArrowLeftLong className='arrow-left' />
            <h1>JOIN US FOR CODE TOGETHER</h1>
          </div>

          <div className={screenWidth < 721 ? ("text-container text-keyFrame") : ("text-container")}>
            <FaArrowLeftLong className='arrow-left' />
            <h1>JOIN US FOR CODE TOGETHER </h1>
          </div>

          <div className={screenWidth < 721 ? ("text-container text-keyFrame") : ("text-container")}>
            <FaArrowLeftLong className='arrow-left' />
            <h1>JOIN US FOR CODE TOGETHER</h1>
          </div>

          <div className={screenWidth < 721 ? ("text-container text-keyFrame") : ("text-container")}>
            <FaArrowLeftLong className='arrow-left' />
            <h1>JOIN US FOR CODE TOGETHER</h1>
          </div>

          <div className={screenWidth < 721 ? ("text-container text-keyFrame") : ("text-container")}>
            <FaArrowLeftLong className='arrow-left' />
            <h1>JOIN US FOR CODE TOGETHER</h1>
          </div>

          <div className={screenWidth < 721 ? ("text-container text-keyFrame") : ("text-container")}>
            <FaArrowLeftLong className='arrow-left' />
            <h1>JOIN US FOR CODE TOGETHER</h1>
          </div>
        </div>
      </section>

      <Gallery />
    </>
  )
}

export default About