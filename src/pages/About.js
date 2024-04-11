import React, { useState, useEffect } from 'react';
import robot from "../components/imgs/robot.png";

const About = ({ onClose }) => {
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 10000);

    const handleMouseClick = () => {
      setShowAnimation(false);
      setTimeout(() => {
        onClose();
      }, 500);
    };

    document.addEventListener('click', handleMouseClick);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleMouseClick);
    };
  }, [onClose]);

  return (
    <div
      className={`about-overlay ${showAnimation ? 'show' : 'hide'}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        opacity: showAnimation ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out',
      }}
    >
      <div
        className="about-content"
        style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '10px',
          textAlign: 'center',
          maxWidth: '80%',
          animation: `${showAnimation ? 'fadeIn' : 'fadeOut'} 0.5s ease-in-out`,
        }}
      >
        <h1 className="e-s-d-i-r">
          E&nbsp;&nbsp; S&nbsp;&nbsp; D&nbsp;&nbsp; I&nbsp;&nbsp; R
        </h1>
        <h2 className="esdir-name">
          Electromechanical Self-Driven Intelligent Rover
        </h2>
        <p className="ESDIR-description">
          ESDIR is a robot capable of efficiently maneuvering through a maze,
          avoiding obstacles and objects, while reaching its intended destination.
        </p>
        <div className="text-robot-container">
          <div className="robot-container">
            <img className="robot" src={robot} />
          </div>
          <p className="esdir-text">
            ESDIR is controlled through the use of a web application with robust
            user authentication features, which enable users to submit delivery
            requests. These locations come from a pre-defined list of campus
            buildings, each linked to specific GPS locations. Admins will have the
            ability to add GPS locations to the list making this product more
            efficient for users.
          </p>
        </div>
        <p className="div">ESDIR, where Service is Sovereignty!</p>
      </div>

      
      <div
        className="click-to-continue"
        style={{
          color: 'white',
          fontWeight: 'bold',
          animation: `${showAnimation ? 'fadeIn' : 'fadeOut'} 0.5s ease-in-out`,
        }}
      >
        Click anywhere to continue
      </div>
    </div>
  );

};

export default About;