import React, { useEffect, useRef, useState } from 'react';
import { FaUsers, FaCalendarCheck, FaTrophy, FaHistory } from 'react-icons/fa';
import '../ComponentsStyling/IEEECISStats.css';

const IEEECISStats = ({ isDarkMode }) => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const stats = [
    { 
      id: 1, 
      title: 'Team Members', 
      value: '125+', 
      icon: <FaUsers size={32} />, 
      description: 'Active professionals and students'
    },
    { 
      id: 2, 
      title: 'Meetings', 
      value: '48', 
      icon: <FaCalendarCheck size={32} />, 
      description: 'Annual gatherings and workshops'
    },
    { 
      id: 3, 
      title: 'Awards', 
      value: '27', 
      icon: <FaTrophy size={32} />, 
      description: 'Recognition for excellence'
    },
    { 
      id: 4, 
      title: 'Years', 
      value: '2', 
      icon: <FaHistory size={32} />, 
      description: 'Years of innovation and research'
    }
  ];

  return (
    <section 
      className={`ieee-cis-stats ${isVisible ? 'is-visible' : ''}`} 
      id="team-in-numbers" 
      ref={sectionRef}
    >
      <div className="container">
        <h2 className="section-title">IEEE CIS Society Impact</h2>
        <p className="section-subtitle">
          Advancing computational intelligence research and applications worldwide
        </p>
        
        <div className="stats-container">
          {stats.map(stat => (
            <div className="stat-card" key={stat.id}>
              <div className="icon-container">
                {stat.icon}
              </div>
              <h3 className="stat-value">{stat.value}</h3>
              <h4 className="stat-title">{stat.title}</h4>
              <p className="stat-description">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IEEECISStats;