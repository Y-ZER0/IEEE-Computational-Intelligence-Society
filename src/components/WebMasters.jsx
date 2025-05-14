import React, { useEffect, useRef } from 'react';
import '../ComponentsStyling/WebMasters.css'; 

const WebMasters = () => {
  const webTeam = [
      {
        name: "Yousef Abu-Nimreh",
        role: "Frontend Developer",
        contribution: "Built the website structure and developed React components",
        image: `${process.env.PUBLIC_URL}/images/Yousef Abu-Nimreh.jpeg`
      },
      {
        name: "Khaled Raed",
        role: "Project Lead",
        contribution: "Managed the team and designed the user interface",
        image: `${process.env.PUBLIC_URL}/images/Khaled.jpeg`
      },
      {
        name: "Hussam Tarteer",
        role: "Technical Support",
        contribution: "Provided domain services and deployment assistance",
        image: `${process.env.PUBLIC_URL}/images/Hussam.jpg`
      }
  ];

  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    cardsRef.current.forEach(card => {
      if (card) {
        observer.observe(card);
      }
    });

    return () => {
      cardsRef.current.forEach(card => {
        if (card) {
          observer.unobserve(card);
        }
      });
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section className="web-masters-section" id="web-masters">
      <div className="web-masters-container">
        <div className="web-masters-header">
          <h2>Web Master Team</h2>
          <p>The talented team behind this website</p>
          <div className="web-masters-underline"></div>
        </div>
        
        <div className="web-masters-grid">
          {webTeam.map((member, index) => (
            <div 
              className="web-master-card" 
              key={index} 
              ref={addToRefs}
            >
              <div className="web-master-image-container">
                <img src={member.image} alt={member.name} className="web-master-image" />
                <div className="web-master-overlay">
                  <p className="web-master-contribution">{member.contribution}</p>
                </div>
              </div>
              <div className="web-master-info">
                <h3>{member.name}</h3>
                <p className="web-master-role">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WebMasters;