import React, { useState, useEffect, useRef } from 'react';
import '../ComponentsStyling/StarsOfMonth.css'; 

const StarsOfMonth = ({ isDarkMode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);

  const starsData = [
    {
      id: 1,
      name: "Hussam Tarteer",
      image: `${process.env.PUBLIC_URL}/images/Hussam.jpg`
    },
    {
      id: 2,
      name: "Tasneem Dweiri",
      image: `${process.env.PUBLIC_URL}/images/Tasneem.jpg`
    },
    {
      id: 3,
      name: "Yousef Abu-Nimreh",
      image: `${process.env.PUBLIC_URL}/images/Yousef Abu-Nimreh.jpeg`
    },
    {
      id: 4,
      name: "Khaled Raed",
      image: `${process.env.PUBLIC_URL}/images/Khaled.jpeg`
    },
    {
      id: 5,
      name: "Layan Samman",
      image: `${process.env.PUBLIC_URL}/images/Layan.jpg`
    },
    {
        id: 6,
        name: "Ibrahem Basem",
        image: `${process.env.PUBLIC_URL}/images/Ibrahim.jpg`
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, 100);
          observer.unobserve(entry.target);
        }
      },
      { 
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px" 
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleMouseEnter = (index) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <section 
      ref={sectionRef} 
      className={`stars-of-month animate-section ${isVisible ? 'visible' : ''} ${isDarkMode ? 'dark-mode' : 'light-mode'}`}
      id = "stars-of-month"
    >
      <div className="stars-container">
        <h2 className="stars-title">Stars of the Month</h2>
        <p className="stars-subtitle">Recognizing exceptional contributions from our members</p>
        
        <div className="stars-carousel">
          {starsData.map((star, index) => (
            <div 
              key={star.id} 
              className={`star-card ${activeIndex === index ? 'active' : ''}`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              style={{
                transitionDelay: isVisible ? `${0.3 + (index * 0.1)}s` : '0s'
              }}
            >
              <div className="star-image-container">
                <img src={star.image} alt={star.name} className="star-image" />
                <div className="glow-effect"></div>
              </div>
              <div className="star-info">
                <h3 className="star-name">{star.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StarsOfMonth;