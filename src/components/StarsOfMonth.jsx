import React, { useState, useEffect, useRef } from 'react';
import '../ComponentsStyling/StarsOfMonth.css'; // Import the CSS file for styling

const StarsOfMonth = ({ isDarkMode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);

  const starsData = [
    {
      id: 1,
      name: "Hussam Tarteer",
      role: "Outstanding Researcher",
      achievement: "Published groundbreaking research on neural networks",
      image: `${process.env.PUBLIC_URL}/images/Hussam.jpg`
    },
    {
      id: 2,
      name: "Tasneem Dweiri",
      role: "Project Lead",
      achievement: "Led successful AI workshop series",
      image: `${process.env.PUBLIC_URL}/images/Tasneem.jpg`
    },
    {
      id: 3,
      name: "Yousef Abu-Nimreh",
      role: "Technical Writer",
      achievement: "Created comprehensive documentation for CIS projects",
      image: `${process.env.PUBLIC_URL}/images/Yousef Abu-Nimreh.jpeg`
    },
    {
      id: 4,
      name: "Khaled Raed",
      role: "Developer",
      achievement: "Built innovative machine learning model for community use",
      image: `${process.env.PUBLIC_URL}/images/Khaled.jpeg`
    },
    {
      id: 5,
      name: "Layan Samman",
      role: "Event Coordinator",
      achievement: "Organized largest chapter meetup in IEEE CIS history",
      image: `${process.env.PUBLIC_URL}/images/Layan.jpg`
    },
    {
        id: 6,
        name: "Ibrahim Basem",
        role: "Event Coordinator",
        achievement: "Organized largest chapter meetup in IEEE CIS history",
        image: `${process.env.PUBLIC_URL}/images/Ibrahim.jpg`
    }
  ];

  useEffect(() => {
    // Enhanced IntersectionObserver for smoother animation trigger
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only trigger when element is at least 15% visible
        if (entry.isIntersecting) {
          // Add a small delay before starting animations
          setTimeout(() => {
            setIsVisible(true);
          }, 100);
          observer.unobserve(entry.target);
        }
      },
      { 
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before fully in view
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
                // Adding this inline style ensures we don't lose the staggered animation
                transitionDelay: isVisible ? `${0.3 + (index * 0.1)}s` : '0s'
              }}
            >
              <div className="star-image-container">
                <img src={star.image} alt={star.name} className="star-image" />
                <div className="glow-effect"></div>
              </div>
              <div className="star-info">
                <h3 className="star-name">{star.name}</h3>
                <p className="star-role">{star.role}</p>
                <div className="star-details">
                  <p className="star-achievement">{star.achievement}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StarsOfMonth;