import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Pagenotfound = () => {

  useGSAP(() => {
    
    gsap.from(".animate-item", {
      y: 70,
      scale: 0.5,
      duration: 0.6,
      delay: 0.2,
      opacity: 0,
      stagger: 0.15,
      ease: "back.out(1.7)"
    });


    gsap.to(".glow-text", {
      textShadow: "0 0 30px rgba(239, 68, 68, 0.9)",
      repeat: -1,
      yoyo: true,
      duration: 1.5
    });
  });

  return (
    <section style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#111215',
      fontFamily: 'sans-serif',
      textAlign: 'center',
      padding: '20px',
      overflow: 'hidden'
    }}>
      <div className="error-page-container" style={{ maxWidth: '600px' }}>

        {/* 404 Text */}
        <h2 className="animate-item glow-text" style={{
          fontSize: 'clamp(100px, 15vw, 150px)',
          margin: '0',
          fontWeight: '900',
          color: '#ef4444',
          lineHeight: '1',
          textShadow: '0 0 10px rgba(239, 68, 68, 0.3)'
        }}>404</h2>

        <h4 className="animate-item" style={{
          fontSize: '28px',
          color: '#f8fafc',
          marginTop: '10px',
          textTransform: 'uppercase',
          letterSpacing: '2px'
        }}>Lost in Darkness?</h4>

        <p className="animate-item" style={{
          color: '#94a3b8',
          fontSize: '17px',
          lineHeight: '1.6',
          margin: '20px 0'
        }}>
          Oops! It seems like the page you're trying to access doesn't exist.
          If you believe there's an issue, feel free to report it, and we'll
          look into it.
        </p>

        <div className="btns animate-item" style={{
          display: 'flex',
          gap: '15px',
          justifyContent: 'center',
          marginTop: '30px'
        }}>
          <NavLink to='/' style={{ textDecoration: 'none' }}>
            <button style={{
              padding: '12px 28px',
              backgroundColor: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: '700',
              transition: 'transform 0.2s',
              boxShadow: '0 4px 14px 0 rgba(239, 68, 68, 0.39)'
            }}
              onMouseOver={(e) => e.target.style.border = '1px solid white'}
              onMouseOut={(e) => e.target.style.border = '1px solid transparent'}
            >
              RETURN TO LIGHT
            </button>
          </NavLink>

          <Link to='/contact' style={{ textDecoration: 'none' }}>
            <button style={{
              padding: '12px 28px',
              backgroundColor: 'transparent',
              color: '#ef4444',
              border: '1px solid #ef4444',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: '700',
              transition: 'transform 0.2s'
            }}
              onMouseOver={(e) => e.target.style.border = '1px solid white'}
              onMouseOut={(e) => e.target.style.border = '1px solid #ef4444'}
            >
              REPORT PROBLEM
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Pagenotfound;