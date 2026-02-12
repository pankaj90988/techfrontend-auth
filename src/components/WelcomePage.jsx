import React, { useState, useEffect } from 'react';
import './WelcomePage.css'

const WelcomePage = () => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => (prev < 100 ? prev + 1 : 100));
    }, 48);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="intro-container">

      <div className="center-content">
        <div className="welcome-phrase">Welcome to</div>
        <h1 className="main-name">Pankaj's</h1>
        <div className="dev-space-text">Dev-Space</div>

        <div className="mission-line">
          THIS SITE PRESENT ADVANCED <br />
          <span className="highlight">AUTHENTICATION</span> & <span className="highlight">AUTHORIZATION</span>
        </div>

        <div className="loader-wrapper">
          <div className="box box1"></div>
          <div className="box box2"></div>
          <div className="box box3"></div>
          <div className="box box4"></div>
        </div>
      </div>

      <div className="progress-section">
        <span className="percentage">SECURE_INIT_{percent}%</span>
        <div className="track">
          <div className="fill" style={{ width: `${percent}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;